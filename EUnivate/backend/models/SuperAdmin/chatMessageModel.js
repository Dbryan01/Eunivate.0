import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    workspaceId: {  // Change workspaceId to be a string instead of ObjectId
        type: String,  // Use String instead of ObjectIds
        required: true
    },
    replies: [
        {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        }   
    ],
    reactions: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            reaction: {
                type: String,
                enum: ['😀', '👏', '👍', '😍', '😂'],
            },
            reactedAt: { type: Date, default: Date.now },
        }
    ],
    starredBy: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    priorityFlag: {
        type: String,
        enum: ['red', 'green', 'yellow', null],
        default: null
    },
    files: [
        {
            publicId: { type: String },
            url: { type: String },
            uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            uploadedAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    removed: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
