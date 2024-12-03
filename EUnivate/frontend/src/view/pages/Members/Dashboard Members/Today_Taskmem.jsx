import React, { useState } from 'react';
import { FaCheckCircle, FaRegCircle, FaRegCalendarAlt, FaPaperclip, FaFlag } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import filterIcon from '../../../../assets/Filter.png';

const Tooltip = ({ children, title }) => {
  // Function to determine if the title is long
  const isLongName = title.length > 10;

  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute hidden group-hover:flex bg-gray-700 text-white text-[10px] rounded-md p-1 ${
          isLongName ? 'whitespace-normal -bottom-12' : 'whitespace-nowrap -bottom-8'
        } left-1/2 transform -translate-x-1/2 z-[9999]`}
      >
        {title}
      </div>
    </div>
  );
};



const Today_Task = ({ projects, taskDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const getFlagColor = (priority) => {
    switch (priority) {
      case 'easy':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'hard':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const renderTodayTasks = () => {
    if (!projects.length) return <p>No tasks for today</p>;

    return projects.map((project) => {
      const { tasks = [] } = taskDetails[project._id] || {};

      if (tasks.length === 0) return null;

      return tasks.map((task, index) => (
        <div key={index} className="relative flex items-start mb-4 pb-4 border-b border-gray-300">
          {task.status === 'Done' ? (
            <FaCheckCircle className="text-green-500 text-3xl mr-3 relative top-5" />
          ) : (
            <FaRegCircle className="text-gray-400 text-3xl mr-3 relative top-5" />
          )}
          <div className="flex-1">
            <h3 className="text-sm text-gray-800 mb-1">{project.projectName}</h3>
            <div className="text-gray-600 text-sm font-bold">{task.taskName}</div>
            <div className="flex text-xs text-gray-500 mt-1">
              <div className="flex items-center">
                <FaRegCalendarAlt className="text-gray-400 mr-1" />
                {task.startDate ? format(parseISO(task.startDate), 'd MMM') : 'N/A'}
              </div>
              <div className="ml-4 flex items-center">
                <img src={filterIcon} alt="Objectives icon" className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">
                  {task.objectives?.length > 0 ? `${task.objectives.length} Objective` : '-'}
                </span>
                <span className="sm:hidden">{task.objectives?.length || 0}</span>
              </div>
              <div className="ml-4 flex items-center">
                <FaPaperclip className="text-gray-400 mr-1" />
                <span className="hidden sm:inline">
                  {task.attachment?.length > 0 ? `${task.attachment.length} Attachment` : '-'}
                </span>
                <span className="sm:hidden">{task.attachment?.length || 0}</span>
              </div>
              <div className="ml-4 flex items-center">
                <FaFlag className={`${getFlagColor(task.priority)} mr-1`} />
                <span className="hidden sm:inline">
                  {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'No Priority'}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Pictures with Tooltip */}
          <div className="flex -space-x-3">
            {task.assignee &&
              task.assignee.map((member, index) => (
                <Tooltip key={index} title={`${member.firstName} ${member.lastName}`}>
                  <img
                    src={member.profilePicture?.url || member.profilePicture}
                    alt={member.name}
                    className="w-8 h-8 rounded-full border-2 border-white relative z-40"
                  />
                </Tooltip>
              ))}
          </div>
        </div>
      ));
    });
  };

  return (
    <div>
      <h2 className="text-medium font-semibold text-gray-800 mb-2">Today Task</h2>
      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm today-task-div">
        {renderTodayTasks()}
      </div>

      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
          <img
            src={selectedImage}
            alt="Full View"
            className="max-w-lg max-h-lg object-contain cursor-pointer"
            onClick={closeModal}
          />
        </div>
      )}
    </div>
  );
};


export default Today_Task;
