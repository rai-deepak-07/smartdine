// import React from 'react'

// const Staff = () => {
//   return (
//     <div>
//       <h3>Staff Details</h3>
//       <p>Manage staff details here</p>
//     </div>
//   )
// }

// export default Staff

import { useState, useMemo } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Pagination,
  InputGroup,
} from "react-bootstrap";

const StatusBadge = ({ status }) => {
  const isComeIn = status === "Come in";
  const styles = {
    padding: "0.4em 0.7em",
    fontSize: "0.8rem",
    borderRadius: "0.25rem",
    fontWeight: 500,
  };

  if (isComeIn) {
    // Style for "Come in" (Light Purple)
    styles.backgroundColor = "rgba(239, 231, 255, 1)";
    styles.color = "rgba(115, 55, 255, 1)";
  } else {
    // Style for "Not Come" (Light Gray)
    styles.backgroundColor = "rgba(241, 243, 245, 1)";
    styles.color = "rgba(108, 117, 125, 1)";
  }

  return <span style={styles}>{status}</span>;
};

// Helper hook for sorting the table data
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

// Main Staff Component
const Staff = () => {
  const createInitialData = () => {
    let data = [];
    // Sample data for demonstration
    for (let i = 1; i <= 10; i++) {
      data.push({
        id: i,
        name: `Tun Tun ${i}`,
        username: `user${i}`,
        email: `user${i}@mail.com`,
        phone: `(+91) 22-1234-${1000 + i}`,
        status: i % 3 === 0 ? "Not Come" : "Come in",
        address: `Some Street ${i}, Kanpur`,
        avatar: `https://i.pravatar.cc/150?u=${i}`,
      });
    }
    return data;
  };

  const [staffList, setStaffList] = useState(createInitialData());
  const [selectedIds, setSelectedIds] = useState([]);

  // --- State for Modals, Search, and Pagination ---
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const blankStaff = {
    name: "",
    username: "",
    email: "",
    phone: "",
    status: "Come in",
    address: "",
  };
  const [newStaff, setNewStaff] = useState(blankStaff);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // --- Search Filtering Logic ---
  const filteredStaff = staffList.filter((staff) =>
    ["name", "email", "address"].some((field) =>
      staff[field].toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // --- Sorting Hook Integration ---
  const {
    items: sortedAndFilteredStaff,
    requestSort,
    sortConfig,
  } = useSortableData(filteredStaff, { key: "name", direction: "ascending" });

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAndFilteredStaff.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedAndFilteredStaff.length / itemsPerPage);

  const getSortIndicator = (key) => {
    if (!sortConfig || sortConfig.key !== key) return " ↕";
    return sortConfig.direction === "ascending" ? " ↑" : " ↓";
  };

  // --- Checkbox Handlers ---
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentItems.map((staff) => staff.id));
    } else {
      setSelectedIds([]);
    }
  };
  const handleSelectRow = (e, id) => {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  // --- CRUD Handlers (Delete, Edit, Add) ---
  const handleDelete = (staffId) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      setStaffList(staffList.filter((staff) => staff.id !== staffId));
    }
  };

  // --- Edit Modal Handlers ---
  const handleEditClick = (staff) => {
    setCurrentStaff({ ...staff });
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentStaff({ ...currentStaff, [name]: value });
  };
  const handleSaveChanges = () => {
    setStaffList(
      staffList.map((staff) =>
        staff.id === currentStaff.id ? currentStaff : staff
      )
    );
    handleCloseEditModal();
  };

  // --- Add Modal Handlers ---
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewStaff(blankStaff); // Reset form
  };
  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };
  const handleAddNewStaff = () => {
    const staffToAdd = {
      ...newStaff,
      id: Date.now(),
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
    };
    setStaffList([staffToAdd, ...staffList]);
    handleCloseAddModal();
  };

  // --- Advanced Pagination Renderer ---
  const renderPaginationItems = () => {
    // Simplified for clarity, you can add the advanced ellipsis logic back if needed
    let items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div className="container-fluid p-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <span className="me-2 text-muted">Show</span>
              <Form.Select
                size="sm"
                style={{ width: "70px" }}
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="8">8</option>
                <option value="15">15</option>
                <option value="25">25</option>
              </Form.Select>
              <span className="ms-2 text-muted">entries</span>
            </div>
            <div className="d-flex">
              <InputGroup className="me-2" style={{ width: "300px" }}>
                <Form.Control
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
              </InputGroup>
              <Button variant="primary" size="sm" onClick={handleShowAddModal}>
                <i className="bi bi-plus-lg me-1"></i> Add Staff
              </Button>
            </div>
          </div>

          <Table hover responsive="sm" className="align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "5%" }}>
                  <Form.Check
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      currentItems.length > 0 &&
                      selectedIds.length === currentItems.length
                    }
                  />
                </th>
                <th
                  onClick={() => requestSort("name")}
                  style={{ cursor: "pointer" }}
                >
                  Name{getSortIndicator("name")}
                </th>
                <th
                  onClick={() => requestSort("email")}
                  style={{ cursor: "pointer" }}
                >
                  Contact{getSortIndicator("email")}
                </th>
                <th
                  onClick={() => requestSort("status")}
                  style={{ cursor: "pointer" }}
                >
                  Status{getSortIndicator("status")}
                </th>
                <th
                  onClick={() => requestSort("address")}
                  style={{ cursor: "pointer" }}
                >
                  Address{getSortIndicator("address")}
                </th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((staff) => (
                <tr key={staff.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      onChange={(e) => handleSelectRow(e, staff.id)}
                      checked={selectedIds.includes(staff.id)}
                    />
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={staff.avatar}
                        className="rounded-circle me-3"
                        alt={staff.name}
                        style={{ width: "40px", height: "40px" }}
                      />
                      <div>
                        <h6 className="mb-0 fw-bold">{staff.name}</h6>
                        <small className="text-muted">{staff.username}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{staff.email}</div>
                    <small className="text-muted">{staff.phone}</small>
                  </td>
                  <td>
                    <StatusBadge status={staff.status} />
                  </td>
                  <td>{staff.address}</td>
                  <td className="text-center">
                    <Button
                      variant="link"
                      className="text-secondary p-0 me-2"
                      onClick={() => handleEditClick(staff)}
                    >
                      <i className="bi bi-pencil-square fs-6"></i>
                    </Button>
                    <Button
                      variant="link"
                      className="text-secondary p-0"
                      onClick={() => handleDelete(staff.id)}
                    >
                      <i className="bi bi-trash fs-6"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Footer */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, sortedAndFilteredStaff.length)} of{" "}
              {sortedAndFilteredStaff.length} entries
            </small>
            <Pagination size="sm">
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {renderPaginationItems()}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </div>
      </div>

      {/* --- Add Staff Modal --- */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newStaff.name}
                onChange={handleAddFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={newStaff.username}
                onChange={handleAddFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newStaff.email}
                onChange={handleAddFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={newStaff.phone}
                onChange={handleAddFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newStaff.address}
                onChange={handleAddFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddNewStaff}>
            Add Staff
          </Button>
        </Modal.Footer>
      </Modal>

      {/* --- Edit Staff Modal --- */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Staff Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentStaff && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentStaff.name}
                  onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={currentStaff.username}
                  onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={currentStaff.email}
                  onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={currentStaff.phone}
                  onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={currentStaff.address}
                  onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={currentStaff.status}
                  onChange={handleEditFormChange}
                >
                  <option>Come in</option>
                  <option>Not Come</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Staff;
