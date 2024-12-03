import mongoose from 'mongoose';

const saInvitedMemberSchema = new mongoose.Schema({
    email: {
        type: String,
        require:true,
    },
    role: {
        type: String,
        enum: ['User', 'guest','members', 'admin', 'superadmin'],
        default: 'User',
    },   
    project: [{
        type: mongoose.Schema.Types.ObjectId,  // Store project IDs as ObjectId
        ref: 'SaNewProject',  // Reference the Project model
    
    }],
    profilePicture: {
        publicId: {
            type: String,
            required: false,
        },
        url: {
            type: String,
            required: false,
        },
    },
    invitedBy: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    workspaceId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',  // Reference the Workspace model
        required: true,  // Make it required if workspace is mandatory for invites
    }
    
},
 {
    timestamps: true,
});

const saInvitedMember = mongoose.model('saInvitedMember', saInvitedMemberSchema);
export default saInvitedMember;