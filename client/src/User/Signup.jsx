import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({attemptSignup}) {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = e => setUsername(e.target.value);
  const handleChangePassword = e => setPassword(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    attemptSignup({username, password});

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('http://127.0.0.1:5555/users/register', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to register');
    })
    .then(user => navigate('/playlists'))
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        onChange={handleChangeUsername} 
        value={username} 
        placeholder='username' 
      />

      <input 
        type="password" 
        onChange={handleChangePassword} 
        value={password} 
        placeholder='password' 
      />

      <input type="submit" value='Signup' />
    </form>
  );
}

export default Signup;
