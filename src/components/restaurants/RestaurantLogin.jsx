import { useContext, useEffect, useState } from 'react';
import apiRestaurantService from '../../apiservice/apiRestaurantService';
import { useNavigate } from 'react-router-dom';
import { ResturantContext } from '../../context/Context';

const RestaurantLogin = () => {
  const navigate = useNavigate();
  const { isRestaurantLoggedIn, setIsRestaurantLoggedIn } = useContext(ResturantContext);

  // Use a single state object for form values
  const [formFields, setFormFields] = useState({
    res_login_id: '',
    res_login_password: ''
  });

  const handleChange = (e) => {
    setFormFields({...formFields, [e.target.name]: e.target.value});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { res_login_id, res_login_password } = formFields;

    if (res_login_id === "" || res_login_password === "") {
      alert('Please fill Username & Password');
    } else {
      try {
        // Note: endpoint should be just 'login/' if your backend is /login/
        const response = await apiRestaurantService.post('login/', {
          res_login_id,
          res_login_password
        });

        const { access, refresh, res_reg_id } = response.data;
        localStorage.setItem('restaurant_access_token', access);
        localStorage.setItem('restaurant_refresh_token', refresh);
        localStorage.setItem('restaurant_res_reg_id', res_reg_id);

        setIsRestaurantLoggedIn(true);
        navigate('/restaurant');
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
    if (isRestaurantLoggedIn) {
      navigate('/restaurant');
    }
  }, [isRestaurantLoggedIn, navigate]);

  return (
    <div>
      <h2>Restaurant Login</h2>
      <form onSubmit={handleLogin}>
        <label>Restaurant Login ID:</label>
        <input
          type="text"
          name="res_login_id"
          maxLength={100}
          value={formFields.res_login_id}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="res_login_password"
          minLength={8}
          maxLength={128}
          value={formFields.res_login_password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default RestaurantLogin;
