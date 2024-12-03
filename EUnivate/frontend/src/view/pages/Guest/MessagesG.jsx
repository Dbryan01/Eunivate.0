import React, { useState, useEffect, useRef } from 'react';
import AdminNavbarG from '../../components/Guest/AdminNavbarG';
import ChatGuest from './message/ChatGuest';
import Message_Guest from './message/Message_Guest';
import { FaUsers } from 'react-icons/fa'; // Import icon for the mobile sidebar
import { useWorkspace } from '../../components/SuperAdmin/workspaceContext'; // Use Workspace context

const getInitials = (name) => {
  const words = name.split(' ');
  if (words.length > 1) {
    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  } else {
    return words[0].charAt(0).toUpperCase();
  }
};

const getColorFromName = (name) => {
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500'];
  const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const MessagesG = () => {
  const { selectedWorkspace } = useWorkspace();  // Get selected workspace from context
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chat visibility
  const [isMembersOpen, setIsMembersOpen] = useState(false); // State for members visibility
  const [invitedUsers, setInvitedUsers] = useState([]); // State for invited users
  const [loading, setLoading] = useState(true); // Loading state

  const membersRef = useRef(null);
  const chatRef = useRef(null);

  const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

  // Toggle members visibility for mobile, and close chat when opening members
  const toggleSidebar = () => {
    setIsMembersOpen(!isMembersOpen);  // Toggle members
    if (isChatOpen) setIsChatOpen(false);  // Close chat if open
  };

  // Toggle chat visibility for mobile, and close members when opening chat
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);  // Toggle chat
    if (isMembersOpen) setIsMembersOpen(false);  // Close members if open
  };

  // Callback to get invited users from Message_Guest
  const handleInvitedUsers = (users) => {
    setInvitedUsers(users); // Set the invited users to be passed into the group
    setLoading(users.length === 0); // Set loading based on fetched users
  };

  // Example group data with members from invitedUsers
  const group = {
    groupName: selectedWorkspace ? selectedWorkspace.workspaceTitle : 'No Workspace Selected',
    selectedMembers: invitedUsers,
    imagePreview: 'https://via.placeholder.com/50'
  };

  // Effect to close members or chat when clicked outside of them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (membersRef.current && !membersRef.current.contains(event.target)) {
        setIsMembersOpen(false); // Close members if clicked outside
      }
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsChatOpen(false); // Close chat if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedWorkspace) {
      setLoading(false); // Stop loading when the workspace is selected
    } else {
      setLoading(true);
    }
  }, [selectedWorkspace]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="w-full flex justify-between items-center mb-4">
        <div className="relative">
          <h1 className="text-2xl font-medium text-gray-800 hidden md:block">
            Message
          </h1>
        </div>
        <AdminNavbarG 
          isAccountDropdownOpen={isAccountDropdownOpen}
          toggleAccountDropdown={toggleAccountDropdown}
        />
      </div>

      {/* Main layout for desktop with Message_Guest and ChatGuest side by side */}
      <div className="hidden md:flex flex-row gap-2">
        {/* Left side box with Message_Guest component */}
        <div className="bg-white w-1/4 p-4 shadow-md rounded-md">
          <Message_Guest 
            onInvitedUsersFetched={handleInvitedUsers}
            workspaceId={selectedWorkspace?._id} // Use the selected workspace ID
          />
        </div>

        {/* Chat section for larger screens */}
        <div className="bg-white w-3/4 p-4 shadow-md rounded-md flex-grow">
          {!loading ? (
            selectedWorkspace ? (
              <ChatGuest group={group} />
            ) : (
              <p>Please select a workspace to view the chat.</p>
            )
          ) : (
            <p>Loading chat...</p>
          )}
        </div>
      </div>

      {/* Mobile layout: Buttons at the top, chat or members below */}
      <div className="md:hidden flex flex-col items-center mb-auto space-y-4">
        {/* Buttons side by side for members and chat */}
        <div className="flex space-x-4">
          {/* First icon (members toggle for mobile) */}
          <button onClick={toggleSidebar} className="text-gray-800 p-2 rounded-full shadow-md bg-white w-10 h-10 flex items-center justify-center">
            <FaUsers size={24} /> {/* Icon for mobile */}
          </button>

          {/* Second icon (chat toggle for mobile) */}
          <button onClick={toggleChat} className={`p-2 rounded-full shadow-md w-10 h-10 flex items-center justify-center ${getColorFromName(group.groupName)}`}>
            <div className="flex items-center justify-center text-white text-lg font-bold rounded-full">
              {group.groupName ? getInitials(group.groupName) : 'W'}
            </div>
          </button>
        </div>

        {/* Conditionally render the Message_Guest section for mobile */}
        {isMembersOpen && (
          <div ref={membersRef} className="w-full max-w-md bg-white p-4 shadow-lg rounded-md mt-4 transition-transform duration-300 transform translate-y-0 opacity-100">
            <Message_Guest 
              onInvitedUsersFetched={handleInvitedUsers}
              workspaceId={selectedWorkspace?._id} // Pass workspaceId to Message_Guest
            />
          </div>
        )}

        {/* Conditionally render the Chat section for mobile */}
        {isChatOpen && (
          <div ref={chatRef} className="w-full max-w-md bg-white p-4 shadow-lg rounded-md mt-4 transition-transform duration-300 transform translate-y-0 opacity-100">
            {!loading ? (
              selectedWorkspace ? (
                <ChatGuest group={group} />
              ) : (
                <p>Please select a workspace to view the chat.</p>
              )
            ) : (
              <p>Loading chat...</p>
            )}
          </div>
        )}
      </div>

      {/* Sidebar for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex">
          <div className="bg-white w-3/4 h-full p-4 shadow-md rounded-md">
            <Message_Guest 
              onInvitedUsersFetched={handleInvitedUsers}
              workspaceId={selectedWorkspace?._id} // Pass workspaceId to Message_Guest
            />
          </div>
          <div className="w-1/4" onClick={toggleSidebar}></div>
        </div>
      )}
    </div>
  );
};

export default MessagesG;
