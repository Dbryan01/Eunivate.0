import Workspace from "../../models/SuperAdmin/addWorkspaceModel.js";

export const addNewWorkspace = async (req, res) => {
  try {
    const { workspaceTitle } = req.body;

    const addWorkspace = new Workspace({
      workspaceTitle: workspaceTitle,
      owner: req.user._id,
    });

    const savedWorkspace = await addWorkspace.save();

    return res.status(201).json(savedWorkspace);
  } catch (error) {
    console.error("Error in creating newWorkspace:", error.message);
    return res.status(500).json({
      error: error.message || "An error occurred while creating the Workspace",
    });
  }
};

export const getAllWorkspaces = async (req, res) => {
  const userId = req.user._id;
  try {
    // Find workspaces where the user is either the owner, part of the users array, or invited
    const workspaces = await Workspace.find({
      $or: [
        { owner: userId }, // Workspaces the user owns
        { users: userId }, // Workspaces the user is part of
        { invitedMembers: userId }, // Workspaces the user is invited to
      ],
    })
      .populate("users", "username profilePicture") // Populate users
      .populate("invitedMembers", "email role userId profilePicture"); // Populate invited members

    // Check if workspaces are found
    if (!workspaces || workspaces.length === 0) {
      return res
        .status(404)
        .json({ message: "No workspaces found for the user." });
    }

    // Return the workspaces along with users and invited members
    res.status(200).json(workspaces);
  } catch (error) {
    console.error("Error retrieving workspaces:", error);
    res.status(500).json({ message: "Error retrieving workspaces", error });
  }
};

export const deleteWorkspace = async (req, res) => {
  try {
    const workspaceId = req.params.id; // Workspace ID from the request URL

    const deletedWorkspace = await Workspace.findByIdAndDelete(workspaceId);

    if (!deletedWorkspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    return res.status(200).json({
      message: "Workspace deleted successfully",
      workspace: deletedWorkspace,
    });
  } catch (error) {
    console.error("Error deleting workspace:", error);
    return res
      .status(500)
      .json({ error: error.message || "Error deleting workspace" });
  }
};
