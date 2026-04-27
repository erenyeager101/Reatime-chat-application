import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatComponent from '../components/ChatComponent';
import UserProfile from '../components/UserProfile';
import AdComponent from '../components/AdComponent';

const ChatPage = () => {
  const { id } = useParams();
  const [chatData, setChatData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [adData, setAdData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch chat data
        const chatResponse = await fetch(`/api/chats/${id}`);
        const chatData = await chatResponse.json();
        setChatData(chatData);

        // Fetch user data
        const userResponse = await fetch(`/api/users/${chatData.userId}`);
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch ad data
        const adResponse = await fetch(`/api/ads/${chatData.adId}`);
        const adData = await adResponse.json();
        setAdData(adData);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h1 className="text-2xl font-bold mb-4">Chat</h1>
              <ChatComponent chatData={chatData} />
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">User Profile</h2>
              <UserProfile userData={userData} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Ad Details</h2>
              <AdComponent adData={adData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;