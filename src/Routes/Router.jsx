import { createBrowserRouter } from "react-router";

import HomePage from "../Pages/HomePage/HomePage";
import AllBooks from "../Pages/AllBooks/AllBooks";
import LoginPage from "../Pages/AuthenticationPage/LoginPage/LoginPage";
import RegisterPage from "../Pages/AuthenticationPage/RegisterPage/RegisterPage";
import MainLayout from "../Layouts/MainLayout";
import BookDetailsPage from "../Pages/BookDetailsPage/BookDetailsPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyOrdersPage from "../Pages/DashboardPage/MyOrdersPage";
import PaymentSuccess from "../Pages/DashboardPage/PaymentSuccess";
import PaymentCancelled from "../Pages/DashboardPage/PaymentCancelled";
import PaymentPage from "../Pages/DashboardPage/Paymentpage";
import PaymentHistory from "../Pages/DashboardPage/PaymentHistory";
import AddBook from "../Pages/DashboardPage/LibrarianDashboard/AddBook";
import PrivateRoute from "./PrivateRoute";
import BeALibrarian from "../Pages/BeALibrarian/BeALibrarian";
import ApproveLibrarian from "../Pages/DashboardPage/LibrarianDashboard/ApproveLibrarian";
import UsersManagement from "../Pages/DashboardPage/UsersManagement";
import AdminRoute from "./AdminRoute";
import AdminAndLibrarianRoute from "./AdminAndLibrarianRoute";
import Profile from "../Components/Profile/Profile";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: 'books',
                Component: AllBooks
            },

            {
                path: '/login',
                element: <LoginPage></LoginPage>,
            },
            {
                path: '/register',
                element: <RegisterPage></RegisterPage>,
            },
            {
                path: '/be-librarian',
                element: <PrivateRoute><BeALibrarian></BeALibrarian></PrivateRoute>
            },
            {
                path: '/add-book',
                element: <AdminAndLibrarianRoute><AddBook></AddBook></AdminAndLibrarianRoute>

            },
            {
                path: '/profile',
                Component: Profile
            },
            {
                path: '/book/details/:id',
                element: <PrivateRoute>
                    <BookDetailsPage></BookDetailsPage>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:3000/books/${params.id}`)
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path: 'my-orders',
                Component: MyOrdersPage
            },
            {
                path: 'payment/:orderId',
                Component: PaymentPage
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },
            {
                path: 'payment-histroy',
                Component: PaymentHistory
            },
            {
                path: 'approve-librarian',
                element: <AdminRoute><ApproveLibrarian></ApproveLibrarian></AdminRoute>
            },
            {
                path: 'users-management',
                element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>

            }
        ]
    },
]);