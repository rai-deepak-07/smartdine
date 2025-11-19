import { useState } from 'react';
import toast from 'react-hot-toast';
import ApiService from '../../apiservice/ApiService';
import bgImg from '../../assets/image/user/kitchen-6878026.jpg'
import { Link } from 'react-router-dom';


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
    <>
      <div className='smartdine-banner' style={{ backgroundImage: `url(${bgImg})` }} id='forgetPassword'>
        <div className="smartdine-overlay opacity-75"></div>
        <div className="position-relative z-1 w-100">
          <div className="container px-3">
            <div className="row">
              <div className="col-md-3"></div>

              {/* Foregt Password Page */}
              <div className="col-md-6 p-md-5 px-4 py-5 shadow rounded smartdine-overlay position-relative">
                <div className="row cl5 mb-3">
                  <span className="fs-3 fw-semibold f2">
                    <i className="bi bi-person-circle me-3"></i>
                    Forget Password
                  </span>
                </div>

                <hr className='border-light border-1' />

                <div className="row f2">
                  {!emailSent ? (
                    <form onSubmit={handleSubmit}>

                      {/* Email Input */}
                      <label htmlFor='email' className='cl5'>Enter Registered Email Address:</label>
                      <div className="my-3 input-group">
                        <span className="input-group-text text-muted">
                          <i className="bi bi-envelope"></i>
                        </span>
                        <input
                          name='email'
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="d-flex mt-3 cl5">
                        <hr className="flex-grow-1" />
                      </div>
                      <button type="submit" className="btn btn-danger w-100 mt-3">
                        <i className='bi bi-box-arrow-in-right me-2'></i>Send Reset Link
                      </button>

                      <div className="d-grid justify-content-center f2 mt-5">
                        <span className='cl5'>
                          Don't have an account?
                          <Link to="/user-register" className='text-decoration-none mx-2 fw-semibold cl1'>
                            Register
                          </Link>
                        </span>
                      </div>
                    </form>
                  ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center cl5">
                      <i className="bi bi-link-45deg" style={{ fontSize: '4rem', marginBottom: '1rem' }}></i>
                      <p className='fs-6 f2'>A reset link has been sent to your <b className='cl3'>{email}</b> address. Please check your inbox or <b>SPAM folder</b>.</p>
                      <Link to="/" className="btn btn-danger mt-3">
                        <i className='bi bi-house-door me-2'></i>Back to Home
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
