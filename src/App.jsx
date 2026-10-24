
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";

const orders = {
  current: [
    { id: "#ORD101", product: "Wireless Headphones", amount: "₹1,999", status: "Processing" },
    { id: "#ORD102", product: "Smart Watch", amount: "₹2,499", status: "Shipped" },
    { id: "#ORD103", product: "Laptop Bag", amount: "₹899", status: "Processing" },
  ],
  history: [
    { id: "#ORD098", product: "Keyboard", amount: "₹1,299", status: "Delivered" },
    { id: "#ORD097", product: "Mouse", amount: "₹599", status: "Delivered" },
  ],
  cancelled: [
    { id: "#ORD095", product: "USB Cable", amount: "₹299", status: "Cancelled" },
  ],
};

function Home() {
  return (
    <div className="page">
      <h1>Order Management</h1>
      <p>Manage and track all your e-commerce orders in one place.</p>
      <Link className="primary-btn" to="/orders">
        View All Orders
      </Link>
    </div>
  );
}

function OrdersLayout() {
  return (
    <div className="page">
      <h1>My Orders</h1>
      <p className="subtitle">Track your orders and view order details.</p>

      <nav className="tabs">
        <NavLink to="current" className={({ isActive }) => isActive ? "tab active" : "tab"}>
          Current Orders
        </NavLink>
        <NavLink to="history" className={({ isActive }) => isActive ? "tab active" : "tab"}>
          Order History
        </NavLink>
        <NavLink to="cancelled" className={({ isActive }) => isActive ? "tab active" : "tab"}>
          Cancelled Orders
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}

function OrderList({ items }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>{order.amount}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CurrentOrders() {
  return (
    <>
      <h2>Current Orders</h2>
      <OrderList items={orders.current} />
    </>
  );
}

function OrderHistory() {
  return (
    <>
      <h2>Order History</h2>
      <OrderList items={orders.history} />
    </>
  );
}

function CancelledOrders() {
  return (
    <>
      <h2>Cancelled Orders</h2>
      <OrderList items={orders.cancelled} />
    </>
  );
}

function NotFound() {
  return (
    <div className="page">
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <Link className="brand" to="/">ShopEase</Link>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/orders">Orders</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/orders" element={<OrdersLayout />}>
          <Route index element={<Navigate to="current" replace />} />
          <Route path="current" element={<CurrentOrders />} />
          <Route path="history" element={<OrderHistory />} />
          <Route path="cancelled" element={<CancelledOrders />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
