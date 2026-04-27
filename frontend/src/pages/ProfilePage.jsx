import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatComponent from '../components/ChatComponent';
import UserProfile from '../components/UserProfile';
import AdComponent from '../components/AdComponent';

const ProfilePage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchUserAds = async () => {
      try {
        const response = await fetch(`/api/users/${id}/ads`);
        if (!response.ok) {
          throw new Error('Failed to fetch user ads');
        }
        const data = await response.json();
        setAds(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchUserAds();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <UserProfile user={userData} />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">User Ads</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ads.map((ad) => (
                <AdComponent key={ad.id} ad={ad} />
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <ChatComponent userId={id} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;