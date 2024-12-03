  import React, { useState, useEffect, useRef } from 'react';
  import { useLocation, useNavigate } from 'react-router-dom';
  import AdminNavbarG from '../../components/Guest/AdminNavbarG.jsx';
  import KanbanG from './Featured/KanbanG.jsx';
  import ListG from './Featured/ListG.jsx';
  import CalendarG from './Featured/CalendarG.jsx';
  import GanttChartG from './Featured/GanttChartG.jsx';
  import RaciMatrixG from './Featured/RaciMatrixG.jsx';

  const ProjectDetailsG = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [selectedView, setSelectedView] = useState('Kanban');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [addedMembers, setAddedMembers] = useState([]);
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [addText, setAddText] = useState('');
    const [tasks, setTasks] = useState([]);

    const modalRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { projectName, tasks: initialTasks, thumbnail, invitedUsers = [] } = location.state || { projectName: '', tasks: [], thumbnail: null, invitedUsers: [] };
  
    useEffect(() => {
      setTasks(initialTasks);
    }, [initialTasks]);

    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    const handleViewChange = (view) => {
      setSelectedView(view);
    };

    const handleAddClick = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleUserIconClick = () => {
      setIsUserModalOpen(!isUserModalOpen);
    };

    const filteredMembers = (members || []).filter(member =>
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleButtonTextUpdate = (text) => {
      setAddText(text);
      handleCloseModal();
      if (text === 'Gantt Chart') {
        setSelectedView('GanttChart');
      } else if (text === 'RACI Matrix') {
        setSelectedView('RaciMatrix');
      }
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          handleCloseModal();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="w-full flex justify-between items-center mb-16">
          <div className="relative">
            <h1 className="text-2xl font-medium text-gray-800 hidden md:block">
              Project Details
            </h1>
          </div>
          <AdminNavbarG
            isAccountDropdownOpen={isAccountDropdownOpen}
            toggleAccountDropdown={toggleAccountDropdown}
          />
        </div>

        <div className="bg-white p-4 rounded-md shadow-md border border-gray-200">
          <div className="flex items-start space-x-4">
            {/* Display thumbnail on the left */}
            {thumbnail && (
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={thumbnail.url}
                  alt={projectName}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}

            <div className="flex flex-col flex-grow">
              <div className="flex items-center space-x-4 mb-5">
                <button
                  onClick={() => navigate(-1)}
                  className="text-gray-500 hover:underline"
                >
                  Project
                </button>
                <span className="text-gray-500">/</span>
                <span className="text-gray-500">Detail</span>
              </div>

              <div className="relative flex items-center space-x-4">
  <h2 className="text-3xl font-semibold mt-[-1rem]">
    {projectName}
  </h2>

  {/* FaUserPlus icon */}
  <div className="flex items-center space-x-3">
    

    {/* Invited Users' profile images next to the icon */}
    <div className="flex ml-auto -space-x-3 mt-[-13px]">
      {invitedUsers.length > 0 ? (
        invitedUsers.slice(0, 5).map((user) => (
          <img
            key={user._id}
            src={user.profilePicture?.url || user.profilePicture || 'https://www.imghost.net/ib/YgQep2KBICssXI1_1725211680.png'} // Default image fallback
            alt={user.username}
            className="w-6 h-6 rounded-full object-cover border border-gray-300"
          />
        ))
      ) : (
        <p className="text-gray-500 text-sm">No users invited yet.</p>
      )}

      {/* Show "+X" for more than 5 users */}
      {invitedUsers.length > 5 && (
        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
          +{invitedUsers.length - 5}
        </div>
      )}
    </div>
  </div>
</div>


              <div className="flex items-center space-x-4 mt-4">
                <button
                  onClick={() => handleViewChange('Kanban')}
                  className="text-black hover:text-gray-700 text-xs md:text-base"
                >
                  Kanban
                </button>
                <button
                  onClick={() => handleViewChange('List')}
                  className="text-black hover:text-gray-700 text-xs md:text-base"
                >
                  List
                </button>
                <button
                  onClick={() => handleViewChange('Calendar')}
                  className="text-black hover:text-gray-700 text-xs md:text-base"
                >
                  Calendar
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleAddClick}
                    className="text-black hover:text-gray-700 text-xs md:text-base"
                  >
                    + Add
                  </button>
                  {addText && (
                    <span className="text-black font-bold text-xs md:text-base">
                      {addText}
                    </span>
                  )}
                </div>

                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
                    <div
                      ref={modalRef}
                      className="bg-white p-6 rounded-md shadow-lg border border-gray-200"
                    >
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleButtonTextUpdate('Gantt Chart')}
                          className="bg-orange-100 text-orange-600 px-4 py-2 rounded-md"
                        >
                          Gantt Chart
                        </button>
                        <button
                          onClick={() => handleButtonTextUpdate('RACI Matrix')}
                          className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md"
                        >
                          RACI Matrix
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-gray-200">
          {selectedView === 'Kanban' && <KanbanG tasks={tasks} />}
          {selectedView === 'List' && <ListG tasks={tasks} />}
          {selectedView === 'Calendar' && <CalendarG tasks={tasks} />}
          {selectedView === 'GanttChart' && <GanttChartG />}
          {selectedView === 'RaciMatrix' && <RaciMatrixG />}
        </div>

        {isUserModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
            <div className="relative bg-white p-6 md:p-8 rounded-md shadow-lg border border-gray-200 w-11/12 md:w-1/3 min-h-[400px]">
              {error && (
                <p className="text-red-700 p-2 rounded-md mb-4 text-sm md:text-base">
                  {error}
                </p>
              )}
              <button
                className="absolute top-2 right-4 text-gray-600 text-2xl md:text-3xl p-2"
                onClick={() => setIsUserModalOpen(false)}
              >
                &times;
              </button>

              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Add Members
              </h2>

              <div className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Search by email..."
                  className="flex-grow p-2 border border-gray-300 rounded-md text-sm md:text-base"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
                <button
                  className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md text-base md:text-lg"
                  onClick={() => console.log('Add Member')}
                >
                  Add Member
                </button>
              </div>

              <ul className="mb-4">
                {searchQuery ? (
                  filteredMembers.map(member => (
                    <li key={member._id} className="flex items-center mb-2 text-sm md:text-base">
                      <img
                        src={member.profilePicture?.url || user.profilePicture ||'default_image_url'}
                        alt={member.username}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span>{member.email}</span>
                      <button
                        onClick={() => console.log('Select Member')}
                        className="ml-auto p-1 border rounded-md"
                      >
                        Select
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No members found.</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default ProjectDetailsG;
