import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * UserForm component for handling user data submission
 * @param {Object} props - Component props
 * @param {Object} props.user - Initial user data
 * @param {Function} props.onSubmit - Callback function for form submission
 */
const UserForm = ({ user, onSubmit }) => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  // State for form errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    age: '',
  });

  // State for loading status
  const [isLoading, setIsLoading] = useState(false);

  // State for submission status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
      });
    }
  }, [user]);

  /**
   * Handle input change
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Validate form data
   * @returns {boolean} - True if form is valid, false otherwise
   */
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    } else {
      newErrors.name = '';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    } else {
      newErrors.email = '';
    }

    // Validate age
    if (!formData.age) {
      newErrors.age = 'Age is required';
      valid = false;
    } else if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = 'Age must be a positive number';
      valid = false;
    } else {
      newErrors.age = '';
    }

    setErrors(newErrors);
    return valid;
  };

  /**
   * Handle form submission
   * @param {Object} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      onSubmit(formData)
        .then(() => {
          setIsSubmitted(true);
        })
        .catch(() => {
          // Handle submission error
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Form</h2>
      {isSubmitted ? (
        <div className="text-green-500">Form submitted successfully!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

// PropTypes for UserForm component
UserForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default UserForm;