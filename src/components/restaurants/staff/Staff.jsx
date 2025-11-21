import { useState, useMemo, useContext, useEffect } from "react";
import { Table,Button, Modal, Form, Pagination, InputGroup, Image,} from "react-bootstrap";

import { RestaurantContext } from "../../../context/Context";

const RoleBadge = ({ role }) => {
  const styles = {
    padding: "0.35em 0.65em",
    fontSize: "0.8rem",
    borderRadius: "0.25rem",
    fontWeight: 500,
    backgroundColor: "rgba(241,243,245,1)",
    color: "rgba(33,37,41,1)",
    display: "inline-block",
  };

  if (!role) return <span style={styles}>—</span>;

  switch (role.toLowerCase()) {
    case "cashier":
      styles.backgroundColor = "rgba(0,123,255,0.1)";
      styles.color = "rgba(12, 42, 73, 1)";
      break;
    case "chef":
      styles.backgroundColor = "rgba(40,167,69,0.08)";
      styles.color = "rgba(15, 132, 43, 1)";
      break;
    case "manager":
      styles.backgroundColor = "rgba(220,53,69,0.1)"; // red light
      styles.color = "rgba(220,53,69,1)";
      break;
    case "waiter":
      styles.backgroundColor = "rgba(255,193,7,0.1)"; // yellow light
      styles.color = "rgba(255,193,7,1)";
      break;
    case "cleaner":
      styles.backgroundColor = "rgba(108,117,125,0.1)"; // gray light
      styles.color = "rgba(69, 73, 77, 1)";
      break;
    case "delivery":
      styles.backgroundColor = "rgba(23,162,184,0.1)"; // cyan light
      styles.color = "rgba(86, 224, 246, 1)";
      break;
    case "other":
      styles.backgroundColor = "rgba(130,138,145,0.1)"; // muted gray
      styles.color = "rgba(130,138,145,1)";
      break;
    default:
      // Default styling if role not matched
      styles.backgroundColor = "rgba(241,243,245,1)";
      styles.color = "rgba(33,37,41,1)";
  }

  return <span style={styles}>{role}</span>;
};

