import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import progressGif from '../../../../assets/gif/process.gif'; 
import doneImage from '../../../../assets/gif/checklist.gif'; 

const TaskModal = ({ task, onClose }) => {
  // Determine which image to show based on the task status
  const displayImage = task.status === 'Done' ? doneImage : progressGif;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* Close button and task name */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{task.taskName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Conditionally display the appropriate image based on the task status */}
        <div className="flex justify-center mb-6">
          <img
            src={displayImage} // Use the conditional image here
            alt="Task Status"
            className="w-40 h-40 object-cover"
          />
        </div>

        {/* Task details with check icon on the left side */}
        <div className="space-y-2">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
            <p><strong>Status:</strong> {task.status}</p>
          </div>

          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
            <p><strong>Priority:</strong> {task.priority}</p>
          </div>

          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
            <p><strong>Start Date:</strong> {format(new Date(task.startDate), 'MMMM d, yyyy')}</p>
          </div>

          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
            <p><strong>Due Date:</strong> {format(new Date(task.dueDate), 'MMMM d, yyyy')}</p>
          </div>

          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
            <p><strong>Objectives:</strong> {task.objectives ? task.objectives.length : 0}</p>
          </div>

          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
            <p><strong>Attachments:</strong> {task.attachment ? task.attachment.length : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
