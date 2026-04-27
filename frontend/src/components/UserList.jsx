import React from 'react';
import PropTypes from 'prop-types';

/**
 * UserList component displays a list of users with delete functionality.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.users - Array of user objects to display.
 * @param {Function} props.onDelete - Function to call when a user is deleted.
 * @returns {JSX.Element} Rendered UserList component.
 */
const UserList = ({ users, onDelete }) => {
  // Handle loading state
  if (!users) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading users...</p>
      </div>
    );
  }

  // Handle error state
  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">No users found.</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">User List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <button
                onClick={() => onDelete(user.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
                aria-label={`Delete ${user.name}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </section>
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
  onDelete: PropTypes.func.isRequired,
};

export default UserList;