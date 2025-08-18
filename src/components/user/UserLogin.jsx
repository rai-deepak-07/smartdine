import { useContext, useEffect, useState } from 'react';
import apiUserService from '../../apiservice/apiUserService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/Context';

const UserLogin = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);

  // Use a single state object for form values
  const [formFields, setFormFields] = useState({
    user_login_id: '',
    user_login_password: ''
  });

  const handleChange = (e) => {
    setFormFields({...formFields, [e.target.name]: e.target.value});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user_login_id, user_login_password } = formFields;

    if (user_login_id === "" || user_login_password === "") {
      alert('Please fill Username & Password');
    } else {
      try {
        // Note: endpoint should be just 'login/' if your backend is /login/
        const response = await apiUserService.post('login/', {
          user_login_id,
          user_login_password
        });

        const { access, refresh, user_id } = response.data;
        localStorage.setItem('user_access_token', access);
        localStorage.setItem('user_refresh_token', refresh);
        localStorage.setItem('user_id', user_id);

        setIsUserLoggedIn(true);
        navigate('/user');
      } catch (error) {
        console.error('Login failed:', error);
        if (error) {
          if (error.response) {
            if (error.response.status === 401) {
              alert('Invalid Username or Password');
            }
            if (error.response.status === 404) {
              alert('Invalid API Url');
            }
          } else {
            alert('Login Failed! Server Not Working');
          }
        }
      }
    }
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/user');
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <>
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
    </>
  );
};

export default UserLogin;
