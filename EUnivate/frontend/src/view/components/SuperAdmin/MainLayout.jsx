import React from 'react';
import SideNav from './SideNav';
import Messages from '../../pages/SuperAdmin/Messages';
import { WorkspaceProvider } from './workspaceContext';  // Workspace context

const MainLayout = () => {
  return (
    <WorkspaceProvider>
      <div className="flex">
        <SideNav />
        <div className="flex-grow">
          <Messages />
        </div>
      </div>
    </WorkspaceProvider>
  );
};

export default MainLayout;
