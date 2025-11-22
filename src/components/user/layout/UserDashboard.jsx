import { useContext, useState } from "react";
import { UserContext } from "../../../context/Context";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { localRestaurantData } = useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Filter restaurants
  const filteredRestaurants = localRestaurantData
    ? localRestaurantData.filter((restaurant) => {
      const matchesSearch =
        restaurant.res_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        restaurant.city?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filter === "all" || restaurant.cuisine_type === filter;
      return matchesSearch && matchesFilter;
    })
    : [];

  const cuisineTypes = localRestaurantData
    ? [
      ...new Set(
        localRestaurantData.map((r) => r.cuisine_type).filter(Boolean)
      ),
    ]
    : [];

  return (
    <div className="container py-4">
      {/* Search and Filter */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-danger">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
        <div className="col-md-4 mt-3 mt-md-0">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Cuisines</option>
            {cuisineTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="mb-5">
        {filteredRestaurants.length > 0 ? (
          <div className="row g-4">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm hover-lift">
                  <div className="position-relative">
                    <img
                      src={restaurant.restaurant_image}
                      className="card-img-top"
                      alt={restaurant.res_name}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <span className="badge bg-white text-dark position-absolute top-0 end-0 m-2">
                      <i className="fas fa-star text-warning me-1"></i>
                      {restaurant.rating || "4.5"}
                    </span>
                  </div>

                  <div className="card-body d-flex flex-column f2">
                    <span className="d-flex justify-content-between">
                      <span className="card-title h4">
                        {restaurant.res_name}
                      </span>
                      <Link to={restaurant.google_location_url}>
                        <i className="bi bi-geo-alt-fill cl1"></i>
                      </Link>
                    </span>
                    <p className="text-muted small mb-2">
                      <i className="bi bi-geo-fill me-1 cl1"></i>
                      {restaurant.city}
                    </p>
                    <p className="badge bg-secondary mb-2 align-self-start">
                      {restaurant.cuisine_type || "Various"}
                    </p>
                    {/* <p className="card-text flex-grow-1">
                      {restaurant.description ||
                        "Delicious food in a cozy atmosphere."}
                    </p> */}

                    <div className="mb-3 p-3 bg-light rounded">
                      <h6 className="mb-1 fw-semibold">Opening Hours</h6>
                      <div className="fw-semibold">
                        {new Date(`1970-01-01T${restaurant.opening_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                        {new Date(`1970-01-01T${restaurant.closing_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-auto">
                      <Link to={`bookings/${restaurant.id}`} className="btn btn-outline-primary btn-sm flex-fill">
                        Book Table
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div class="alert alert-secondary" role="alert">
            No Restaurant Available
          </div>
        )}
      </div>
      <style jsx>{`
        .hover-lift {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;
