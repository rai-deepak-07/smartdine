import React, { useState, useContext, useEffect } from 'react';
import apiUserService from '../../apiservice/apiUserService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/Context';
import toast from 'react-hot-toast';

const UserLogin = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(UserContext);

  const [formFields, setFormFields] = useState({
    user_login_id: '',
    user_login_password: '',
  });

  const handleChange = (e) => {
    setFormFields({...formFields, [e.target.name]: e.target.value});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user_login_id, user_login_password } = formFields;

    if (!user_login_id || !user_login_password) {
      toast.error('Please fill Username & Password');
      return;
    }

    try {
      const response = await apiUserService.post('login/', {
        user_login_id,
        user_login_password,
      });

      const { access, refresh, user_id } = response.data;

      login({ accessToken: access, refreshToken: refresh, user_id });

      toast.success('Login successful!');
      navigate('/user');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error('Invalid Username or Password');
        } else if (error.response.status === 404) {
          toast.error('Invalid API URL');
        } else {
          toast.error('Login Failed! Server Error');
        }
      } else {
        toast.error('Login Failed! Server Not Working');
      }
    }
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
        <label>User Login ID:</label>
        <input
          type="text"
          name="user_login_id"
          maxLength={100}
          value={formFields.user_login_id}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="user_login_password"
          minLength={8}
          maxLength={128}
          value={formFields.user_login_password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
