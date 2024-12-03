import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
    workspaceTitle: {
      type: String,
      required: true,
      unique: true
    },
    owner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    users: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }], // Users directly added to the workspace
    invitedMembers: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'saInvitedMember' 
    }], // Add invited members here
    
  }, {
    timestamps: true
  });
  
const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;
