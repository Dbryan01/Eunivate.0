import React from 'react';

// Exporting the search options array
export const searchOptions = [
  { name: 'Settings', route: '/superadmin/settings' },
  { name: 'Dashboard', route: '/superadmin/dashboard' },
  { name: 'Today Task', route: '/superadmin/dashboard#today-task' },
  { name: 'Ongoing Project', route: '/superadmin/dashboard#ongoing-project' },
  { name: 'Activity Task', route: '/superadmin/dashboard#activity-task' },
  { name: 'Assigned Task', route: '/superadmin/dashboard#assigned-task' },
  { name: 'Task Complete', route: '/superadmin/dashboard#task-complete' },
  { name: 'Objective Complete', route: '/superadmin/dashboard#objective-complete' },
  { name: 'Project Complete', route: '/superadmin/dashboard#project-complete' },
  { name: 'Project', route: '/superadmin/project' },
  { name: 'New Project', route: '/superadmin/project' },
  { name: 'Task', route: '/superadmin/task' },
  { name: 'Due Date', route: '/superadmin/task' },
  { name: 'Priority', route: '/superadmin/task' },
  { name: 'Objectives', route: '/superadmin/task' },
  { name: 'Status', route: '/superadmin/task' },
  { name: 'Activity', route: '/superadmin/activity' },
  { name: 'People', route: '/superadmin/people' },
  { name: 'Invited Members', route: '/superadmin/people' },
  { name: 'Add Members', route: '/superadmin/people' },
  { name: 'Role', route: '/superadmin/people' },
  { name: 'Actions', route: '/superadmin/people' },
  { name: 'Remove', route: '/superadmin/people' },
  { name: 'About', route: '/superadmin/messages' },
  { name: 'Select Workspace (Team)', route: '/superadmin/messages' },
  { name: 'Topic', route: '/superadmin/messages' },
  { name: 'Description', route: '/superadmin/messages' },
  { name: 'Member', route: '/superadmin/messages' },
  { name: 'Messages', route: '/superadmin/messages' },
  { name: 'Profile', route: '/superadmin/settings' },
  { name: 'Notification', route: '/superadmin/settings' },
  { name: 'Account', route: '/superadmin/settings' },
  { name: 'Privacy Policy', route: '/superadmin/settings' },
  { name: 'Edit User Profile', route: '/superadmin/settings' },
  { name: 'Edit', route: '/superadmin/settings' },
  { name: 'Biodata', route: '/superadmin/settings' },
  { name: 'Phone Number', route: '/superadmin/settings' },
  { name: 'Email', route: '/superadmin/settings' },
  { name: 'Change your Password', route: '/superadmin/settings' },
  { name: 'Change Password', route: '/superadmin/settings' }
];

const SearchContext = () => {
  return <div>SearchContext</div>;
};

export default SearchContext;
