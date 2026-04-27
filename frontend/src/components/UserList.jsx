import React from 'react';
import PropTypes from 'prop-types';

/**
 * UserList component displays a list of users with edit and delete functionality.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.users - Array of user objects to display
 * @param {Function} props.onEdit - Callback function for edit action
 * @param {Function} props.onDelete - Callback function for delete action
 * @returns {JSX.Element} Rendered UserList component
 */
const UserList = ({ users, onEdit, onDelete }) => {
  // Handle loading state
  if (!users) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  // Handle error state
  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">No users found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">User List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{user.id}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(user.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// PropTypes for type checking
UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserList;