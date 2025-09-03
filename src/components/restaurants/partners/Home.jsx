import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./SmartdinePartner.css";

const SmartdinePartner = () => {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="overlay">
          <h1 className="fw-bold display-5">
            Partner with Smartdine and grow your business
          </h1>
          
          <button className="btn btn-danger btn-lg mt-3">
            Register your restaurant
          </button>
        </div>
      </section>

      <section className="container position-relative" style={{ marginTop: "-40px" }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="bg-white rounded shadow-sm p-4 get-started-card">
              <div className="row g-4 align-items-center">
                <div className="col-lg-7">
                  <h2 className="h5 mb-2">Get Started - It only takes 10 minutes</h2>
                  <p className="text-muted small mb-4">
                    Please keep these documents and details ready for a smooth
                    sign-up
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <p className="small mb-2">
                        <span className="tick-icon">✔</span>PAN card
                      </p>
                      <p className="small mb-2">
                        <span className="tick-icon">✔</span>GST number, if applicable
                      </p>
                      <p className="small mb-2">
                        <span className="tick-icon">✔</span>FSSAI license
                      </p>
                      <p className="small mb-2 ms-4">
                        Don't have a FSSAI license?{' '}
                        <a href="#" className="text-decoration-none">
                          Apply here
                        </a>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="small mb-2">
                        <span className="tick-icon ">✔</span>Menu & profile food image
                      </p>
                      <p className="small mb-2 ms-4">
                        What is profile food image?{' '}
                        <Link to="/" className="text-decoration-none">
                          Refer here
                        </Link>
                      </p>
                      <p className="small mb-2">
                        <span className="tick-icon">✔</span>Bank account details
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 text-center">
                  <div className="ratio ratio-16x9">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Restaurant Onboarding"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
};

export default SmartdinePartner;

