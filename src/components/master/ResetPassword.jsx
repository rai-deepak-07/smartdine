import React, { useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MyStateContext } from '../../context/Context';
import ApiService from '../../apiservice/ApiService';

const ResetPassword = () => {
  document.title = "New Password | SmartDine";
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { progress, LoadingProgress } = useContext(MyStateContext);

 const handleSubmit = (e) => {
  e.preventDefault();

  if (newPassword !== confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  LoadingProgress(20);

  toast.promise(
    ApiService.post('password-reset/confirm/', {
      token,
      new_password: newPassword,
    }),
    {
      loading: 'Resetting password...',
      success: 'Password reset successful!',
      error: (err) => err.response?.data?.detail || err.message || 'Password reset failed',
    }
  )
    .then(() => {
      LoadingProgress(100);
      setNewPassword('');
      setConfirmPassword('');
      navigate('/');
    })
    .catch((error) => {
        LoadingProgress(100);
        
        const msg = error.response?.data?.detail || error.message || '';
        if (msg.toLowerCase().includes('expired') || msg.toLowerCase().includes('invalid token')) {
            toast.error('Reset link expired. Redirecting to forgot password...');
            setTimeout(() => {
            navigate("/forget-password");
        }, 2000); 
      } else {
        toast.error(msg);
      }
    });
};

  return (
    <div>
      <h2>Reset Password</h2>
      <p>Token: {token}</p>
      {progress > 0 && progress < 100 && <p>Loading... {progress}%</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label><br />
          <input type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <div>
          <label>Confirm Password:</label><br />
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <button type="submit" disabled={!token || progress > 0}>
          {progress > 0 && progress < 100 ? 'Saving...' : 'Save'}
        </button>
      </form>
      {/* {!token && <p style={{ color: 'red' }}>Invalid or missing token.</p>} */}
    </div>
  );
};

export default ResetPassword;
