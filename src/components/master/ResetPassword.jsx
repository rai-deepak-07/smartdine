import { useState, useContext } from 'react';
import { useSearchParams, useNavigate, Link, Links } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MyStateContext } from '../../context/Context';
import ApiService from '../../apiservice/ApiService';
import bgImg from '../../assets/image/user/kitchen-6878026.jpg'

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
    <>
      <div className='smartdine-banner' style={{ backgroundImage: `url(${bgImg})` }} id='resetPassword'>
        <div className="smartdine-overlay opacity-75"></div>
        <div className="position-relative z-1 w-100">
          <div className="container px-3">
            <div className="row">
              <div className="col-md-3"></div>

              {/* Reset Password Page */}
              <div className="col-md-6 p-md-5 px-4 py-5 shadow rounded smartdine-overlay position-relative">
                <div className="row cl5 mb-3">
                  <span className="fs-3 fw-semibold f2">
                    <i className="bi bi-person-circle me-3"></i>
                    Reset Password
                  </span>
                </div>

                <hr className='border-light border-1' />

                <div className="row">
                  {progress > 0 && progress < 100 && <p>Loading... {progress}%</p>}

                  <form onSubmit={handleSubmit}>

                    {/* New Password Input */}
                    <div className="my-3 input-group">
                      <span className="input-group-text text-muted">
                          <i className="bi bi-shield-lock"></i>
                        </span>
                      <input type="password"
                        value={newPassword}
                        className='form-control'
                        placeholder='New Password'
                        onChange={e => setNewPassword(e.target.value)}
                        required
                        minLength={8}
                        />
                    </div>

                    <div className="my-3 input-group">
                      <span className="input-group-text text-muted">
                          <i className="bi bi-check2-circle"></i>
                        </span>
                      <input
                        type="password"
                        value={confirmPassword}
                        className='form-control'
                        placeholder='Confirm Password'
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                      />

                    </div>
                     <div className="d-flex mt-3 cl5">
                        <hr className="flex-grow-1" />
                    </div>

                    <div className='d-grid'>

                    <button type="submit" className='btn btn-danger' disabled={!token || progress > 0}>
                      {progress > 0 && progress < 100 ? 'Saving...' : 'Save'} <i className='bi bi-check-lg'></i>
                    </button>
                    </div>

                    <div className="d-grid justify-content-center f2 mt-5">
                      <span className='cl5'>
                        Don't have an account?
                        <Link to="/user-register" className='text-decoration-none mx-2 fw-semibold cl1'>
                          Register
                        </Link>

                      </span>
                    </div>
                  </form>

                </div>
              </div>

              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
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
    </>

  );
};

export default ResetPassword;
