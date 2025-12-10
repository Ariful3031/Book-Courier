import { createBrowserRouter } from "react-router";

import HomePage from "../Pages/HomePage/HomePage";
import AllBooks from "../Pages/AllBooks/AllBooks";
import LoginPage from "../Pages/AuthenticationPage/LoginPage/LoginPage";
import RegisterPage from "../Pages/AuthenticationPage/RegisterPage/RegisterPage";
import RequestDeliveryPage from "../Pages/RequestDelivery/RequestDeliveryPage";
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
                path: '/request-delivery',
                Component: RequestDeliveryPage
            },
            {
                path: '/add-book',
                element: <PrivateRoute>
                    <AddBook></AddBook>
                </PrivateRoute>
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
            }
        ]
    },
]);