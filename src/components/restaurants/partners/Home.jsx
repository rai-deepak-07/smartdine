// import React from 'react'

// const Home = () => {
//   return (
//     <div>
//       Home
//     </div>
//   )
// }

// export default Home

import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Card, Navbar, Nav } from "react-bootstrap";

const SmartDinePartner = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Navbar */}
      <Navbar expand="lg" className="px-5 py-3 fixed-top" style={{ background: "transparent" }}>
        <Navbar.Brand href="#" className="fw-bold fs-3 text-dark">
          SmartDine <span style={{ fontSize: "0.8rem", fontWeight: "400" }}>restaurant partner</span>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Button
            variant="outline-dark"
            className="rounded-pill px-4 fw-semibold"
          >
            Login
          </Button>
        </Nav>
      </Navbar>

      {/* Background Images */}
      <img
        src="https://images.unsplash.com/photo-1617196037037-df5a2f0f5d35?auto=format&fit=crop&w=400&q=80"
        alt="food-left"
        style={{
          position: "absolute",
          top: "120px",
          left: "0",
          width: "280px",
          objectFit: "contain",
        }}
      />
      <img
        src="https://images.unsplash.com/photo-1621996346564-7dc8ba19ef87?auto=format&fit=crop&w=400&q=80"
        alt="food-right"
        style={{
          position: "absolute",
          top: "120px",
          right: "0",
          width: "280px",
          objectFit: "contain",
        }}
      />

      {/* Hero Section */}
      <Container className="text-center py-5" style={{ marginTop: "60px" }}>
        <h1 className="fw-bold display-4 mb-4">Partner with SmartDine </h1>
        <h1 className="fw-bold display-4 mb-4">and grow your business</h1>
        <p className="text-muted fs-5">
          0% commission for 1st month! Valid for new restaurant partners in select cities
        </p>
        <Button
          variant="primary"
          size="lg"
          className="px-4 py-2 mt-4 fw-semibold"
        >
          Register your restaurant
        </Button>

        {/* Requirements Section */}
        <Card
          className="mt-5 shadow-lg border-0 mx-auto"
          style={{ maxWidth: "950px", borderRadius: "15px" }}
        >
          <Card.Body>
            <Row>
              <Col md={8} className="text-start">
                <h4 className="fw-bold mb-3">Get Started - It only takes 10 minutes</h4>
                <p className="text-muted">
                  Please keep these documents and details ready for a smooth sign-up
                </p>
                <Row>
                  <Col md={6}>
                    <p>✔ PAN card</p>
                    <p>
                      ✔ FSSAI license{" "}
                      <a href="#" className="text-decoration-none">
                        Apply here
                      </a>
                    </p>
                    <p>✔ Bank account details</p>
                  </Col>
                  <Col md={6}>
                    <p>✔ GST number, if applicable</p>
                    <p>
                      ✔ Menu & profile food image{" "}
                      <a href="#" className="text-decoration-none">
                        Refer here
                      </a>
                    </p>
                  </Col>
                </Row>
              </Col>

              {/* Right side video thumbnail */}
              <Col
                md={4}
                className="d-flex align-items-center justify-content-center"
              >
                <img
                  src="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
                  alt="Onboarding video"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default SmartDinePartner;

// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Col, Button, Card, Navbar, Nav } from "react-bootstrap";

// const SmartDinePartner = () => {
//   return (
//     <div
//       style={{
//         backgroundImage: "url()",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//         position: "relative",
//       }}
//     >
//       {/* Navbar */}
//       <Navbar expand="lg" className="px-5 py-3 fixed-top" style={{ background: "rgba(255,255,255,0.9)" }}>
//         <Navbar.Brand href="#" className="fw-bold fs-3 text-dark">
//           SmartDine <span style={{ fontSize: "0.8rem", fontWeight: "400" }}>restaurant partner</span>
//         </Navbar.Brand>
//         <Nav className="ms-auto">
//           <Button
//             variant="outline-dark"
//             className="rounded-pill px-4 fw-semibold"
//           >
//             Login
//           </Button>
//         </Nav>
//       </Navbar>

//       {/* Hero Section */}
//       <Container className="text-center py-5" style={{ marginTop: "120px" }}>
//         <h1 className="fw-bold display-4 mb-4">Partner with SmartDine </h1>
//         <h1 className="fw-bold display-4 mb-4">and grow your business</h1>
//         <p className="text-muted fs-5">
//           0% commission for 1st month! Valid for new restaurant partners in select cities
//         </p>
//         <Button
//           variant="primary"
//           size="lg"
//           className="px-4 py-2 mt-4 fw-semibold"
//         >
//           Register your restaurant
//         </Button>

//         {/* Requirements Section */}
//         <Card
//           className="mt-5 shadow-lg border-0 mx-auto"
//           style={{ maxWidth: "950px", borderRadius: "15px" }}
//         >
//           <Card.Body>
//             <Row>
//               <Col md={8} className="text-start">
//                 <h4 className="fw-bold mb-3">Get Started - It only takes 10 minutes</h4>
//                 <p className="text-muted">
//                   Please keep these documents and details ready for a smooth sign-up
//                 </p>
//                 <Row>
//                   <Col md={6}>
//                     <p>✔ PAN card</p>
//                     <p>
//                       ✔ FSSAI license{" "}
//                       <a href="#" className="text-decoration-none">
//                         Apply here
//                       </a>
//                     </p>
//                     <p>✔ Bank account details</p>
//                   </Col>
//                   <Col md={6}>
//                     <p>✔ GST number, if applicable</p>
//                     <p>
//                       ✔ Menu & profile food image{" "}
//                       <a href="#" className="text-decoration-none">
//                         Refer here
//                       </a>
//                     </p>
//                   </Col>
//                 </Row>
//               </Col>

//               {/* Right side video thumbnail */}
//               <Col
//                 md={4}
//                 className="d-flex align-items-center justify-content-center"
//               >
//                 <img
//                   src="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
//                   alt="Onboarding video"
//                   style={{
//                     width: "100%",
//                     borderRadius: "10px",
//                     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//                   }}
//                 />
//               </Col>
//             </Row>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default SmartDinePartner;









