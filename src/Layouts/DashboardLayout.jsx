import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';
import { FaCreditCard, FaJediOrder, FaUsers, FaBars } from 'react-icons/fa';
import { SiLibrarything, SiWish } from "react-icons/si";
import { FaBook } from 'react-icons/fa6';
import useRole from '../Components/Hooks/useRole';

export default function DashboardLayout() {
  const { role } = useRole();
  console.log(role.role);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">

        {/* Navbar */}
        <nav className="navbar sticky top-0 z-[1000] bg-white dark:bg-gray-800 shadow px-4">
          {/* Mobile toggle */}
          <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
            <FaBars />
          </label>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="btn btn-ghost hidden lg:flex"
          >
            <FaBars />
          </button>

          <span className="ml-4 font-bold text-lg">
            Book Courier Dashboard
          </span>
        </nav>

        <main className="p-4">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside
          className={`h-full bg-white dark:bg-gray-800 transition-all duration-300
          ${collapsed ? 'w-20' : 'w-64'}`}
        >
          <ul className="menu p-4 gap-2">

            {/* Home */}
            <SidebarItem to="/" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>} label="Homepage" collapsed={collapsed} />

            <SidebarItem to="/dashboard/my-orders" icon={<FaJediOrder />} label="My Orders" collapsed={collapsed} />

            <SidebarItem to="/dashboard/my-wishlists" icon={<SiWish />} label="My Wishlists" collapsed={collapsed} />

            <SidebarItem to="/dashboard/payment-histroy" icon={<FaCreditCard />} label="Payment History" collapsed={collapsed} />

            {role.role == 'librarian' && (
              <SidebarItem to="/dashboard/my-books" icon={<FaBook />} label="My Books" collapsed={collapsed} />
            )}

            {role.role == 'admin' && (
              <>
                <SidebarItem to="/dashboard/approve-librarian" icon={<SiLibrarything />} label="Approve Librarian" collapsed={collapsed} />
                <SidebarItem to="/dashboard/users-management" icon={<FaUsers />} label="Users Management" collapsed={collapsed} />
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
}

/* Reusable Sidebar Item */
function SidebarItem({ to, icon, label, collapsed }) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition"
      >
        <span className="text-lg">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </Link>
    </li>
  );
}
