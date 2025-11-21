<<<<<<< HEAD
import React, { useState } from 'react';
import { Button, Row, Col, Modal, Form, Card, Badge } from 'react-bootstrap';

// Easily modify table data here. Added a 'status' property.
const initialTables = [
  { id: 1, number: 'T1', capacity: 4, status: 'available' },
  { id: 2, number: 'T2', capacity: 2, status: 'booked' },
  { id: 3, number: 'T3', capacity: 6, status: 'available' },
  { id: 4, number: 'T4', capacity: 4, status: 'booked' },
];

const Tables = () => {
  const [tables, setTables] = useState(initialTables);
  const [showModal, setShowModal] = useState(false);
  const [newTable, setNewTable] = useState({ number: '', capacity: 2 });

  const addTable = () => {
    if (newTable.number) {
      // New tables are set to 'available' by default
      setTables([...tables, { ...newTable, id: Date.now(), status: 'available' }]);
      setNewTable({ number: '', capacity: 2 });
      setShowModal(false);
    }
  };

  // Function to handle table deletion
  const handleDeleteTable = (id) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      setTables(tables.filter(table => table.id !== id));
    }
  };

  // Calculate counts for each status
  const totalTables = tables.length;
  const bookedTables = tables.filter(table => table.status === 'booked').length;
  const availableTables = tables.filter(table => table.status === 'available').length;

  return (
    <div className="container mt-4">
      {/* Custom style for a 5-column layout */}
      <style>
        {`
          .col-5ths {
            flex: 0 0 auto;
            width: 20%;
          }
          @media (max-width: 1199.98px) { .col-5ths { width: 33.333333%; } }
          @media (max-width: 767.98px) { .col-5ths { width: 50%; } }
          @media (max-width: 575.98px) { .col-5ths { width: 100%; } }
        `}
      </style>

      {/* Header Card with Add Button */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-1">
                <i className="bi bi-clipboard-data me-2"></i>
                Tables Management
              </h2>
            </Col>
            <Col className="text-end">
              <Button onClick={() => setShowModal(true)}>
                <i className="bi bi-plus-circle me-2"></i>Add Table
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Summary Card with Total, Booked, and Available counts */}
      <Card className="mb-4 shadow-sm text-center">
        <Card.Body>
          <Row>
            <Col>
              <i className="bi bi-grid-3x3-gap-fill text-primary fs-3"></i>
              <h5 className="mt-2">Total</h5>
              <p className="fs-3 fw-bold mb-0">{totalTables}</p>
            </Col>
            <Col>
              <i className="bi bi-calendar-check-fill text-warning fs-3"></i>
              <h5 className="mt-2">Booked</h5>
              <p className="fs-3 fw-bold mb-0">{bookedTables}</p>
            </Col>
            <Col>
              <i className="bi bi-check-circle-fill text-success fs-3"></i>
              <h5 className="mt-2">Available</h5>
              <p className="fs-3 fw-bold mb-0">{availableTables}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      {/* Grid of Table Cards */}
      <Row>
        {tables.map(table => (
          <Col className="col-5ths mb-3" key={table.id}>
            <Card className="h-100 text-center shadow-sm">
              <Card.Body className="position-relative">
                {/* Delete Icon Button */}
                <Button 
                  variant="link" 
                  className="text-danger position-absolute top-0 end-0 m-2"
                  onClick={() => handleDeleteTable(table.id)}
                  title="Delete Table"
                >
                  <i className="bi bi-trash"></i>
                </Button>

                <Card.Title><b>{table.number}</b></Card.Title>
                <Card.Text>
                  <i className="bi bi-people-fill text-muted me-1"></i>
                  Capacity: {table.capacity}
                </Card.Text>
                {/* Status Badge */}
                <Badge bg={table.status === 'available' ? 'success' : 'warning'}>
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      {/* Add Table Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Table Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., T9"
                value={newTable.number}
                onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                value={newTable.capacity}
                onChange={(e) => setNewTable({ ...newTable, capacity: parseInt(e.target.value) })}
                min="1"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={addTable}>Add Table</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tables;
=======
// import React from 'react'

// const Tables = () => {
//   return (
//     <div>
//         <h1>Tables</h1>
//         <p>Manage your restaurant tables here.</p>
//     </div>
//   )
// }

// export default Tables
import React, { useState, useMemo, useEffect } from 'react';
import { Button, Row, Col, Card, Modal, Form } from 'react-bootstrap';

const injectedStyles = new Set();

const injectCSS = (id, css) => {
  if (injectedStyles.has(id)) {
    return; 
  }
  const styleElement = document.createElement('style');
  styleElement.innerHTML = css;
  document.head.appendChild(styleElement);
  injectedStyles.add(id);
};

const tableCardStyles = `
  .dynamic-table-card {
    border: 2px solid;
    border-radius: 0.75rem;
    padding: 1.5rem;
    text-align: center;
    height: 100%;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
  .dynamic-table-card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  .dynamic-table-card-available { background-color: var(--bs-success-bg-subtle); border-color: var(--bs-success-border-subtle); }
  .dynamic-table-card-booked { background-color: var(--bs-danger-bg-subtle); border-color: var(--bs-danger-border-subtle); }
  .dynamic-table-card-occupied { background-color: var(--bs-warning-bg-subtle); border-color: var(--bs-warning-border-subtle); }
  .dynamic-table-card-cleaning { background-color: var(--bs-secondary-bg-subtle); border-color: var(--bs-secondary-border-subtle); }
`;

const dashboardCardStyles = `
  .styled-dashboard-card {
    transition: transform 0.2s ease-in-out;
  }
  .styled-dashboard-card:hover {
    transform: translateY(-5px);
  }
`;

const initialTables = [
    { id: 1, number: 'T1', capacity: 4, status: 'available', booking: null },
    { id: 2, number: 'T2', capacity: 2, status: 'booked', booking: { customerName: 'Alice Smith', time: '19:00', guests: 2, request: 'Window seat preferred.' } },
    { id: 3, number: 'T3', capacity: 6, status: 'occupied', booking: { customerName: 'Bob Johnson', time: '18:30', guests: 5, request: 'Kids high chair needed.' } },
    { id: 4, number: 'T4', capacity: 4, status: 'available', booking: null },
    { id: 5, number: 'T5', capacity: 4, status: 'booked', booking: { customerName: 'Charlie Brown', time: '20:00', guests: 4, request: null } },
    { id: 6, number: 'T6', capacity: 2, status: 'cleaning', booking: null },
    { id: 7, number: 'T7', capacity: 8, status: 'occupied', booking: { customerName: 'Diana Prince', time: '19:30', guests: 8, request: 'Birthday celebration!' } },
    { id: 8, number: 'T8', capacity: 4, status: 'available', booking: null },
    { id: 9, number: 'T9', capacity: 2, status: 'available', booking: null },
    { id: 10, number: 'T10', capacity: 6, status: 'booked', booking: { customerName: 'Eve Adams', time: '21:00', guests: 6, request: null } },
];

const TableCard = ({ table, onClick }) => {
  useEffect(() => {
    injectCSS('table-card-styles', tableCardStyles);
  }, []);

  const className = `dynamic-table-card dynamic-table-card-${table.status}`;

  return (
    <div className={className} onClick={() => onClick(table)} role="button" tabIndex="0">
      <h5 className="mb-1">{table.number}</h5>
      <p className="mb-0 small">Capacity: {table.capacity}</p>
    </div>
  );
};

const Dashboard = ({ counts }) => {
  useEffect(() => {
    injectCSS('dashboard-card-styles', dashboardCardStyles);
  }, []);

  const dashboardItems = [
    { key: 'total', label: 'Total Tables', icon: 'bi-grid-3x3-gap-fill', color: 'text-primary' },
    { key: 'available', label: 'Available', icon: 'bi-check-circle-fill', color: 'text-success' },
    { key: 'booked', label: 'Booked', icon: 'bi-calendar-check-fill', color: 'text-danger' },
    { key: 'occupied', label: 'Occupied', icon: 'bi-people-fill', color: 'text-warning' },
  ];
  return (
    <Row className="mb-4">
      {dashboardItems.map(item => (
        <Col key={item.key} md={3} sm={6} className="mb-3">
          <Card className="styled-dashboard-card text-center h-100 shadow-sm">
            <Card.Body>
              <i className={`bi ${item.icon} ${item.color} fs-2`}></i>
              <Card.Title className="mt-2">{item.label}</Card.Title>
              <p className={`card-text fs-2 fw-bold ${item.color}`}>{counts[item.key]}</p>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const TableDetailsModal = ({ table, show, onHide, onAction }) => {
  if (!table) return null;
  const renderActionButton = () => {
    switch (table.status) {
      case 'available': return <Button variant="success" onClick={() => onAction('book', table.id)}>Book Now</Button>;
      case 'booked': return (<><Button variant="warning" onClick={() => onAction('occupy', table.id)}>Mark as Occupied</Button><Button variant="danger" className="ms-2" onClick={() => onAction('cancel', table.id)}>Cancel Booking</Button></>);
      case 'occupied': return <Button variant="secondary" onClick={() => onAction('clean', table.id)}>Mark as Finished</Button>;
      case 'cleaning': return <Button variant="success" onClick={() => onAction('makeAvailable', table.id)}>Mark as Available</Button>;
      default: return null;
    }
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton><Modal.Title>Table Details: {table.number}</Modal.Title></Modal.Header>
      <Modal.Body>
        <p><strong>Capacity:</strong> {table.capacity} guests</p>
        <p><strong>Status:</strong> {table.status.charAt(0).toUpperCase() + table.status.slice(1)}</p>
        {table.booking && (<div><hr /><h6>Booking Information</h6><p><strong>Customer:</strong> {table.booking.customerName}</p><p><strong>Time:</strong> {table.booking.time}</p><p><strong>Guests:</strong> {table.booking.guests}</p><p><strong>Request:</strong> {table.booking.request || 'None'}</p></div>)}
      </Modal.Body>
      <Modal.Footer>{renderActionButton()}<Button variant="secondary" onClick={onHide}>Close</Button></Modal.Footer>
    </Modal>
  );
};

const NewBookingModal = ({ show, onHide, availableTables, onSaveBooking }) => {
  const [formData, setFormData] = useState({ customerName: '', bookingTime: '', guestCount: 1, specialRequest: '' });
  const [selectedTableId, setSelectedTableId] = useState(availableTables[0]?.id || '');
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSave = () => {
    if (!formData.customerName || !formData.bookingTime) return;
    onSaveBooking(selectedTableId, formData);
    setFormData({ customerName: '', bookingTime: '', guestCount: 1, specialRequest: '' });
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton><Modal.Title>Create New Booking</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3"><Form.Label>Select Table</Form.Label><Form.Select value={selectedTableId} onChange={(e) => setSelectedTableId(parseInt(e.target.value))}>{availableTables.map(table => <option key={table.id} value={table.id}>Table {table.number} (Capacity: {table.capacity})</option>)}</Form.Select></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Customer Name</Form.Label><Form.Control type="text" name="customerName" value={formData.customerName} onChange={handleChange} required /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Time</Form.Label><Form.Control type="time" name="bookingTime" value={formData.bookingTime} onChange={handleChange} required /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Number of Guests</Form.Label><Form.Control type="number" name="guestCount" value={formData.guestCount} onChange={handleChange} min="1" /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Special Request</Form.Label><Form.Control as="textarea" name="specialRequest" value={formData.specialRequest} onChange={handleChange} rows={2} /></Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer><Button variant="secondary" onClick={onHide}>Cancel</Button><Button variant="primary" onClick={handleSave}>Save Booking</Button></Modal.Footer>
    </Modal>
  );
};

const App = () => {
  const [tables, setTables] = useState(initialTables);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const dashboardCounts = useMemo(() => ({
    total: tables.length, available: tables.filter(t => t.status === 'available').length, booked: tables.filter(t => t.status === 'booked').length, occupied: tables.filter(t => t.status === 'occupied').length,
  }), [tables]);

  const availableTables = useMemo(() => tables.filter(t => t.status === 'available'), [tables]);

  const handleTableClick = (table) => { setSelectedTable(table); setShowDetailsModal(true); };

  const handleAction = (action, tableId) => {
    setTables(prevTables => prevTables.map(table => {
      if (table.id === tableId) {
        if (action === 'book') { setShowDetailsModal(false); setShowBookingModal(true); return table; }
        switch (action) { case 'cancel': return { ...table, status: 'available', booking: null }; case 'occupy': return { ...table, status: 'occupied' }; case 'clean': return { ...table, status: 'cleaning', booking: null }; case 'makeAvailable': return { ...table, status: 'available' }; default: return table; }
      } return table;
    }));
    setShowDetailsModal(false);
  };

  const handleSaveBooking = (tableId, bookingData) => {
    setTables(prevTables => prevTables.map(table =>
      table.id === tableId ? { ...table, status: 'booked', booking: { customerName: bookingData.customerName, time: bookingData.bookingTime, guests: bookingData.guestCount, request: bookingData.specialRequest } } : table
    ));
  };

  return (
    <div className="container-fluid mt-4">
      <h4>Restaurant Floor Plan</h4>
      <Dashboard counts={dashboardCounts} />
      <Row className="mb-3 align-items-center">
        <Col>
            <div className="d-flex align-items-center flex-wrap">
                <div className="d-flex align-items-center me-3">
                  <div style={{width: '20px', height: '20px', borderRadius: '4px', marginRight: '8px', border: '1px solid', backgroundColor: 'var(--bs-success-bg-subtle)', borderColor: 'var(--bs-success-border-subtle)'}}></div>Available</div>
                <div className="d-flex align-items-center me-3"><div style={{width: '20px', height: '20px', borderRadius: '4px', marginRight: '8px', border: '1px solid', backgroundColor: 'var(--bs-danger-bg-subtle)', borderColor: 'var(--bs-danger-border-subtle)'}}></div>Booked</div>
                <div className="d-flex align-items-center me-3"><div style={{width: '20px', height: '20px', borderRadius: '4px', marginRight: '8px', border: '1px solid', backgroundColor: 'var(--bs-warning-bg-subtle)', borderColor: 'var(--bs-warning-border-subtle)'}}></div>Occupied</div>
                <div className="d-flex align-items-center"><div style={{width: '20px', height: '20px', borderRadius: '4px', marginRight: '8px', border: '1px solid', backgroundColor: 'var(--bs-secondary-bg-subtle)', borderColor: 'var(--bs-secondary-border-subtle)'}}></div>Cleaning</div>
            </div>
        </Col>
        <Col className="text-end"><Button variant="primary" onClick={() => setShowBookingModal(true)} disabled={availableTables.length === 0}><i className="bi bi-plus-circle"></i> Add New Booking</Button></Col>
      </Row>
      <Row>{tables.map(table => (<Col key={table.id} lg={2} md={3} sm={4} xs={6} className="mb-3"><TableCard table={table} onClick={handleTableClick} /></Col>))}</Row>
      <TableDetailsModal table={selectedTable} show={showDetailsModal} onHide={() => setShowDetailsModal(false)} onAction={handleAction} />
      <NewBookingModal show={showBookingModal} onHide={() => setShowBookingModal(false)} availableTables={availableTables} onSaveBooking={handleSaveBooking} />
    </div>
  );
};

export default App;
>>>>>>> main
