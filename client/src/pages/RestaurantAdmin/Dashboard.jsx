import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Dashboard.css";
import OfferBanner from "../../components/ui/OfferBanner";

// --- SVG Icons ---
const IconWallet = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z"></path>
  </svg>
);

const IconMenuBook = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
    <path d="M10 6h4"></path>
    <path d="M10 10h4"></path>
    <path d="M10 14h2"></path>
  </svg>
);

const IconPercent = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="5" x2="5" y2="19"></line>
    <circle cx="6.5" cy="6.5" r="2.5"></circle>
    <circle cx="17.5" cy="17.5" r="2.5"></circle>
  </svg>
);

const IconHelpCircle = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const IconBack = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const IconPlus = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// Navigation Icons
const IconHome = ({ active }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={active ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
const IconOrdersClipboard = ({ active }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={active ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
);
const IconInbox = ({ active }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={active ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
  </svg>
);
const IconAccount = ({ active }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={active ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    total_menu_items: 0,
    total_orders: 0,
    pending_orders: 0,
    delivered_orders: 0,
    avg_rating: 0,
  });
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // New MenuItem form
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Edit MenuItem form
  const [editingItem, setEditingItem] = useState(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemPrice, setEditItemPrice] = useState("");
  const [showEditMenu, setShowEditMenu] = useState(false);

  // Tabs: 'home', 'payment', 'menu', 'orders', 'account'
  const [activeTab, setActiveTab] = useState("home");

  // History filtering
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Orders management filtering
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");
  const statusFilters = [
    "All",
    "Pending",
    "Preparing",
    "Out for Delivery",
    "Delivered",
  ];

  useEffect(() => {
    const storedAdmin = localStorage.getItem("restaurantAdmin");
    if (!storedAdmin) {
      navigate("/restaurant/login");
      return;
    }
    const parsedAdmin = JSON.parse(storedAdmin);
    setAdmin(parsedAdmin);
    fetchDashboardData(parsedAdmin.restaurant_id);
  }, [navigate]);

  const fetchDashboardData = async (restaurantId) => {
    try {
      setLoading(true);
      const [statsRes, ordersRes, menuRes] = await Promise.all([
        api.get(`/restaurant-admins/${restaurantId}/stats`),
        api.get(`/restaurant-admins/${restaurantId}/orders`),
        api.get(`/restaurants/${restaurantId}/menu`),
      ]);
      setStats(statsRes.data);
      setOrders(ordersRes.data);
      setMenuItems(menuRes.data);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("restaurantAdmin");
    navigate("/restaurant/login");
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(
        `/restaurant-admins/${admin.restaurant_id}/orders/${orderId}/status`,
        {
          status: newStatus,
        },
      );
      // Refresh only orders to update UI immediately
      const res = await api.get(
        `/restaurant-admins/${admin.restaurant_id}/orders`,
      );
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status.");
    }
  };

  const addMenuItem = async (e) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;
    try {
      await api.post(`/restaurant-admins/${admin.restaurant_id}/menu`, {
        name: newItemName,
        price: parseFloat(newItemPrice),
      });
      setNewItemName("");
      setNewItemPrice("");
      setShowAddMenu(false);
      // Refresh menu
      const res = await api.get(`/restaurants/${admin.restaurant_id}/menu`);
      setMenuItems(res.data);
    } catch (err) {
      console.error("Failed to add item", err);
      alert("Failed to add menu item.");
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditItemName(item.name);
    setEditItemPrice(item.price);
    setShowEditMenu(true);
  };

  const handleUpdateMenuItem = async (e) => {
    e.preventDefault();
    if (!editItemName || !editItemPrice || !editingItem) return;
    try {
      await api.put(
        `/restaurant-admins/${admin.restaurant_id}/menu/${editingItem.id}`,
        {
          name: editItemName,
          price: parseFloat(editItemPrice),
        },
      );
      setEditingItem(null);
      setEditItemName("");
      setEditItemPrice("");
      setShowEditMenu(false);
      // Refresh menu
      const res = await api.get(`/restaurants/${admin.restaurant_id}/menu`);
      setMenuItems(res.data);
    } catch (err) {
      console.error("Failed to edit item", err);
      alert("Failed to edit menu item.");
    }
  };

  const deleteMenuItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this menu item?"))
      return;
    try {
      await api.delete(
        `/restaurant-admins/${admin.restaurant_id}/menu/${itemId}`,
      );
      // Refresh menu
      const res = await api.get(`/restaurants/${admin.restaurant_id}/menu`);
      setMenuItems(res.data);
    } catch (err) {
      console.error("Failed to delete item", err);
      alert("Failed to delete menu item.");
    }
  };

  const getStatusClass = (status) => {
    const s = status.toLowerCase();
    if (s === "pending") return "status-pending";
    if (s === "preparing") return "status-preparing";
    if (s === "out for delivery") return "status-out-for-delivery";
    if (s === "delivered") return "status-delivered";
    return "";
  };

  if (loading || !admin) {
    return (
      <div className="restaurant-dashboard-wrapper loading">Loading...</div>
    );
  }

  // Calculate earnings logically from delivered orders
  const totalEarnings = orders
    .filter((o) => o.status === "Delivered")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="restaurant-dashboard-wrapper">
      {/* HOME TAB */}
      {activeTab === "home" && (
        <div className="tab-pane home-tab">
          <div className="home-top">
            <div className="home-avatar"></div>
            <div className="home-user-info">
              <h3>Welcome, {admin.owner_name}</h3>
              <p>{admin.restaurant_name}</p>
            </div>
          </div>

          <div className="earning-card">
            <div
              className="earning-card-icon"
              onClick={() => setActiveTab("payment")}
            >
              <IconWallet />
            </div>
            <div className="earning-card-divider"></div>
            <div className="earning-card-info">
              <span>Total Earning</span>
              <h2>${totalEarnings.toFixed(2)}</h2>
            </div>
          </div>

          <div className="stats-text">
            {orders.length} Food Orders | Total Earnings $
            {totalEarnings.toFixed(2)}
          </div>

          <div>
            <OfferBanner />
          </div>
        </div>
      )}

      {/* PAYMENT / HISTORY TAB */}
      {activeTab === "payment" && (
        <div className="tab-pane payment-tab">
          <div className="header-back" onClick={() => setActiveTab("home")}>
            <IconBack /> Back
          </div>

          <div className="earning-card payment-banner">
            <div className="earning-card-icon">
              <IconWallet />
            </div>
            <div className="earning-card-divider"></div>
            <div className="earning-card-info">
              <span>Total Earning</span>
              <h2>
                $
                {orders
                  .filter((o) => {
                    const isDelivered = o.status === "Delivered";
                    const orderDate = new Date(o.created_at);
                    return (
                      isDelivered && orderDate.getMonth() === selectedMonth
                    );
                  })
                  .reduce((sum, o) => sum + o.total, 0)
                  .toFixed(2)}
              </h2>
            </div>
          </div>

          <div className="history-header">
            <h3>History</h3>
            <div
              className="history-dropdown"
              style={{ position: "relative", cursor: "pointer" }}
            >
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <span>{months[selectedMonth]}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          <div>
            <div className="history-list">
              {orders
                .filter((o) => {
                  const isDelivered = o.status === "Delivered";
                  const orderDate = new Date(o.created_at);
                  const isCorrectMonth = orderDate.getMonth() === selectedMonth;
                  return isDelivered && isCorrectMonth;
                })
                .map((order) => (
                  <div className="history-item" key={order.id}>
                    <div>
                      <h4>Income - Order #{order.id}</h4>
                      <p>{new Date(order.created_at).toLocaleString()}</p>
                    </div>
                    <div className="history-amount">
                      ${Number(order.total).toFixed(2)}
                    </div>
                  </div>
                ))}
              {orders.filter((o) => {
                const isDelivered = o.status === "Delivered";
                const orderDate = new Date(o.created_at);
                const isCorrectMonth = orderDate.getMonth() === selectedMonth;
                return isDelivered && isCorrectMonth;
              }).length === 0 && (
                <p
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: "2rem",
                  }}
                >
                  No earnings for {months[selectedMonth]} yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MENU TAB */}
      {activeTab === "menu" && (
        <div className="tab-pane menu-tab">
          <div className="header-back">
            <div
              className="back-clickable"
              onClick={() => setActiveTab("home")}
            >
              <IconBack /> Back
            </div>
            <h3 className="header-title">Menu</h3>
          </div>

          {showAddMenu && (
            <div className="add-menu-overlay">
              <form className="add-item-form-restyled" onSubmit={addMenuItem}>
                <h3>Add New Menu Item</h3>
                <input
                  type="text"
                  className="add-input"
                  placeholder="Menu name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="add-input"
                  placeholder="Price (xxx Baht/$)"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                  required
                />
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setShowAddMenu(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-save">
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}

          {showEditMenu && (
            <div className="add-menu-overlay">
              <form
                className="add-item-form-restyled"
                onSubmit={handleUpdateMenuItem}
              >
                <h3>Edit Menu Item</h3>
                <input
                  type="text"
                  className="add-input"
                  placeholder="Menu name"
                  value={editItemName}
                  onChange={(e) => setEditItemName(e.target.value)}
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="add-input"
                  placeholder="Price (xxx Baht/$)"
                  value={editItemPrice}
                  onChange={(e) => setEditItemPrice(e.target.value)}
                  required
                />
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => {
                      setShowEditMenu(false);
                      setEditingItem(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-save">
                    Update
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="menu-list">
            {menuItems.map((item) => (
              <div className="menu-list-item" key={item.id}>
                <div className="menu-item-img"></div>
                <div className="menu-item-info">
                  <h4>{item.name}</h4>
                  <p>Price: {item.price} Baht</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexDirection: "column",
                  }}
                >
                  <button
                    className="btn-edit"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => deleteMenuItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {menuItems.length === 0 && (
              <p style={{ textAlign: "center", color: "#64748b" }}>
                No menu items found.
              </p>
            )}
          </div>

          <button className="fab" onClick={() => setShowAddMenu(true)}>
            <IconPlus />
          </button>
        </div>
      )}

      {/* ORDERS TAB (Legacy logic integrated smoothly) */}
      {activeTab === "orders" && (
        <div className="tab-pane orders-tab">
          <div className="history-header" style={{ paddingBottom: "1rem" }}>
            <h3>Orders Management</h3>
          </div>

          <div
            className="status-filter-scroll"
            style={{
              display: "flex",
              gap: "0.75rem",
              overflowX: "auto",
              paddingBottom: "1rem",
              marginBottom: "1rem",
              scrollbarWidth: "none",
            }}
          >
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveStatusFilter(f)}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "2rem",
                  border: "none",
                  backgroundColor:
                    activeStatusFilter === f ? "#12003c" : "#f1f5f9",
                  color: activeStatusFilter === f ? "white" : "#64748b",
                  fontWeight: "700",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                  boxShadow:
                    activeStatusFilter === f
                      ? "0 4px 6px -1px rgba(0,0,0,0.1)"
                      : "none",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="orders-grid">
            {(() => {
              const filteredOrders = orders.filter((o) => {
                if (activeStatusFilter === "All") return true;
                return (
                  o.status.toLowerCase() === activeStatusFilter.toLowerCase()
                );
              });

              const sortedOrders = [...filteredOrders].sort((a, b) => {
                const aDelivered = a.status.toLowerCase() === "delivered";
                const bDelivered = b.status.toLowerCase() === "delivered";

                if (aDelivered !== bDelivered) {
                  return aDelivered ? 1 : -1;
                }
                return new Date(b.created_at) - new Date(a.created_at);
              });

              if (sortedOrders.length === 0) {
                return (
                  <p
                    style={{
                      gridColumn: "1/-1",
                      textAlign: "center",
                      color: "#64748b",
                      padding: "2rem",
                    }}
                  >
                    No {activeStatusFilter.toLowerCase()} orders found.
                  </p>
                );
              }

              return sortedOrders.map((order) => {
                const isDelivered = order.status.toLowerCase() === "delivered";
                return isDelivered ? (
                  <div
                    className="order-card delivered-card"
                    key={order.id}
                    style={{ backgroundColor: "#f8fafc", opacity: 0.9 }}
                  >
                    <div className="order-header">
                      <div className="order-id">#ORD-{order.id}</div>
                      <div
                        className={`order-status ${getStatusClass(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </div>
                    </div>
                    <div className="order-body">
                      <div className="order-date">
                        {new Date(order.created_at).toLocaleString()}
                      </div>
                      <div className="order-customer">
                        Customer:{" "}
                        {order.customer_name || `User ID ` + order.customer_id}
                      </div>
                      <div className="order-items">{order.items_summary}</div>
                      <div className="order-total">
                        ${Number(order.total).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="order-card" key={order.id}>
                    <div className="order-header">
                      <div className="order-id">#ORD-{order.id}</div>
                      <div
                        className={`order-status ${getStatusClass(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </div>
                    </div>
                    <div className="order-body">
                      <div className="order-date">
                        {new Date(order.created_at).toLocaleString()}
                      </div>
                      <div className="order-customer">
                        Customer:{" "}
                        {order.customer_name || `User ID ` + order.customer_id}
                      </div>
                      <div className="order-items">{order.items_summary}</div>
                      <div className="order-total">
                        ${Number(order.total).toFixed(2)}
                      </div>
                    </div>
                    <div className="order-actions">
                      <select
                        className="status-select"
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {/* ACCOUNT TAB */}
      {activeTab === "account" && (
        <div
          className="tab-pane account-tab"
          style={{ padding: "2rem", textAlign: "center" }}
        >
          <h2>Account Setup</h2>
          <p style={{ color: "#64748b", marginBottom: "2rem" }}>
            Manage your {admin.restaurant_name} settings
          </p>
          <button
            onClick={handleLogout}
            className="btn-logout"
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              padding: "0.75rem 2rem",
              borderRadius: "1rem",
              border: "none",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Logout Securely
          </button>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div className="restaurant-bottom-nav">
        <div
          className={`rb-nav-item ${activeTab === "home" ? "active" : ""}`}
          onClick={() => setActiveTab("home")}
        >
          <IconHome />
          <span>Home</span>
        </div>
        <div
          className={`rb-nav-item ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <IconOrdersClipboard />
          <span>Orders</span>
        </div>
        <div
          className={`rb-nav-item ${activeTab === "menu" ? "active" : ""}`}
          onClick={() => setActiveTab("menu")}
        >
          <IconMenuBook />
          <span>Menu</span>
        </div>
        <div
          className={`rb-nav-item ${activeTab === "account" ? "active" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          <IconAccount active={activeTab === "account"} />
          <span>Account</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
