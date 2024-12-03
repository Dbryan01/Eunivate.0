import React, { useState, useEffect, useRef } from 'react';
import AdminNavbar_Members from '../../components/Members/AdminNavbar_Members';
import Chat_Members from './message/Chat_Members';
import Message_Members from './message/Message_Members';
import { FaUsers } from 'react-icons/fa'; // Import icon for the mobile sidebar
import { useWorkspace } from '../../components/SuperAdmin/workspaceContext';

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

const Messages_Mem = () => {
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

  const toggleSidebar = () => {
    setIsMembersOpen(!isMembersOpen);  // Toggle members visibility
    if (isChatOpen) setIsChatOpen(false);  // Close chat if open
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);  // Toggle chat visibility
    if (isMembersOpen) setIsMembersOpen(false);  // Close members if open
  };

  const handleInvitedUsers = (users) => {
    setInvitedUsers(users); // Set invited users
    setLoading(users.length === 0); // Loading state based on users
  };

  const group = {
    groupName: selectedWorkspace ? selectedWorkspace.workspaceTitle : 'No Workspace Selected',
    selectedMembers: invitedUsers,
    imagePreview: 'https://via.placeholder.com/50',
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (membersRef.current && !membersRef.current.contains(event.target)) {
        setIsMembersOpen(false); // Close members section when clicked outside
      }
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsChatOpen(false); // Close chat section when clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedWorkspace) {
      setLoading(false); // Stop loading when workspace is selected
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
        <AdminNavbar_Members 
          isAccountDropdownOpen={isAccountDropdownOpen}
          toggleAccountDropdown={toggleAccountDropdown}
        />
      </div>

      {/* Main layout for desktop with Members_Msg and Chat side by side */}
      <div className="hidden md:flex flex-row gap-2">
        {/* Left side box with Members_Msg component */}
        <div className="bg-white w-1/4 p-4 shadow-md rounded-md">
          <Message_Members 
            onInvitedUsersFetched={handleInvitedUsers}
            workspaceId={selectedWorkspace?._id} // Use the selected workspace ID
          />
        </div>

        {/* Chat section for larger screens */}
        <div className="bg-white w-3/4 p-4 shadow-md rounded-md flex-grow">
          {!loading ? (
            selectedWorkspace ? (
              <Chat_Members group={group} />
            ) : (
              <p>Please select a workspace to view the chat.</p>
            )
          ) : (
            <p>Loading chat...</p>
          )}
        </div>
      </div>

      {/* Mobile layout */}
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

        {/* Conditionally render the Message_Members section for mobile */}
        {isMembersOpen && (
          <div ref={membersRef} className="w-full max-w-md bg-white p-4 shadow-lg rounded-md mt-4 transition-transform duration-300 transform translate-y-0 opacity-100">
            <Message_Members 
              onInvitedUsersFetched={handleInvitedUsers}
              workspaceId={selectedWorkspace?._id} // Pass workspaceId to Message_Members
            />
          </div>
        )}

        {/* Conditionally render the Chat_Members section for mobile */}
        {isChatOpen && (
          <div ref={chatRef} className="w-full max-w-md bg-white p-4 shadow-lg rounded-md mt-4 transition-transform duration-300 transform translate-y-0 opacity-100">
            {!loading ? (
              selectedWorkspace ? (
                <Chat_Members group={group} />
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
            <Message_Members 
              onInvitedUsersFetched={handleInvitedUsers}
              workspaceId={selectedWorkspace?._id} // Pass workspaceId to Message_Members
            />
          </div>
          <div className="w-1/4" onClick={toggleSidebar}></div>
        </div>
      )}
    </div>
  );
};

export default Messages_Mem;
