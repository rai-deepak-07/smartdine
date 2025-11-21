// import { useContext } from "react";
// import { ResturantContext } from "../../../context/Context";
// const Dashboard = () => {
//   const { restaurantData } = useContext(ResturantContext);

//   return (
//     <div>
//       <h1>Restaurant Dashboard</h1>
//       {restaurantData && (
//         <div>
//           <h2>Restaurant: {restaurantData.res_name}</h2>
//           <p>Location: {restaurantData.city}</p>
//         </div>
//       )}
//       <p>Manage your restaurant settings and view analytics here.</p>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar, Badge, Alert } from 'react-bootstrap';
<<<<<<< HEAD
import { ResturantContext } from '../../../context/Context'; 
=======
import { RestaurantContext } from '../../../context/Context'; 
>>>>>>> main

const injectedStyles = new Set();
const injectCSS = (id, css) => {
  if (injectedStyles.has(id)) return;
  const styleElement = document.createElement('style');
  styleElement.innerHTML = css;
  document.head.appendChild(styleElement);
  injectedStyles.add(id);
};

// --- STYLES ---
const dashboardStyles = `
  .settings-card {
    transition: box-shadow 0.2s ease-in-out;
  }
  .settings-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .analytics-card {
    transition: transform 0.2s ease-in-out;
  }
  .analytics-card:hover {
    transform: translateY(-5px);
  }
  .top-item-list li {
    border-bottom: 1px solid #eee;
    padding: 0.75rem 0;
  }
  .top-item-list li:last-child {
    border-bottom: none;
  }
`;

const weeklyRevenueData = [
  { day: 'Mon', revenue: 400 }, { day: 'Tue', revenue: 650 }, { day: 'Wed', revenue: 800 },
  { day: 'Thu', revenue: 550 }, { day: 'Fri', revenue: 1200 }, { day: 'Sat', revenue: 1500 },
  { day: 'Sun', revenue: 1100 },
];
const topSellingItems = [
  { name: 'Margherita Pizza', sold: 85 }, { name: 'Caesar Salad', sold: 72 },
  { name: 'Spaghetti Carbonara', sold: 68 }, { name: 'Grilled Salmon', sold: 55 },
];

const AnalyticsCard = ({ title, value, icon, color }) => (
  <Card className="analytics-card h-100 shadow-sm">
    <Card.Body className="d-flex align-items-center">
      <div className="flex-grow-1">
        <h6 className="text-muted mb-2">{title}</h6>
        <h3 className="mb-0">{value}</h3>
      </div>
      <div className={`ms-3 fs-1 ${color}`}><i className={icon}></i></div>
    </Card.Body>
  </Card>
);

const SettingsForm = ({ settings, onSettingsChange, onSave }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('hours.')) {
      const [_, day, timeType] = name.split('.');
      onSettingsChange({ ...settings, hours: { ...settings.hours, [day]: { ...settings.hours[day], [timeType]: value } } });
    } else if (name.startsWith('notifications.')) {
      const [_, notifType] = name.split('.');
      onSettingsChange({ ...settings, notifications: { ...settings.notifications, [notifType]: checked } });
    } else {
      onSettingsChange({ ...settings, [name]: value });
    }
  };
  return (
    <Form>
      <Card className="settings-card mb-4 shadow-sm">
        <Card.Header as="h5">General Information</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>Restaurant Name</Form.Label><Form.Control type="text" name="res_name" value={settings.res_name} onChange={handleInputChange} /></Form.Group></Col>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>Phone Number</Form.Label><Form.Control type="tel" name="phone" value={settings.phone} onChange={handleInputChange} /></Form.Group></Col>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={settings.email} onChange={handleInputChange} /></Form.Group></Col>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>Address</Form.Label><Form.Control type="text" name="city" value={settings.city} onChange={handleInputChange} /></Form.Group></Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="settings-card mb-4 shadow-sm">
        <Card.Header as="h5">Operating Hours</Card.Header>
        <Card.Body>
          {Object.entries(settings.hours).map(([day, times]) => (
            <Row key={day} className="align-items-center mb-2">
              <Col xs={4} md={3}><Form.Label className="mb-0 fw-bold">{day}</Form.Label></Col>
              <Col xs={4} md={4}><Form.Control type="time" name={`hours.${day}.open`} value={times.open} onChange={handleInputChange} /></Col>
              <Col xs={4} md={4}><Form.Control type="time" name={`hours.${day}.close`} value={times.close} onChange={handleInputChange} /></Col>
            </Row>
          ))}
        </Card.Body>
      </Card>
      <Button variant="primary" size="lg" onClick={onSave}><i className="bi bi-check-circle me-2"></i> Save All Changes</Button>
    </Form>
  );
};

