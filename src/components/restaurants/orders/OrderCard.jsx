import React, { useState, useContext } from "react";
import { Card, Row, Col, Form, Button, Collapse } from "react-bootstrap";
import { RestaurantContext } from "../../../context/Context";

// Format booking time nicely (HH:MM)
const formatTime = (timeString) => {
    if (!timeString) return "-";
    const [hour, minute] = timeString.split(":");
    return `${hour}:${minute}`;
};

const OrderCard = ({ order }) => {
    const [open, setOpen] = useState(false);
    const { updateItemStatus, updateOrderStatus } = useContext(RestaurantContext);

    // Booking date and time (first table, from API)
    const bookingDate = order.tables?.[0]?.booking_date || '-';
    const bookingTime = formatTime(order.tables?.[0]?.booking_time) || '-';

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        updateOrderStatus(order.id, newStatus);
    };

    return (
        <Card className="p-3 mb-4 shadow-sm">
            {/* Order Header */}
            <Row className="mb-2 align-items-center">
                <Col>
                    <h5><b>Order: #{order.id}</b></h5>
                </Col>
                <Col className="text-end d-flex align-items-center justify-content-end">
                    {/* Status Select with onChange */}
                    <Form.Select
                        size="sm"
                        style={{ maxWidth: "150px", display: "inline-block", marginRight: "10px" }}
                        value={order.status}
                        onChange={handleStatusChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="served">Served</option>
                        <option value="completed" disabled>Completed</option>
                        <option value="cancelled" disabled>Cancelled</option>
                    </Form.Select>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => setOpen(!open)}
                        aria-controls={`order-details-${order.id}`}
                        aria-expanded={open}
                    >
                        <i className={`bi bi-eye-${!open ? '' : 'slash-'}fill me-2`}></i>
                        {open ? 'Hide Details' : 'Show Details'}
                    </Button>
                </Col>
            </Row>

            {/* Customer Name */}
            <p>
                <b>Customer Name:</b> {order.customer.user_name}
            </p>
            <div>
                <span><b>Booking Date:</b> {bookingDate} &nbsp;&nbsp;&nbsp;</span>
                <span><b>Booking Time:</b> {bookingTime}</span>
            </div>
            {/* Collapsible details */}
            <Collapse in={open}>
                <div id={`order-details-${order.id}`}>
                    <hr />
                    {/* Table details */}
                    <p>
                        <b>Table No:</b> {order.tables.map((table) => table.table.table_number).join(", ")}
                    </p>
                    {/* Items Heading */}
                    <h6 className="mt-3">
                        <b>ITEMS:</b>
                    </h6>
                    <div className="ms-3">
                        {order.order_items.map((item, index) => (
                            <Row key={item.id} className="align-items-center mb-3">
                                <Col xs="auto" className="fw-semibold text-center">
                                    {index + 1}.
                                </Col>
                                {/* Item image */}
                                <Col xs="auto">
                                    <img
                                        src={item.menu_item?.image}
                                        alt={item.menu_item?.name}
                                        className="rounded-circle"
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                    />
                                </Col>
                                {/* Checkbox for "prepared" */}
                                <Col xs="auto">
                                    <Form.Check
                                        type="checkbox"
                                        checked={item.prepared}
                                        label=""
                                        onChange={(e) => updateItemStatus(item.id, e.target.checked)}
                                    />
                                </Col>
                                {/* Name */}
                                <Col className="text-truncate">
                                    {item.menu_item?.name}
                                </Col>
                                {/* Quantity */}
                                <Col xs="auto" className="text-center">
                                    × {item.quantity}
                                </Col>
                                {/* Price */}
                                <Col xs="auto" className="text-end">
                                    ₹{item.total_price}/-
                                </Col>
                            </Row>
                        ))}
                    </div>
                    <hr />
                    {/* Total */}
                    <h5 className="text-end">
                        Total Amount: ₹{order.total_amount}/-
                    </h5>
                </div>
            </Collapse>
        </Card>
    );
};

export default OrderCard;
