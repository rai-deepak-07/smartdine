import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { RestaurantContext } from "../../../context/Context";

const Menu = () => {
  const {
    categories,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    items,
    fetchItems,
    addItem,
    updateItem,
    deleteItem
  } = useContext(RestaurantContext);

  // Modal Control
  const [showCatModal, setShowCatModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);

  // Category State
  const [newCategory, setNewCategory] = useState("");

  // Add Item State
  const [itemForm, setItemForm] = useState({
    name: "",
    description: "",
    price: "",
    food_type: "veg",
    is_available: true,
    category: "",
    image: null
  });

  // Edit Item
  const [editData, setEditData] = useState(null);

  // Load Data
  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  // Handle Image
  const handleImage = (e) => {
    setItemForm({ ...itemForm, image: e.target.files[0] });
  };

  // Add Category Submit
  const submitCategory = async () => {
    if (!newCategory.trim()) return;

    await addCategory({
      name: newCategory
    });

    setNewCategory("");
    setShowCatModal(false);
  };

  // Add Item Submit
  const submitItem = async () => {
    const formData = new FormData();

    formData.append("name", itemForm.name);
    formData.append("description", itemForm.description);
    formData.append("price", itemForm.price);
    formData.append("food_type", itemForm.food_type);
    formData.append("is_available", itemForm.is_available);
    formData.append("category", itemForm.category);

    if (itemForm.image) formData.append("image", itemForm.image);

    await addItem(formData);

    setItemForm({
      name: "",
      description: "",
      price: "",
      food_type: "veg",
      is_available: true,
      category: "",
      image: null
    });

    setShowItemModal(false);
  };

  // Open Edit Modal
  const openEditModal = (item) => {
    setEditData({ ...item });
    setShowEditItemModal(true);
  };

  // Update Item Submit
  const submitEditItem = async () => {
    const formData = new FormData();

    formData.append("name", editData.name);
    formData.append("description", editData.description);
    formData.append("price", editData.price);
    formData.append("food_type", editData.food_type);
    formData.append("is_available", editData.is_available);
    formData.append("category", editData.category);

    if (editData.image instanceof File) {
      formData.append("image", editData.image);
    }

    await updateItem(editData.id, formData);

    setShowEditItemModal(false);
    setEditData(null);
  };

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex gap-3 mb-4">
        <Button onClick={() => setShowCatModal(true)}>Add Category</Button>
        <Button
          variant="success"
          onClick={() => setShowItemModal(true)}
          disabled={categories.length === 0}
          title={categories.length === 0 ? "Add category first" : ""}
        >
          Add Item
        </Button>

      </div>

      {/* ================== CATEGORY LIST ================== */}
      <h4>Categories</h4>

      {categories.length === 0 ? (
        <p className="text-muted">No categories found.</p>
      ) : (
        <div className="d-flex flex-wrap gap-3 mb-4">
          {categories.map((cat) => (
            <Card key={cat.id} className="p-3 shadow-sm" style={{ width: "200px" }}>
              <h6 className="text-center">{cat.name}</h6>
              <Button
                size="sm"
                variant="danger"
                onClick={() => deleteCategory(cat.id)}
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* ================== ITEMS ================== */}
      <h4>Menu Items</h4>

      {items.length === 0 ? (
        <p className="text-muted">No items found.</p>
      ) : (
        <div className="row mt-3">
          {items.map((item) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <Card className="shadow-sm h-100">
                {item.image ? (
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                ) : (
                  <div className="text-center p-5 text-muted">No Image</div>
                )}

                <Card.Body>
                  <h5>{item.name}</h5>
                  <p className="mb-1">{item.description}</p>
                  <p className="fw-bold">₹ {item.price}</p>
                  <span className={`badge ${item.food_type === "veg" ? "bg-success" : "bg-danger"}`}>
                    {item.food_type}
                  </span>
                </Card.Body>

                <Card.Footer className="d-flex justify-content-between">
                  <Button size="sm" variant="warning" onClick={() => openEditModal(item)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => deleteItem(item.id)}>
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* ================== ADD CATEGORY MODAL ================== */}
      <Modal show={showCatModal} onHide={() => setShowCatModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowCatModal(false)}>Cancel</Button>
          <Button onClick={submitCategory}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* ================== ADD ITEM MODAL ================== */}
      <Modal show={showItemModal} onHide={() => setShowItemModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">

              <Form.Group className="col-md-6 mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="col-md-6 mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={itemForm.price}
                  onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="col-md-6 mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={itemForm.category}
                  onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                  disabled={categories.length === 0}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="col-md-6 mb-3">
                <Form.Label>Food Type</Form.Label>
                <Form.Select
                  value={itemForm.food_type}
                  onChange={(e) => setItemForm({ ...itemForm, food_type: e.target.value })}
                >
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="col-12 mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={itemForm.description}
                  onChange={(e) =>
                    setItemForm({ ...itemForm, description: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="col-12 mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={handleImage} />
              </Form.Group>

            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowItemModal(false)}>Cancel</Button>
          <Button variant="success" onClick={submitItem}>Save Item</Button>
        </Modal.Footer>
      </Modal>

      {/* ================== EDIT ITEM MODAL ================== */}
      {editData && (
        <Modal show={showEditItemModal} onHide={() => setShowEditItemModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="row">

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={editData.price}
                    onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={editData.category}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Food Type</Form.Label>
                  <Form.Select
                    value={editData.food_type}
                    onChange={(e) =>
                      setEditData({ ...editData, food_type: e.target.value })
                    }
                  >
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-Veg</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="col-12 mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="col-12 mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) =>
                      setEditData({ ...editData, image: e.target.files[0] })
                    }
                  />
                </Form.Group>

              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowEditItemModal(false)}>Cancel</Button>
            <Button variant="success" onClick={submitEditItem}>Update</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Menu;
