import React from 'react';
import featuresLogo from '../../../assets/image/general/chinese-lanterns-7591296.jpg';

const AppFeaturesSection = () => {

    const features = [
        {
            "id": "1",
            "title": " Instant Table Reservation",
            "description": "Book your table effortlessly through our app.",
            "icon": "lightning-charge-fill",
            "color": "info"
        },
        {
            "id": "2",
            "title": "Pre-Order Food",
            "description": "Browse menus and place your food order before arriving at the restaurant.",
            "icon": "basket",
            "color": "success"
        },
        {
            "id": "3",
            "title": "Live Crowd Heatmaps",
            "description": "Choose dining experiences based on real-time ambience or quietness.",
            "icon": "clock",
            "color": "danger"
        },
        {
            "id": "4",
            "title": "Loyalty Rewards—SmartPoints",
            "description": "Earn “SmartPoints” for every reservation or pre-order made through SmartDine.",
            "icon": "coin",
            "color": "warning"
        },
        {
            "id": "5",
            "title": "Seamless Payment Options",
            "description": "Pay securely at the restaurant using UPI or cash after your meal.",
            "icon": "credit-card-2-front",
            "color": "success"
        },
    ];
    return (
        <div className='row my-5 flex-wrap-reverse'>
            {/* Left: Image */}
            <div className="col-lg-6">
                <div style={{ position: 'relative', width: '100%', height: '100%' }} data-aos="fade-right" data-aos-duration="2000"> 
                    <img
                        src={featuresLogo}
                        alt="SmartDine Restaurant" className='rounded-0'
                        style={{ width: '100%', objectFit: 'cover', minHeight: '320px', maxHeight: '100%' }}
                    />
                    {/* Optionally add overlay for branding */}
                </div>

            </div>

            {/* Right: Features List */}
            <div className="col-lg-6">
                <div className="row px-3 px-md-2">
                    <div className="col-12 position-relative">
                        <span data-aos="zoom-in" data-aos-duration="2000"
                            style={{
                                position: 'absolute',
                                top: '-65px',
                                left: 5,
                                fontSize: '6rem',
                                color: 'rgba(40,40,40,0.06)',
                                fontWeight: 700,
                                zIndex: 1,
                                letterSpacing: '10px',
                                textTransform: 'uppercase',
                                userSelect: 'none',
                                pointerEvents: 'none',
                                // fontFamily:' "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                            }}>
                            About Us
                        </span>
                    </div>

                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <span className="text-danger fw-bold fs-3">About us</span>
                        <h2 className="fw-bold mt-1">Why Choose SmartDine?</h2>
                        <p className="text-muted mb-4" style={{ fontSize: '15px' }}>
                            Discover how SmartDine empowers restaurants and diners, making
                            reservations, payments, and customer experiences smarter, faster, and more enjoyable.
                        </p>
                    </div>
                </div>

                {/* Features: */}
                <div className="row">
                    <div className="col-12">
                        <div className='bg-light p-5'>
                            {features.map((item) => (
                                <div key={item.id} className="bg-white rounded-3 shadow-sm p-3 mb-3 d-flex align-items-center" data-aos="flip-down" data-aos-duration="2000">
                                    <i className={`bi bi-${item.icon} fs-3 text-${item.color} me-3`}></i>
                                    <div>
                                        <span className="fw-bold">{item.title}</span>
                                        <div className="text-muted small">
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AppFeaturesSection;
