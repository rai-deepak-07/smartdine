import React from "react";

const Features = () => {
  const features1 = [
    {
      "id": "1",
      "question": "Streamlined Dining Experience",
      "answer": "SmartDine helps restaurants handle peak seasons by letting customers book tables and pre-order meals, reducing waiting times and improving satisfaction",
      "logo": "people-fill",
    },

    {
      "id": "2",
      "question": "Efficient Restaurant Management",
      "answer": "With tools to manage tables, menus, and kitchen workflows, SmartDine ensures smooth service and faster order fulfillment even during peak hours.",
      "logo": "gear-fill",
    },

    {
      "id": "3",
      "question": "All-in-One Platform",
      "answer": "SmartDine offers General, Restaurant, and User panels that connect owners and customers seamlessly, making dining and management simple and effective.",
      "logo": "grid-fill"
    }
  ]

  const succes = [
    {
      "id": "1",
      "question": "Restaurants partnering with SmartDine have seen a significant boost in sales during peak seasons by optimizing table reservations and pre-orders.",
      "name": "Arshad Khan",
      "restaurant": "Owner - Khushboo Biryani, Shillong",
      "url": "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      "id": "2",
      "question": "With reduced waiting times and smoother service, customer satisfaction and repeat visits have increased consistently",
      "name": "Vijay",
      "restaurant": "Owner - Birgo, Coimbatore",
      "url": "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      "id": "3",
      "question": "From managing menus to kitchen workflows, SmartDine has helped restaurants streamline operations and improve efficiency.",
      "name": "Sandeep K Mohan",
      "restaurant": "Owner - Mysore Raman Idli, Kerala",
      "url": "https://randomuser.me/api/portraits/men/77.jpg",
    }
  ]
  return (
    <div>
      <section className="why text-center py-5">
        <div className="container">
          <div className="section-heading">
            <h2 className="mb-0">Why should you partner with Smartdine?</h2>
          </div>

          <div className="row g-4 justify-content-center">
            {features1.map(List => (

              <div className="col-md-4" key={List.id}>
                <i className={`bi bi-${List.logo} fs-1 text-primary`} ></i>
                <h5 className="mt-3">{List.question}</h5>
                <p>
                  {List.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stories py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-5">Restaurant success stories</h2>
          <div className="row g-4">

            {succes.map(List => (

              <div className="col-md-4" key={List.id}>
                <div className="card shadow-sm h-100 p-3">
                  <p>
                    {List.question}
                  </p>
                  <div className="d-flex align-items-center mt-3">
                    <img
                      src={List.url}
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                      alt={List.name}
                    />
                    <div>
                      <h6 className="mb-0">{List.name}</h6>
                      <small>{List.restaurant}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
};

export default Features;
