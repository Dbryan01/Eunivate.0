import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChevronDown, 
    faChevronUp, 
    faFolderOpen, 
    faUserAlt,   // Icon for guest
    faUserShield, 
    faUserTie 
} from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import { FaUsers } from 'react-icons/fa'; // Import FaUsers from react-icons

const Modal_Profile = ({ user, onClose }) => {
    const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false); // State to toggle dropdown

    const toggleProjectsDropdown = () => {
        setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
    };

    // Array of color classes to cycle through
    const colorClasses = ['text-red-500', 'text-blue-500', 'text-yellow-500', 'text-green-500'];

    // Map roles to specific icons
    const roleIcons = {
        guest: faUserAlt,       // Icon for guest
        members: FaUsers,        // Use FaUsers from react-icons for member
        admin: faUserTie,       // Icon for admin
        superadmin: faUserShield // Icon for superadmin
    };

    // Get the role icon, or fallback to a default icon if the role is not in the map
    const RoleIconComponent = roleIcons[user.role.toLowerCase()] || faUserAlt;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <div className="relative bg-white w-full max-w-sm rounded-lg p-6 z-60"> {/* Changed from max-w-md to max-w-sm */}
                
                {/* Centered title with role icon */}
                <div className="flex justify-center items-center mb-4 space-x-2">
                    {/* Use different rendering approach for FaUsers */}
                    {typeof RoleIconComponent === 'function' ? (
                        <RoleIconComponent className="text-gray-700" size={24} />  // If react-icon component, render it directly
                    ) : (
                        <FontAwesomeIcon icon={RoleIconComponent} className="text-gray-700" />  // Else, render FontAwesomeIcon
                    )}
                    <h3 className="text-lg font-medium text-gray-900">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
                    </h3>
                </div>

                {/* Centering profile picture and details */}
                <div className="flex flex-col items-center mb-4">
                    <img 
                        src={user.profilePicture?.url || user.profilePicture || '/default-profile.png'} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-green-500"  // Added green border
                    />
                    <p className="text-xl font-semibold">{user.email}</p>
                </div>

                {/* Projects Dropdown */}
                <div className="mb-4 w-full text-left">
                    <button
                        onClick={toggleProjectsDropdown}
                        className="bg-gray-100 text-gray-700 py-2 px-4 w-full text-left rounded-lg flex justify-between items-center"
                    >
                        <span className="font-medium">Projects</span>
                        <FontAwesomeIcon icon={isProjectsDropdownOpen ? faChevronUp : faChevronDown} /> {/* Font Awesome icons */}
                    </button>
                    {isProjectsDropdownOpen && (
                        <ul className="text-base text-gray-800 mt-2 bg-gray-50 rounded-lg p-4 space-y-2"> {/* Larger text and spacing */}
                            {Array.isArray(user.project) && user.project.length > 0 ? (
                                user.project.map((proj, index) => (
                                    <li key={proj._id} className="flex items-center space-x-3">
                                        <FontAwesomeIcon 
                                            icon={faFolderOpen} 
                                            className={colorClasses[index % colorClasses.length]}  // Assign a different color for each project
                                        /> 
                                        <span>{proj.projectName}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-600">No Project Assigned</li>
                            )}
                        </ul>
                    )}
                </div>

                {/* Centered rectangular close button */}
                <div className="flex justify-center mt-6">
                    <button 
                        className="bg-red-800 text-white px-6 py-2 rounded-lg w-full hover:bg-red-900"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal_Profile;
