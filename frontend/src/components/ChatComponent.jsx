import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * ChatComponent - A component for displaying and managing chat messages.
 *
 * @param {Object} props - The component props.
 * @param {string} props.chatId - The ID of the chat.
 * @returns {JSX.Element} The rendered ChatComponent.
 */
const ChatComponent = ({ chatId }) => {
  // State for messages and new message input
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch messages when chatId changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        // Simulate API call to fetch messages
        const response = await fetch(`/api/chats/${chatId}/messages`);
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // Simulate API call to send a new message
      const response = await fetch(`/api/chats/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setMessages([...messages, data]);
      setNewMessage('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle input change for new message
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading messages...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message.id} className="p-3 bg-gray-100 rounded-lg">
                <p className="text-gray-800">{message.text}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* New message form */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

// PropTypes for type checking
ChatComponent.propTypes = {
  chatId: PropTypes.string.isRequired,
};

export default ChatComponent;