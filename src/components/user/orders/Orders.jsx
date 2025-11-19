import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Orders = () => {
  // Minimized JSON data structure
  const menuData = {
    categories: [
      { id: "all", name: "All Dishes", icon: "🍽️" },
      { id: "paneer", name: "Paneer", icon: "🧀" },
      { id: "restaurant-special", name: "Restaurant Special", icon: "⭐" },
      { id: "chinese", name: "Chinese", icon: "🥢" },
      { id: "desserts", name: "Desserts", icon: "🍰" },
      { id: "beverages", name: "Beverages", icon: "🥤" },
      { id: "starters", name: "Starters", icon: "🥟" },
      { id: "biryani", name: "Biryani", icon: "🍛" }
    ],
    dishes: [
      { id: 1, name: "Paneer Butter Masala", category: "paneer", price: 220, description: "Soft paneer in creamy tomato gravy", image: "https://picsum.photos/seed/paneer1/300/200.jpg", isVeg: true, rating: 4.5 },
      { id: 2, name: "Shahi Paneer", category: "paneer", price: 240, description: "Royal delicacy with cashew gravy", image: "https://picsum.photos/seed/paneer2/300/200.jpg", isVeg: true, rating: 4.7 },
      { id: 3, name: "Paneer Tikka", category: "paneer", price: 200, description: "Grilled paneer with spices", image: "https://picsum.photos/seed/paneer3/300/200.jpg", isVeg: true, rating: 4.3 },
      { id: 4, name: "Special Thali", category: "restaurant-special", price: 350, description: "Complete meal with variety", image: "https://picsum.photos/seed/thali/300/200.jpg", isVeg: true, rating: 4.8 },
      { id: 5, name: "Royal Biryani", category: "biryani", price: 280, description: "Fragrant rice with spices", image: "https://picsum.photos/seed/biryani/300/200.jpg", isVeg: false, rating: 4.6 },
      { id: 6, name: "Veg Biryani", category: "biryani", price: 250, description: "Aromatic rice with vegetables", image: "https://picsum.photos/seed/vegbiryani/300/200.jpg", isVeg: true, rating: 4.4 },
      { id: 7, name: "Noodles", category: "chinese", price: 150, description: "Stir-fried noodles with vegetables", image: "https://picsum.photos/seed/noodles/300/200.jpg", isVeg: true, rating: 4.2 },
      { id: 8, name: "Manchurian", category: "chinese", price: 180, description: "Crispy veg balls in tangy sauce", image: "https://picsum.photos/seed/manchurian/300/200.jpg", isVeg: true, rating: 4.4 },
      { id: 9, name: "Gulab Jamun", category: "desserts", price: 80, description: "Sweet milk solids in sugar syrup", image: "https://picsum.photos/seed/gulabjamun/300/200.jpg", isVeg: true, rating: 4.9 },
      { id: 10, name: "Ice Cream", category: "desserts", price: 60, description: "Creamy frozen dessert", image: "https://picsum.photos/seed/icecream/300/200.jpg", isVeg: true, rating: 4.5 },
      { id: 11, name: "Spring Rolls", category: "starters", price: 120, description: "Crispy vegetable rolls", image: "https://picsum.photos/seed/springrolls/300/200.jpg", isVeg: true, rating: 4.3 },
      { id: 12, name: "Cold Coffee", category: "beverages", price: 90, description: "Chilled coffee with ice cream", image: "https://picsum.photos/seed/coldcoffee/300/200.jpg", isVeg: true, rating: 4.6 }
    ]
  };

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Filter dishes based on category
  const filteredDishes = selectedCategory === "all" 
    ? menuData.dishes 
    : menuData.dishes.filter(dish => dish.category === selectedCategory);

  // Cart functions
  const cartActions = {
    add: (dish) => {
      const existingItem = cartItems.find(item => item.id === dish.id);
      setCartItems(existingItem 
        ? cartItems.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...cartItems, { ...dish, quantity: 1 }]
      );
    },
    update: (id, quantity) => {
      setCartItems(quantity <= 0 
        ? cartItems.filter(item => item.id !== id)
        : cartItems.map(item => item.id === id ? { ...item, quantity } : item)
      );
    },
    total: () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    count: () => cartItems.reduce((sum, item) => sum + item.quantity, 0)
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-primary text-white p-3 shadow-sm sticky-top">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h4 mb-0">Food Ordering</h1>
            <button className="btn btn-light btn-sm position-relative" onClick={() => setShowCart(!showCart)}>
              🛒 Cart {cartActions.count() > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartActions.count()}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-4">
        <div className="bg-white rounded shadow-sm overflow-hidden">
          <div className="d-flex" style={{ minHeight: '600px' }}>
            {/* Categories Sidebar */}
            <aside className="categories-sidebar border-end" style={{ width: '85px', flexShrink: 0 }}>
              <div className="categories-list h-100 overflow-auto py-3">
                {menuData.categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-btn w-100 text-start py-3 px-2 border-0 bg-transparent ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                    title={category.name}
                  >
                    <div className="text-center">
                      <div className="mb-2 fs-4">{category.icon}</div>
                      <div className="small text-truncate">{category.name.split(' ')[0]}</div>
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            {/* Dishes Content */}
            <section className="flex-grow-1 overflow-auto">
              <div className="p-3">
                <h2 className="h5 mb-3">{menuData.categories.find(c => c.id === selectedCategory)?.name || 'All Dishes'}</h2>
                
                <div className="row g-3">
                  {filteredDishes.map(dish => (
                    <div className="col-12 col-sm-6 col-lg-4" key={dish.id}>
                      <div className="card h-100 shadow-sm hover-lift border-0">
                        <div className="row g-0 h-100">
                          <div className="col-4 col-md-5">
                            <img src={dish.image} className="img-fluid h-100 object-fit-cover rounded-start" alt={dish.name} style={{ minHeight: '120px' }} />
                          </div>
                          <div className="col-8 col-md-7">
                            <div className="card-body p-2 p-md-3 d-flex flex-column h-100">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="card-title mb-0 fw-bold" style={{ fontSize: 'clamp(12px, 2.5vw, 16px)' }}>{dish.name}</h6>
                                <span className={`badge ${dish.isVeg ? 'bg-success' : 'bg-danger'}`} style={{ fontSize: '10px' }}>
                                  {dish.isVeg ? '🟢' : '🔴'}
                                </span>
                              </div>
                              <p className="card-text text-muted mb-2 flex-grow-1 d-none d-md-block" style={{ fontSize: '12px', lineHeight: '1.3' }}>{dish.description}</p>
                              <div className="d-flex align-items-center mb-2">
                                <span className="text-warning me-1" style={{ fontSize: '12px' }}>⭐</span>
                                <span className="small fw-medium" style={{ fontSize: '11px' }}>{dish.rating}</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-auto">
                                <span className="fw-bold" style={{ fontSize: 'clamp(14px, 3vw, 18px)' }}>₹{dish.price}</span>
                                <button className="btn btn-sm btn-success px-2 px-md-3" style={{ fontSize: 'clamp(11px, 2.5vw, 14px)' }} onClick={() => cartActions.add(dish)}>
                                  Add +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Cart Modal */}
      {showCart && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Your Cart</h5>
                <button type="button" className="btn-close" onClick={() => setShowCart(false)}></button>
              </div>
              <div className="modal-body">
                {cartItems.length === 0 ? (
                  <p className="text-center">Your cart is empty</p>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.name}</h6>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-secondary" onClick={() => cartActions.update(item.id, item.quantity - 1)}>-</button>
                          <button className="btn btn-outline-secondary" disabled>{item.quantity}</button>
                          <button className="btn btn-outline-secondary" onClick={() => cartActions.update(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold">₹{item.price * item.quantity}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="modal-footer">
                  <div className="d-flex justify-content-between w-100 mb-2">
                    <h5>Total:</h5>
                    <h5>₹{cartActions.total()}</h5>
                  </div>
                  <button className="btn btn-success w-100" onClick={() => alert('Order placed successfully!')}>Place Order</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .category-btn {
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }
        
        .category-btn:hover {
          background-color: #f8f9fa !important;
        }
        
        .category-btn.active {
          background-color: #e7f3ff !important;
          border-left-color: #0d6efd;
          font-weight: 600;
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.1) !important;
        }
        
        .card {
          transition: all 0.3s ease;
          border-radius: 10px !important;
          overflow: hidden;
        }
        
        .btn-success:hover {
          transform: scale(1.05);
          background-color: #218838 !important;
        }
        
        .categories-list::-webkit-scrollbar {
          width: 3px;
        }
        
        .categories-list::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }
        
        @media (max-width: 576px) {
          .categories-sidebar { width: 70px !important; }
          .category-btn .fs-4 { font-size: 20px !important; }
          .category-btn .small { font-size: 9px !important; }
        }
        
        @media (min-width: 576px) and (max-width: 768px) {
          .categories-sidebar { width: 75px !important; }
        }
        
        @media (min-width: 768px) and (max-width: 992px) {
          .categories-sidebar { width: 80px !important; }
        }
        
        @media (min-width: 992px) {
          .categories-sidebar { width: 85px !important; }
        }
      `}</style>
    </div>
  );
};

export default Orders;