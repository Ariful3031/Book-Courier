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
import MyWishlistsPage from "../Pages/DashboardPage/MyWishlistsPage";
import MyBooksPage from "../Pages/DashboardPage/LibrarianDashboard/MyBooksPage";
import UpdateBookPage from "../Pages/DashboardPage/LibrarianDashboard/UpdateBookPage";
import ProfilePage from "../Components/Profile/ProfilePage";
import Setting from "../Components/Setting/Setting";
import ErrorPage404 from "../Components/ErrorPage/ErrorPage404";
import ErrorElementPage from "../Components/ErrorPage/ErrorElementPage";
import AboutPage from "../Pages/About/AboutPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorElementPage></ErrorElementPage>,
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
                Component: ProfilePage
            },
            {
                path: '/about-us',
                Component: AboutPage
            },
            {
                path: '/settings',
                Component: Setting
            },
            {
                path: '/book/details/:id',
                element: <PrivateRoute>
                    <BookDetailsPage></BookDetailsPage>
                </PrivateRoute>,
                loader: async ({ params }) => {
                    const res = await fetch(
                        `https://book-courier-server-black.vercel.app/books/${params.id}`
                    );

                    if (!res.ok) {
                        throw new Response("Book Not Found", {
                            status: 404,
                            statusText: "Not Found",
                        });
                    }

                    return res.json();
                },
                errorElement: <ErrorElementPage></ErrorElementPage>
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
                path: 'my-wishlists',
                Component: MyWishlistsPage
            },
            {
                path: 'my-books',
                Component: MyBooksPage
            },
            {
                path: 'update-book/:id',
                Component: UpdateBookPage
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
    {
        path: '*',
        Component: ErrorPage404
    }
]);