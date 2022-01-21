import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from './api';

function Profile() {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getMyInfo = async () => {
      setUserData(null);
      await api.get('/my-info')
        .then((resp) => {
          setUserData(resp.data.info);
        })
        .catch(e => {
          console.log('error', e);
          setUserData(null);
        });
      setIsLoading(false);
    };
    getMyInfo();
  }, []);

  if (isLoading) {
    return (
      <div>loading...</div>
    );
  }
  if (!userData) {
    return (
      <Navigate to="/" />
    );
  }
  return (
    <div style={{ width: '100%' }}>
      <div style={{ maxWidth: '1100px', margin: '48px auto', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>Welcome {userData.name}</p>
          <br />
          <br />
          <p>ID: {userData.id}</p>
          <p>Name: {userData.name}</p>
          <p>Age: {userData.age}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
