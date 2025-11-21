import { useContext } from "react";
import { RestaurantContext } from "../../../context/Context";

const CardField = ({ icon, label, value, link }) => (
    <div className="d-flex align-items-center mb-2">
        <div className='bg-light rounded p-1 border border-light-subtle me-3'>
            <i className={`bi ${icon} fs-4 mx-2`}></i>
        </div>
        <div>
            <span className="fw-bold">{label}: </span>
            {link ? <a href={link} target="_blank" rel="noopener noreferrer">{value}</a> : value}
        </div>
    </div>
);

const Home = () =>{
    const {restaurantData} = useContext(RestaurantContext);
    
    return (
        
        <div className="container-fluid p-0 pt-3">
        <div className="row">
            <div className="col-md-6">
                {/* Owner Card */}
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <h5 className="card-title mb-3">Owner Details</h5>
                        <CardField icon="bi-person" label="Name" value={restaurantData.owner_name} />
                        <CardField icon="bi-telephone" label="Mobile" value={restaurantData.owner_mobile_no} />
                        <CardField icon="bi-envelope" label="Email" value={restaurantData.email} />
                        <CardField icon="bi-geo-alt" label="City" value={restaurantData.city} />
                        <CardField icon="bi-pin-map" label="State" value={restaurantData.state} />
                    </div>
                </div>

            </div>
            <div className="col-md-6">
                {/* Restaurant Card */}
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <h5 className="card-title mb-3">Restaurant Info</h5>
                        <CardField icon="bi-shop" label="Name" value={restaurantData.res_name} />
                        <CardField icon="bi-geo" label="Address" value={restaurantData.res_address} />
                        <CardField icon="bi-key" label="ID" value={restaurantData.id} />
                        <CardField icon="bi-telephone-plus" label="Contact No." value={restaurantData.res_contact_no} />
                        <CardField icon="bi-geo-alt-fill" label="Google Location" value="View Map" link={restaurantData.google_location_url} />
                    </div>
                </div>

            </div>
      
        </div>
        <div className="row">
            <div className="col-md-6">
                {/* License Card */}
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <h5 className="card-title mb-3">FSSAI License Details</h5>
                        <CardField icon="bi-file-earmark-text" label="FSSAI No." value={restaurantData.fssai_license_no} />
                        <CardField icon="bi-link-45deg" label="FSSAI Doc" value="View Document" link={restaurantData.fssai_license_url} />
                    </div>
                </div>

            </div>
            <div className="col-md-6">
                {/* License Card */}
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <h5 className="card-title mb-3">GST License Details</h5>
                        <CardField icon="bi-file-earmark-medical" label="GST No." value={restaurantData.gst_registration_no} />
                        <CardField icon="bi-link-45deg" label="GST Doc" value="View Document" link={restaurantData.gst_registration_url} />
                    </div>
                </div>

            </div>
        </div>   
    </div>
);
}

export default Home;