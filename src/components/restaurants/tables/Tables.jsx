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