const Dashboard = () => {
<<<<<<< HEAD
  const { restaurantData } = useContext(ResturantContext);
=======
  const { restaurantData } = useContext(RestaurantContext);
>>>>>>> main
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  // Initialize settings with data from context or defaults
  const [settings, setSettings] = useState({
    res_name: restaurantData?.res_name || 'My Restaurant',
    phone: restaurantData?.phone || '+1 234 567 890',
    email: restaurantData?.email || 'contact@restaurant.com',
    city: restaurantData?.city || '123 Main St, Your City',
    hours: {
      Monday: { open: '11:00', close: '22:00' }, Tuesday: { open: '11:00', close: '22:00' },
      Wednesday: { open: '11:00', close: '22:00' }, Thursday: { open: '11:00', close: '23:00' },
      Friday: { open: '11:00', close: '23:00' }, Saturday: { open: '10:00', close: '23:00' },
      Sunday: { open: '10:00', close: '22:00' },
    },
    notifications: { newOrder: true, customerReview: true, lowInventory: false }
  });

  useEffect(() => {
    injectCSS('dashboard-styles', dashboardStyles);
  }, []);

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const maxRevenue = Math.max(...weeklyRevenueData.map(d => d.revenue));

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-1">Restaurant Dashboard</h1>
          {restaurantData && (
            <p className="text-muted">
              Welcome back! You are managing <strong>{restaurantData.res_name}</strong> in {restaurantData.city}.
            </p>
          )}
        </Col>
      </Row>

      {showSaveAlert && <Alert variant="success" className="mb-4">Settings saved successfully!</Alert>}

      <h4 className="mb-3">Analytics Overview</h4>
      <Row className="mb-4">
        <Col md={3} sm={6} className="mb-3"><AnalyticsCard title="Today's Revenue" value="1,845" icon="bi-currency-rupee" color="text-success" /></Col>
        <Col md={3} sm={6} className="mb-3"><AnalyticsCard title="Active Orders" value="24" icon="bi-bag-check" color="text-primary" /></Col>
        <Col md={3} sm={6} className="mb-3"><AnalyticsCard title="New Customers" value="12" icon="bi-person-plus" color="text-info" /></Col>
        <Col md={3} sm={6} className="mb-3"><AnalyticsCard title="Avg. Order Value" value="65" icon="bi-receipt" color="text-warning" /></Col>
      </Row>

      <Row className="mb-5">
        <Col lg={8} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Header as="h5">Weekly Revenue</Card.Header>
            <Card.Body>
              {weeklyRevenueData.map(item => (
                <div key={item.day} className="mb-3">
                  <div className="d-flex justify-content-between mb-1"><span>{item.day}</span><strong>{item.revenue}</strong></div>
                  <ProgressBar now={(item.revenue / maxRevenue) * 100} variant="success" />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Header as="h5">Top Selling Items</Card.Header>
            <Card.Body>
              <ul className="list-unstyled top-item-list">
                {topSellingItems.map((item, index) => (
                  <li key={item.name} className="d-flex justify-content-between align-items-center">
                    <span><Badge bg="secondary" className="me-2">{index + 1}</Badge>{item.name}</span>
                    <Badge bg="primary" pill>{item.sold} sold</Badge>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4 className="mb-3">Restaurant Settings</h4>
      <SettingsForm settings={settings} onSettingsChange={setSettings} onSave={handleSaveSettings} />
    </Container>
  );
};

export default Dashboard;

