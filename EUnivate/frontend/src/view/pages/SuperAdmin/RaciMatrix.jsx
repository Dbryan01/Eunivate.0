import React, { useState, useEffect } from "react";
// Import Font Awesome icons
import { FaChevronDown } from "react-icons/fa";

const RaciMatrix = ({ tasks }) => {
  // State to track open dropdowns
  const [openDropdown, setOpenDropdown] = useState(null);

  // State to track selected members, initialized from local storage
  const [selectedMembers, setSelectedMembers] = useState(() => {
    const savedData = localStorage.getItem("selectedMembers");
    return savedData ? JSON.parse(savedData) : {};
  });

  // Function to save selected members into local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedMembers", JSON.stringify(selectedMembers));
  }, [selectedMembers]);

  // Function to toggle dropdown visibility
  const toggleDropdown = (taskId, column) => {
    const key = `${taskId}-${column}`;
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  // Function to handle member selection
  const selectMember = (taskId, column, member) => {
    const key = `${taskId}-${column}`;
    setSelectedMembers((prev) => ({ ...prev, [key]: member }));
    setOpenDropdown(null); // Close the dropdown after selection
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      {tasks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 p-2 text-left text-sm font-medium text-gray-700">
                  Task
                </th>
                <th className="border border-gray-200 p-2 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="border border-gray-200 p-2 text-left text-sm font-medium text-gray-700">
                  Due Date
                </th>
                <th className="border border-gray-200 p-2 text-left text-sm font-medium text-gray-700">
                  Responsible
                </th>
                <th className="border border-gray-200 p-2 text-left text-sm font-medium text-gray-700">
                  Accountable
                </th>
                <th className="border border-gray-200 p-2 text-left text-sm font-medium text-gray-700">
                  Consulted
                </th>
                <th className="border border-gray-200 p-2 text-left text-sm font-medium text-gray-700">
                  Informed
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-100">
                  {/* Task Name */}
                  <td className="border border-gray-200 p-2 text-sm text-gray-800">
                    <h3 className="font-semibold">{task.taskName}</h3>
                  </td>

                  {/* Status */}
                  <td className="border border-gray-200 p-2 text-sm text-gray-800">
                    <p>{task.status}</p>
                  </td>

                  {/* Due Date */}
                  <td className="border border-gray-200 p-2 text-sm text-gray-800">
                    <p>
                      {task.dueDate
                        ? new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                          }).format(new Date(task.dueDate))
                        : "No due date"}
                    </p>
                  </td>

                  {/* Columns for Responsible, Accountable, Consulted, and Informed */}
                  {["Responsible", "Accountable", "Consulted", "Informed"].map(
                    (column) => (
                      <td
                        key={column}
                        className="border border-gray-200 p-2 text-sm text-gray-800"
                      >
                        <div className="flex justify-between items-center">
                          {/* Selected member display */}
                          {selectedMembers[`${task._id}-${column}`] ? (
                            <div className="flex items-center space-x-2">
                              <img
                                src={
                                  selectedMembers[`${task._id}-${column}`]
                                    .profilePicture?.url ||
                                  selectedMembers[`${task._id}-${column}`]
                                    .profilePicture
                                }
                                alt={`${
                                  selectedMembers[`${task._id}-${column}`]
                                    .firstName
                                } ${
                                  selectedMembers[`${task._id}-${column}`]
                                    .lastName
                                }`}
                                className="w-7 h-7 rounded-full object-cover"
                              />
                              <span>
                                {`${
                                  selectedMembers[`${task._id}-${column}`]
                                    .firstName
                                } ${
                                  selectedMembers[`${task._id}-${column}`]
                                    .lastName
                                }`}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-500">No selection</span>
                          )}

                          {/* Dropdown button */}
                          <button
                            onClick={() => toggleDropdown(task._id, column)}
                            className="text-gray-500"
                          >
                            <FaChevronDown />
                          </button>
                        </div>

                        {/* Dropdown content */}
                        {openDropdown === `${task._id}-${column}` && (
                          <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded shadow-lg bg-white">
                            {task.assignee && task.assignee.length > 0 ? (
                              task.assignee.map((member, index) => (
                                <div
                                  key={index}
                                  onClick={() =>
                                    selectMember(task._id, column, member)
                                  }
                                  className="flex items-center p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                                >
                                  <img
                                    src={
                                      member.profilePicture?.url ||
                                      member.profilePicture
                                    }
                                    alt={`${member.firstName} ${member.lastName}`}
                                    className="w-7 h-7 rounded-full object-cover mr-2"
                                  />
                                  <p>{`${member.firstName} ${member.lastName}`}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 p-2">
                                No members assigned
                              </p>
                            )}
                          </div>
                        )}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No tasks available in the RACI Matrix.</p>
      )}
    </div>
  );
};

export default RaciMatrix;
