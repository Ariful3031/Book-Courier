import React from 'react';
import { Link, Outlet } from 'react-router';
import { FaCreditCard, FaJediOrder, FaUsers } from 'react-icons/fa';
import { SiLibrarything, SiWish } from "react-icons/si";
import { FaBook } from 'react-icons/fa6';
import useRole from '../Components/Hooks/useRole';

export default function DashboardLayout() {
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors min-h-screen">

        {/* Navbar */}
        <nav className="navbar sticky top-0 z-[1000] bg-white dark:bg-gray-800 shadow-md px-4">
          <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <span className="ml-4 font-bold text-lg text-gray-900 dark:text-white transition-colors">Book Courier Dashboard</span>
        </nav>

        {/* Page Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors h-full flex flex-col">
          <ul className="menu p-4 flex flex-col gap-2">

            {/* Home */}
            <li>
              <Link to='/' className="flex items-center gap-2 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg p-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                <span>Homepage</span>
              </Link>
            </li>

            {/* My Orders */}
            <li>
              <Link to='/dashboard/my-orders' className="flex items-center gap-2 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg p-2 transition-colors">
                <FaJediOrder />
                <span>My Orders</span>
              </Link>
            </li>

            {/* Wishlists */}
            <li>
              <Link to='/dashboard/my-wishlists' className="flex items-center gap-2 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg p-2 transition-colors">
                <SiWish />
                <span>My Wishlists</span>
              </Link>
            </li>

            {/* Payment History */}
            <li>
              <Link to='/dashboard/payment-histroy' className="flex items-center gap-2 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg p-2 transition-colors">
                <FaCreditCard />
                <span>Payment History</span>
              </Link>
            </li>

            {/* Librarian Only */}
            {role.role === 'librarian' && (
              <li>
                <Link to='/dashboard/my-books' className="flex items-center gap-2 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg p-2 transition-colors">
                  <FaBook />
                  <span>My Books</span>
                </Link>
              </li>
            )}

            {/* Admin Only */}
            {role.role === 'admin' && (
              <>
                <li>
                  <Link to='/dashboard/approve-librarian' className="flex items-center gap-2 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg p-2 transition-colors">
                    <SiLibrarything />
                    <span>Approve Librarian</span>
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard/users-management' className="flex items-center gap-2 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg p-2 transition-colors">
                    <FaUsers />
                    <span>Users Management</span>
                  </Link>
                </li>
              </>
            )}

            {/* Settings */}
            <li>
              <button className="flex items-center gap-2 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg p-2 w-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7h-9M14 17H5" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" />
                </svg>
                <span>Settings</span>
              </button>
            </li>

          </ul>
        </aside>
      </div>
    </div>
  );
}
