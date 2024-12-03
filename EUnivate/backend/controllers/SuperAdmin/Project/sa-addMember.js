import Invited from "../../../models/SuperAdmin/saInvitedMember.js";
import Project from "../../../models/SuperAdmin/saNewProject.js";
import User from "../../../models/Client/userModels.js";
import Workspace from "../../../models/SuperAdmin/addWorkspaceModel.js"; // Import workspace model

export const addMemberToProject = async (req, res) => {
    const { projectId, users } = req.body;

    // Validate input
    if (!projectId || !Array.isArray(users) || users.length === 0) {
        return res.status(400).json({ message: 'Invalid project ID or users array.' });
    }

    try {
        // Find the project
        const project = await Project.findById(projectId);
        if (!project) {
            console.log('Project not found for ID:', projectId);
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Update Invited members, adding the projectId to their projects array
        await Invited.updateMany(
            { _id: { $in: users } }, // Match users by their IDs in the Invited model
            { $addToSet: { project: projectId } } // Avoid duplicates with $addToSet
        );

        // Fetch the invited users to update their corresponding User model and Project schema
        const invitedUsers = await Invited.find({ _id: { $in: users } });

        // Process invited users and update their data in the User and Project models
        for (const invitedUser of invitedUsers) {
            // Find the corresponding user in the User model by a unique identifier, such as email
            const user = await User.findOne({ email: invitedUser.email });

            if (user) {
                // Add the projectId to the user's projects array
                user.projects.addToSet(projectId); // Avoid duplicates with $addToSet
                await user.save(); // Save the updated user data

                // Add the user to the project's invitedUsers array
                project.invitedUsers.addToSet(user._id); // Avoid duplicates with $addToSet

                // Add user to the workspace if the project belongs to a workspace
                const workspace = await Workspace.findById(project.workspaceId);
                if (workspace) {
                    workspace.users.addToSet(user._id); // Add user to workspace, avoiding duplicates
                    await workspace.save(); // Save the updated workspace
                } else {
                    console.log(`Workspace not found for project: ${projectId}`);
                }
            } else {
                console.log(`User not found for email: ${invitedUser.email}`);
            }
        }

        // Save the updated project with the new invited users
        await project.save();
        console.log('Updated Project with invited users:', project);

        res.status(200).json({ message: 'Members added successfully and updated in both User, Project, and Workspace models.', invitedUsers });
    } catch (error) {
        console.error('Error adding members to project:', error);
        res.status(500).json({ message: 'An error occurred while adding members to the project.' });
    }
};