// Sorting Hook
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aVal = a[sortConfig.key] ?? "";
        const bVal = b[sortConfig.key] ?? "";
        if (aVal < bVal) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aVal > bVal) {
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

// Main Component
const Staff = () => {
  const { staffData, fetchStaffData, addStaff, updateStaff, deleteStaff } =
    useContext(RestaurantContext);

  const [selectedIds, setSelectedIds] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const blankStaff = {
    name: "",
    image: "",
    imageFile: null,
    email: "",
    contact_number: "",
    address: "",
    role: "cleaner",
    salary: "",
    restaurant: "",
  };

  const [currentStaff, setCurrentStaff] = useState(null);
  const [newStaff, setNewStaff] = useState(blankStaff);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const filteredStaff = (staffData || []).filter((staff) =>
    ["name", "email", "address", "role", "contact_number"].some((field) =>
      (staff[field] ?? "").toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const { items: sortedStaff, requestSort, sortConfig } = useSortableData(filteredStaff, {
    key: "name",
    direction: "ascending",
  });

  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentItems = sortedStaff.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(sortedStaff.length / itemsPerPage) || 1;

  const getSortIndicator = (key) => {
    if (!sortConfig || sortConfig.key !== key) return " ↕";
    return sortConfig.direction === "ascending" ? " ↑" : " ↓";
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedIds(currentItems.map((s) => s.id));
    else setSelectedIds([]);
  };

  const handleSelectRow = (e, id) => {
    if (e.target.checked) setSelectedIds([...selectedIds, id]);
    else setSelectedIds(selectedIds.filter((sid) => sid !== id));
  };

  // ==================== Helper Function ====================
  const preparePayload = (staff) => {
    if (staff.imageFile) {
      const formData = new FormData();
      formData.append("name", staff.name);
      formData.append("email", staff.email);
      formData.append("contact_number", staff.contact_number);
      formData.append("address", staff.address);
      formData.append("role", staff.role);
      formData.append("salary", staff.salary);
      if (staff.restaurant) formData.append("restaurant", staff.restaurant);
      formData.append("image", staff.imageFile);
      return formData;
    } else {
      return {
        name: staff.name,
        email: staff.email,
        contact_number: staff.contact_number,
        address: staff.address,
        role: staff.role,
        salary: staff.salary,
        restaurant: staff.restaurant,
      };
    }
  };

  // ==================== Add Staff ====================
  const handleAddNewStaff = async () => {
    const payload = preparePayload(newStaff);
    await addStaff(payload);
    await fetchStaffData();
    setNewStaff(blankStaff);
    setShowAddModal(false);
  };

  // ==================== Edit Staff ====================
  const handleEditClick = (staff) => {
    setCurrentStaff({
      id: staff.id,
      name: staff.name || "",
      image: staff.image || "",
      imageFile: null,
      email: staff.email || "",
      contact_number: staff.contact_number || "",
      address: staff.address || "",
      role: staff.role || "cleaner",
      salary: staff.salary || "",
      restaurant: staff.restaurant || "",
    });
    setShowEditModal(true);
  };

  // ==================== Save Changes ====================
  const handleSaveChanges = async () => {
  if (!currentStaff) return;

  // Prepare PATCH payload with only changed fields
  const formDataPayload = new FormData();
  let useFormData = false;

  // Only append fields that have a non-empty value and are changed or mandatory
  // If imageFile exists, use FormData and append it
  if (currentStaff.imageFile) {
    useFormData = true;
    formDataPayload.append("image", currentStaff.imageFile);
  }

  // Append other fields only if they are non-empty or changed
  // (You can customize change detection as needed)
  if (currentStaff.name) formDataPayload.append("name", currentStaff.name);
  if (currentStaff.email) formDataPayload.append("email", currentStaff.email);
  if (currentStaff.contact_number) formDataPayload.append("contact_number", currentStaff.contact_number);
  if (currentStaff.address) formDataPayload.append("address", currentStaff.address);
  if (currentStaff.role) formDataPayload.append("role", currentStaff.role);
  if (currentStaff.salary) formDataPayload.append("salary", currentStaff.salary);
  if (currentStaff.restaurant) formDataPayload.append("restaurant", currentStaff.restaurant);

  // If using FormData, call patch with FormData, else use normal JSON object
  if (useFormData) {
    await updateStaff(currentStaff.id, formDataPayload);
  } else {
    // Build a JSON object with non-empty fields
    const jsonPayload = {};
    if (currentStaff.name) jsonPayload.name = currentStaff.name;
    if (currentStaff.email) jsonPayload.email = currentStaff.email;
    if (currentStaff.contact_number) jsonPayload.contact_number = currentStaff.contact_number;
    if (currentStaff.address) jsonPayload.address = currentStaff.address;
    if (currentStaff.role) jsonPayload.role = currentStaff.role;
    if (currentStaff.salary) jsonPayload.salary = currentStaff.salary;
    if (currentStaff.restaurant) jsonPayload.restaurant = currentStaff.restaurant;

    await updateStaff(currentStaff.id, jsonPayload);
  }

  await fetchStaffData();
  setShowEditModal(false);
  };

  // ==================== Delete Staff ====================
  const handleDelete = async (staffId) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      await deleteStaff(staffId);
      await fetchStaffData();
    }
  };

  // ==================== Image Handler (Add/Edit) ====================
  const handleImageChange = (e, isEdit = false) => {
    const file = e.target.files?.[0] ?? null;
    if (isEdit) {
      setCurrentStaff({ ...currentStaff, imageFile: file, image: file ? URL.createObjectURL(file) : currentStaff.image });
    } else {
      setNewStaff({ ...newStaff, imageFile: file, image: file ? URL.createObjectURL(file) : "" });
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            {/* Show entries */}
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

            {/* Search + Add */}
            <div className="d-flex">
              <InputGroup className="me-2" style={{ width: "360px" }}>
                <Form.Control
                  placeholder="Search by name, email, role, contact..."
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

              <Button size="sm" onClick={() => setShowAddModal(true)}>
                <i className="bi bi-plus-lg me-1"></i> Add Staff
              </Button>
            </div>
          </div>

          {/* TABLE */}
          <Table hover responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "4%" }}>
                  <Form.Check
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      currentItems.length > 0 &&
                      selectedIds.length === currentItems.length
                    }
                  />
                </th>
                <th onClick={() => requestSort("name")} style={{ cursor: "pointer" }}>
                  Name{getSortIndicator("name")}
                </th>
                <th onClick={() => requestSort("email")} style={{ cursor: "pointer" }}>
                  Contact{getSortIndicator("email")}
                </th>
                <th onClick={() => requestSort("role")} style={{ cursor: "pointer" }}>
                  Role{getSortIndicator("role")}
                </th>
                <th onClick={() => requestSort("address")} style={{ cursor: "pointer" }}>
                  Address{getSortIndicator("address")}
                </th>
                <th className="text-end">Salary</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((staff) => (
                <tr key={staff.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedIds.includes(staff.id)}
                      onChange={(e) => handleSelectRow(e, staff.id)}
                    />
                  </td>

                  <td>
                    <div className="d-flex align-items-center">
                      <Image
                        src={staff.image}
                        roundedCircle
                        alt={staff.name}
                        style={{ width: 44, height: 44, objectFit: "cover" }}
                      />
                      <div className="ms-3">
                        <h6 className="mb-0 fw-bold">{staff.name}</h6>
                        <small className="text-muted">ID: {staff.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div>{staff.email}</div>
                    <small className="text-muted">{staff.contact_number}</small>
                  </td>

                  <td>
                    <RoleBadge role={staff.role} />
                  </td>

                  <td>{staff.address}</td>

                  <td className="text-end">₹ {staff.salary}</td>

                  <td className="text-center">
                    <Button
                      variant="link"
                      className="text-secondary"
                      onClick={() => handleEditClick(staff)}
                    >
                      <i className="bi bi-pencil-square fs-6"></i>
                    </Button>

                    <Button
                      variant="link"
                      className="text-secondary"
                      onClick={() => handleDelete(staff.id)}
                    >
                      <i className="bi bi-trash fs-6"></i>
                    </Button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    No staff found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="d-flex justify-content-between mt-3">
            <small className="text-muted">
              Showing {indexFirst + 1} to {Math.min(indexLast, sortedStaff.length)} of{" "}
              {sortedStaff.length} entries
            </small>
            <Pagination size="sm">
              <Pagination.Prev
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages).keys()].map((num) => (
                <Pagination.Item
                  key={num + 1}
                  active={num + 1 === currentPage}
                  onClick={() => setCurrentPage(num + 1)}
                >
                  {num + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </div>
      </div>

      {/* ADD Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="name"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                name="contact_number"
                value={newStaff.contact_number}
                onChange={(e) => setNewStaff({ ...newStaff, contact_number: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={newStaff.address}
                onChange={(e) => setNewStaff({ ...newStaff, address: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={newStaff.role}
                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
              >
                <option value="chef">Chef</option>
                <option value="manager">Manager</option>
                <option value="waiter">Waiter</option>
                <option value="cleaner">Cleaner</option>
                <option value="cashier">Cashier</option>
                <option value="delivery">Delivery Boy</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={newStaff.salary}
                onChange={(e) => setNewStaff({ ...newStaff, salary: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              {newStaff.image && (
                <div className="mt-2">
                  <Image src={newStaff.image} thumbnail style={{ width: 120, height: 120, objectFit: "cover" }} />
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddNewStaff}>
            Add Staff
          </Button>
        </Modal.Footer>
      </Modal>

      {/* EDIT Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentStaff && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  name="name"
                  value={currentStaff.name}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  value={currentStaff.email}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, email: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  name="contact_number"
                  value={currentStaff.contact_number}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, contact_number: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  value={currentStaff.address}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, address: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={currentStaff.role}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, role: e.target.value })}
                >
                  <option value="chef">Chef</option>
                  <option value="manager">Manager</option>
                  <option value="waiter">Waiter</option>
                  <option value="cleaner">Cleaner</option>
                  <option value="cashier">Cashier</option>
                  <option value="delivery">Delivery Boy</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="number"
                  name="salary"
                  value={currentStaff.salary}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, salary: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={e => handleImageChange(e, true)} />

                {currentStaff.image && (
                  <div className="mt-2">
                    <Image src={currentStaff.image} thumbnail style={{ width: 120, height: 120, objectFit: "cover" }} />
                  </div>
                )}
              </Form.Group>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
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
