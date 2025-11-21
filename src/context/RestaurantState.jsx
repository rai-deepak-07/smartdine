import emailjs from "emailjs-com";
import React, { useState, useEffect } from 'react';
import { RestaurantContext } from './Context';
import { useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { data, useNavigate } from 'react-router-dom';
import RestaurantApi from '../apiservice/RestaurantApi';

const RestaurantState = (props) => {

  // Token Verification
  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  };

  // Login State Management
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('restaurant_access_token');
    return token && !isTokenExpired(token);
  });

  const navigate = useNavigate();

  // Login handler: save tokens and set login state
  const login = ({ accessToken, refreshToken, user_id }) => {
    localStorage.setItem('restaurant_access_token', accessToken);
    localStorage.setItem('restaurant_refresh_token', refreshToken);
    localStorage.setItem("restaurant_reg_id", user_id);
    fetchRestaurantDetails();
    setIsLoggedIn(true);
  };

  // Logout handler: remove tokens and update state
  const logout = useCallback(() => {
    localStorage.removeItem('restaurant_access_token');
    localStorage.removeItem('restaurant_refresh_token');
    localStorage.removeItem("restaurant_reg_id");
    setIsLoggedIn(false);
    navigate('/restaurant-login');
  }, [navigate]);

  const [restaurantData, setRestaurantData] = useState([]);

  // Restaurant Details Handler: Fetch Restaurant Details
  const fetchRestaurantDetails = () => {
    const restaurant_id = localStorage.getItem('restaurant_reg_id');
    RestaurantApi.get(`restaurant/details/${restaurant_id}/`)
      .then(response => {
        setRestaurantData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the restaurant data!", error);
      });
  };


  // Staff Management State and Handlers
  const [staffData, setStaffData] = useState([]);

  const fetchStaffData = async () => {
    const restaurant_id = localStorage.getItem('restaurant_reg_id');
    try {
      const res = await RestaurantApi.get(`management/staff/?restaurant=${restaurant_id}`);
      setStaffData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addStaff = async (staffMember) => {
    try {
      const restaurantId = localStorage.getItem('restaurant_reg_id');

      if (staffMember instanceof FormData) {
        staffMember.append("restaurant", restaurantId);
        await RestaurantApi.post("management/staff/", staffMember);
      } else {
        const payload = {
          ...staffMember,
          restaurant: restaurantId,
        };

        await RestaurantApi.post("management/staff/", { data: payload });
      }

      await fetchStaffData();
    } catch (error) {
      console.error("There was an error adding the staff member!", error);
    }
  };

  const updateStaff = async (id, updatedStaff) => {
    try {
      await RestaurantApi.patch(`management/staff/${id}/`, updatedStaff);
      await fetchStaffData();
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await RestaurantApi.delete(`management/staff/${id}/`);
      await fetchStaffData();
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  //Table Management State and Handlers

  const [tablesData, setTablesData] = useState([]);

  const fetchTablesData = async () => {
    const restaurant_id = localStorage.getItem('restaurant_reg_id');
    try {
      const res = await RestaurantApi.get(`management/tables/?restaurant=${restaurant_id}`);
      setTablesData(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  // ===============================
  // CATEGORY MANAGEMENT
  // ===============================

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const restaurant_id = localStorage.getItem("restaurant_reg_id");
    try {
      const res = await RestaurantApi.get(
        `management/menu-categories/?restaurant=${restaurant_id}`
      );
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      const restaurant_id = localStorage.getItem("restaurant_reg_id");
      const payload = { ...categoryData, restaurant: restaurant_id };

      await RestaurantApi.post("management/menu-categories/", payload);
      await fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      await RestaurantApi.patch(
        `management/menu-categories/${id}/`,
        categoryData
      );
      await fetchCategories();
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await RestaurantApi.delete(`management/menu-categories/${id}/`);
      await fetchCategories();
      await fetchItems();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };


  // ===============================
  // ITEM MANAGEMENT
  // ===============================

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const restaurant_id = localStorage.getItem("restaurant_reg_id");
    try {
      const res = await RestaurantApi.get(
        `management/menu-items/?restaurant=${restaurant_id}`
      );

      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  // Add Item (FormData)
  const addItem = async (formData) => {
    try {
      const restaurant_id = localStorage.getItem("restaurant_reg_id");
      formData.append("restaurant", restaurant_id);

      await RestaurantApi.post("management/menu-items/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchItems();
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  // Update Item (FormData)
  const updateItem = async (id, formData) => {
    try {
      await RestaurantApi.patch(`management/menu-items/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchItems();
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await RestaurantApi.delete(`management/menu-items/${id}/`);
      await fetchItems();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };


  const sendWelcomeEmail = (owner_name, res_name, to_email) => {
    const templateParams = {
      owner_name: owner_name,
      res_name: res_name,
      to_email: to_email,
    };

    // 🔑 return the Promise so .then()/.catch() works in handleSubmit
    return emailjs.send(
      process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
      process.env.REACT_APP_WELCOME_RESTAURANT_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY
    )
      .then((response) => {
        console.log("✅ Email sent successfully!", response.status, response.text);
        return response; // pass result forward
      })
      .catch((error) => {
        console.error("❌ Failed to send email:", error);
        throw error; // so handleSubmit can catch it
      });
  };


  useEffect(() => {
    if (isLoggedIn) {
      fetchRestaurantDetails();
    }
    if (!isLoggedIn) {
      setRestaurantData([]);
    }
  }, [isLoggedIn]);

  return (
    <RestaurantContext.Provider value={{ isLoggedIn, login, logout, restaurantData, staffData, fetchStaffData, addStaff, updateStaff, deleteStaff, categories, fetchCategories, addCategory, updateCategory, deleteCategory, items, fetchItems, addItem, updateItem, deleteItem, sendWelcomeEmail }}>
      {props.children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantState;
