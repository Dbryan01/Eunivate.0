import React from 'react';
import { FaTimes, FaCheckCircle, FaRegCalendarAlt, FaFlag } from 'react-icons/fa';

const Task_Modal = ({ task, isOpen, onClose, formatDate }) => {
    if (!task) return null;

    const isTaskDone = task.status.toLowerCase() === 'done';

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'easy':
                return 'text-green-500';
            case 'medium':
                return 'text-yellow-500';
            case 'hard':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Document':
                return 'bg-[#DDFBC5]';
            case 'Todo':
                return 'bg-[#CFE8FF]';
            case 'Ongoing':
                return 'bg-[#FCE9C0]';
            case 'Done':
                return 'bg-[#DBDBDBFF]';
            case 'Backlog':
                return 'bg-[#FED5F2]';
            default:
                return 'bg-gray-200';
        }
    };

    return (
        <div className={`fixed inset-0 z-50 flex justify-end bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-white py-6 rounded-l-lg shadow-lg max-w-sm w-full h-full overflow-y-auto transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button
                    className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={onClose}
                >
                    <FaTimes className="text-xl" />
                </button>

                <div className="relative">
                    <div className="absolute top-0 left-6 mt-2 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {isTaskDone && <FaCheckCircle className="text-green-500 text-2xl" />}
                    </div>
                    <h2 className="text-xl mb-1 mt-5 ml-20">{task.projectName}</h2>
                    <p className="text-md mb-4 ml-20 font-bold text-gray-600">{task.taskName}</p>
                </div>

                {/* Assignees */}
                <div className="mt-4 flex items-center ml-5 mr-10">
                    <p className="font-semibold">Assignee:</p>
                    <div className="flex items-end ml-2 -space-x-2">
                        {task.invitedUsers.slice(0, 3).map(user => (
                            <div key={user._id} className="flex items-center">
                                <img
                                    src={user.profilePicture?.url || user.profilePicture}
                                    alt={user.username || 'Profile Picture'}
                                    className="w-5 h-5 rounded-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Due Date */}
                <div className="mt-3 flex items-center ml-5 mr-10">
                    <p className="font-semibold">Due Date:</p>
                    <FaRegCalendarAlt className="text-gray-600 ml-3" />
                    <p className="text-sm ml-2">{formatDate(task.dueDate)}</p>
                </div>

                {/* Priority */}
                <div className="mt-3 flex items-center ml-5 mr-10">
                    <p className="font-semibold">Priority:</p>
                    <FaFlag className={`ml-7 ${getPriorityColor(task.priority)}`} />
                    <p className="ml-2 text-sm">{task.priority}</p>
                </div>

                {/* Status */}
                <div className="mt-3 flex items-center ml-5 mr-10">
                    <p className="font-semibold">Status:</p>
                    <div className={`ml-10 px-3 py-1 rounded-md ${getStatusColor(task.status)}`}>
                        <p className="text-sm">{task.status}</p>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-4 ml-5 mr-5">
                    <p className="font-semibold">Description:</p>
                    <textarea
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        value={task.description}
                        disabled
                    />
                </div>

                {/* Attachments */}
                <div className="mt-4 ml-5 mr-5">
                    <p className="font-semibold">Attachments:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {task.attachment && task.attachment.length > 0 ? (
                            task.attachment.map((attachment, index) => (
                                <img
                                    key={index}
                                    src={attachment.url}
                                    alt={`attachment-${index}`}
                                    className="w-20 h-20 object-cover rounded-md border border-gray-200"
                                />
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No attachments available.</p>
                        )}
                    </div>
                </div>

                {/* Done Objectives Section */}
                <div className="mt-4 ml-5 mr-5">
                    <p className="font-semibold">Done Objectives:</p>
                    <div className="space-y-2 mt-2">
                        {task.objectives.filter(obj => obj.done).map((objective, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center border bg-green-500 border-green-500">
                                    <FaCheckCircle className="text-white text-sm" />
                                </div>
                                <p className="text-sm line-through text-gray-500">
                                    {objective.text}
                                </p>
                            </div>
                        ))}
                        {task.objectives.filter(obj => obj.done).length === 0 && (
                            <p className="text-sm text-gray-500">No objectives completed yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task_Modal;
