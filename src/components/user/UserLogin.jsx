import React, { useState, useContext, useEffect } from 'react';
import ApiService from '../../apiservice/ApiService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/Context';
import toast from 'react-hot-toast';

const UserLogin = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(UserContext);

  const [formFields, setFormFields] = useState({
    user_email: '',
    user_password: '',
  });

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user_email, user_password } = formFields;

    if (!user_email || !user_password) {
      toast.error('Please fill Email & Password');
      return;
    }

    toast.promise(
      ApiService.post('user/login/', { user_email, user_password })
        .then((response) => {
          const { access, refresh, user_id } = response.data;
          login({ accessToken: access, refreshToken: refresh, user_id });
          navigate('/user');
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) throw new Error('Invalid Username or Password');
            else if (error.response.status === 404) throw new Error('Invalid API URL');
            else throw new Error('Login Failed! Server Error');
          } else {
            throw new Error('Login Failed! Server Not Working');
          }
        }),
      {
        loading: 'Logging you in...',
        success: 'Login successful!',
        error: (err) => String(err.message || err) || 'Unknown error',
      }
    );

  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/user');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="user_email"
          maxLength={100}
          value={formFields.user_email}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="user_password"
          minLength={8}
          maxLength={128}
          value={formFields.user_password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
