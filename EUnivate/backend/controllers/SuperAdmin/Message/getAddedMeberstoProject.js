import saNewProject from "../../../models/SuperAdmin/saNewProject.js"; 

export const getAddedMembersForMessage = async (req, res) => {
  try {
    const { workspaceId } = req.query; // Get workspace ID from query
    if (!workspaceId) {
      return res.status(400).json({ error: "Workspace ID is required" });
    }

    // Fetch the project/workspace with the invited users
    const project = await saNewProject.findById(workspaceId).populate('invitedUsers');
    if (!project) {
      return res.status(404).json({ error: "Workspace not found" });
    }

    // Send back the invited users
    return res.status(200).json({ invitedUsers: project.invitedUsers });
  } catch (error) {
    console.error("Error fetching members:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
