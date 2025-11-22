import React, { useState, useEffect, useContext } from "react";
import { Button, Row, Col, Modal, Form, Card, Badge } from "react-bootstrap";
import { RestaurantContext } from "../../../context/Context";

const Tables = () => {
  const {tablesData, fetchTablesData, addTable, updateTable, deleteTable,} = useContext(RestaurantContext);

  const [showModal, setShowModal] = useState(false);
  const [newTable, setNewTable] = useState({ table_number: "", capacity: 2 });
  const [editTable, setEditTable] = useState(null);

  // Load tables from backend
  useEffect(() => {
    fetchTablesData();
  }, []);

  // ADD TABLE
  const handleAddTable = async () => {
    if (!newTable.table_number.trim()) return;

    await addTable({
      table_number: newTable.table_number,
      capacity: newTable.capacity,
      status: "available",
    });

    setNewTable({ table_number: "", capacity: 2 });
    setShowModal(false);
  };

  // DELETE TABLE
  const handleDeleteTable = async (id) => {
    if (!window.confirm("Are you sure you want to delete this table?")) return;
    await deleteTable(id);
  };

  // OPEN EDIT MODAL
  const openEdit = (table) => {
    setEditTable({ ...table });
  };

  // UPDATE TABLE
  const handleUpdateTable = async () => {
    if (!editTable) return;

    await updateTable(editTable.id, {
      table_number: editTable.table_number,
      capacity: editTable.capacity,
    });

    setEditTable(null);
  };

  // COUNTS
  const totalTables = tablesData.length;
  const bookedTables = tablesData.filter((t) => t.status === "booked").length;
  const availableTables = tablesData.filter((t) => t.status === "available").length;

  return (
    <div className="container mt-4">

      {/* 5 Column Layout Styling */}
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

      {/* Header */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              <h4 className="mb-1">
                <i className="bi bi-clipboard-data me-2"></i>
                Tables Management
              </h4>
            </Col>
            <Col className="text-end">
              <Button onClick={() => setShowModal(true)}>
                <i className="bi bi-plus-circle me-2"></i>Add Table
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Summary */}
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

      {/* TABLE GRID */}
      <Row>
        {tablesData.map((table) => (
          <Col className="col-5ths mb-3" key={table.id}>
            <Card className="h-100 text-center shadow-sm">
              <Card.Body className="position-relative">

                {/* Edit */}
                <Button
                  variant="link"
                  className="text-primary position-absolute top-0 start-0 m-2"
                  onClick={() => openEdit(table)}
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>

                {/* Delete */}
                <Button
                  variant="link"
                  className="text-danger position-absolute top-0 end-0 m-2"
                  onClick={() => handleDeleteTable(table.id)}
                >
                  <i className="bi bi-trash"></i>
                </Button>

                <Card.Title>
                  <b>{table.table_number}</b>
                </Card.Title>

                <Card.Text>
                  <i className="bi bi-people-fill text-muted me-1"></i>
                  Capacity: {table.capacity}
                </Card.Text>

                <Badge bg={table.status === "available" ? "success" : "warning"}>
                  {table.status[0].toUpperCase() + table.status.slice(1)}
                </Badge>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ADD TABLE MODAL */}
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
                value={newTable.table_number}
                onChange={(e) =>
                  setNewTable({ ...newTable, table_number: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={newTable.capacity}
                onChange={(e) =>
                  setNewTable({
                    ...newTable,
                    capacity: parseInt(e.target.value),
                  })
                }
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTable}>
            Add Table
          </Button>
        </Modal.Footer>
      </Modal>

      {/* EDIT TABLE MODAL */}
      <Modal show={!!editTable} onHide={() => setEditTable(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Table</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Table Number</Form.Label>
              <Form.Control
                type="text"
                value={editTable?.table_number || ""}
                onChange={(e) =>
                  setEditTable({ ...editTable, table_number: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={editTable?.capacity || 1}
                onChange={(e) =>
                  setEditTable({
                    ...editTable,
                    capacity: parseInt(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditTable(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateTable}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Tables;
