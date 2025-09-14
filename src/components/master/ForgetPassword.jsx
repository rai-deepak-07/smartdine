import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ApiService from '../../apiservice/ApiService';

const ForgetPassword = () => {
  document.title = "Forget Password | SmartDine";
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email) {
    toast.error("Please enter an email");
    return;
  }

  toast.promise(
  ApiService.post('password-reset/request/', { email }),
  {
    loading: 'Sending reset link...',
    success: 'Reset link sent to your email address!',
    error: (err) => {
      // Optionally log or process the error here
      return err.response?.data?.detail || err.message || 'Failed to send reset link';
    },
  }
)
.then(() => setEmailSent(true))
.catch(() => {
  // Prevent unhandled promise rejection warning by catching explicitly,
  // but don't have to do anything else because toast shown already
});

};


  return (
    <div>
      <h2>Forget Password</h2>

      {!emailSent && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label><br />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            Send Reset Link
          </button>
        </form>
      )}

      {emailSent && (
        <div>
          <p>A reset link has been sent to your email address. Please check your inbox.</p>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
