import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    if (!window) return;
    await api.post(
      '/login',
      { username, password },
    ).then(resp => {
      const { token } = resp.data;
      window.localStorage.setItem('access-token', token);
      navigate('profile');
    });
  };

  useEffect(() => {
    const getMyInfo = async () => {
      setUserData(null);
      await api.get('/my-info')
        .then((resp) => {
          setUserData(resp.data.info);
          navigate('/profile');
        })
        .catch(e => {
          console.log('error', e);
          setUserData(null);
        });
      setIsLoading(false);
    };
    getMyInfo();
  }, []);

  console.log('sdasda');
  if (isLoading) {
    return (
      <div>loading...</div>
    );
  }
  if (!userData) {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ maxWidth: '1100px', margin: '48px auto', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>Please log in first</div>
            <div style={{ marginLeft: '24px' }}>
              <p>username</p>
              <input onChange={e => setUsername(e.target.value)} />
              <p>password</p>
              <input onChange={e => setPassword(e.target.value)} />
              <br />
              <br />
              <br />
              <button type="button" style={{ width: '100%' }} onClick={login}>Log in</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <p>Welcome {userData.name}</p>
    </div>
  );
}

export default App;
