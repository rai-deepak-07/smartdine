import React, { useContext, useEffect } from "react";
import { RestaurantContext } from "../../../context/Context";
import OrderCard from "./OrderCard";
import { Alert, Col, Row } from "react-bootstrap";

const Orders = () => {
  const { activeOrders, fetchTodayActiveOrders } = useContext(RestaurantContext);

  useEffect(() => {
    // Fetch immediately on mount
    fetchTodayActiveOrders();

    // Set up interval for every 1 minute
    const intervalId = setInterval(() => {
      fetchTodayActiveOrders();
    }, 10000); // 10000 ms = 10 seconds

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mt-4">
      <Row className="mb-3">
        <Col md={6}>
          <h3><i className="bi bi-cart4 me-2"></i>Active Orders</h3>
        </Col>
        <Col md={6} className="text-md-end">
          <p className="fw-semibold">Remaining Orders: {activeOrders.length}</p>
        </Col>
        <hr />
      </Row>

      {activeOrders.length === 0 ? (
        <Alert variant="secondary" className="text-center">No orders Today</Alert>
      ) : (
        activeOrders.map((order) => <OrderCard key={order.id} order={order} />)
      )}
    </div>
  );
};

export default Orders;
