import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaCircle, FaUser, FaFlag, FaCheckCircle } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const TaskDetailModalG = ({ isOpen, onClose, task, projectName }) => {
  if (!task) return null;

  // State hooks for managing display-only data
  const [startDate, setStartDate] = useState(new Date(task.startDate));
  const [dueDate, setDueDate] = useState(new Date(task.dueDate));

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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 h-[100vh] max-h-[100vh] overflow-y-auto relative">
        <FaTimes
          className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-800"
          size={20}
          onClick={onClose}
        />

        {/* Task Header */}
        <div className="flex items-center mb-4">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              task.status === 'Done' ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            {task.status === 'Done' ? (
              <FaCheckCircle className="text-white" size={20} />
            ) : (
              <FaCircle className="text-white" size={20} />
            )}
          </div>
          <div className="ml-2">
            <h2 className="text-sm text-gray-500 font-semibold">{projectName}</h2>
            <h2 className="text-xl font-semibold text-gray-500">{task.taskName}</h2>
          </div>
        </div>

        {/* Assignees */}
        <div className="mb-4">
          <span className="text-gray-700 text-sm font-semibold">Assignees:</span>
          {task.assignee.length > 0 ? (
            <div className="flex -space-x-5">
              {task.assignee.map((assignee, index) => (
                <div key={index} className="flex items-center">
                  {assignee.profilePicture?.url || assignee.profilePicture ? (
                    <img
                      src={assignee.profilePicture?.url || assignee.profilePicture}
                      alt={assignee.username || 'User'}
                      className="w-8 h-8 rounded-full border"
                    />
                  ) : (
                    <FaUser className="text-gray-500 text-lg bg-transparent rounded-3xl" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <span className="text-sm text-gray-500">No assignees</span>
          )}
        </div>

        {/* Start Date */}
        <div className="mb-4 flex items-center text-gray-500">
          <span className="font-semibold">Start Date:</span>
          <span className="ml-2">{startDate.toLocaleDateString()}</span>
        </div>

        {/* Due Date */}
        <div className="mb-4 flex items-center text-gray-500">
          <span className="font-semibold">Due Date:</span>
          <span className="ml-2">{dueDate.toLocaleDateString()}</span>
        </div>

        {/* Priority */}
        <div className="mb-4 flex items-center text-gray-500">
          <span className="font-semibold">Priority:</span>
          <div className="ml-2 flex items-center">
            <FaFlag className={getPriorityColor(task.priority)} />
            <span className={`ml-2 ${getPriorityColor(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="mb-4 flex items-center text-gray-500">
          <span className="font-semibold">Status:</span>
          <span className="ml-2">{task.status}</span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <span className="text-gray-500 font-semibold">Description:</span>
          <p className="mt-2 text-gray-500 text-sm">{task.description || 'No description available.'}</p>
        </div>

        {/* Objectives */}
        <div className="mb-6">
          <span className="text-gray-500 font-semibold">Objectives:</span>
          <ul className="list-none">
            {task.objectives.length > 0 ? (
              task.objectives.map((objective, index) => (
                <li
                  key={index}
                  className={`flex items-center mt-2 text-sm ${objective.done ? 'text-gray-400' : 'text-black'}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                      objective.done ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    {objective.done ? (
                      <FaCheckCircle className="text-white" size={14} />
                    ) : (
                      <FaCircle className="text-white" size={14} />
                    )}
                  </div>
                  <span className={`flex-1 ${objective.done ? 'line-through' : ''}`}>{objective.text}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No objectives added yet.</li>
            )}
          </ul>
        </div>

        {/* Attachments */}
        <div className="mb-4">
          <span className="text-gray-500 font-semibold">Attachments:</span>
          {task.attachment.length > 0 ? (
            <div className="flex overflow-x-auto space-x-2 py-2">
              {task.attachment.map((url, index) => (
                <div key={index}>
                  <img src={url.url} alt={`Attachment ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
                </div>
              ))}
            </div>
          ) : (
            <span className="text-gray-500">No attachments</span>
          )}
        </div>

      </div>
    </Modal>
  );
};

export default TaskDetailModalG;
