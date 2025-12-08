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
                path: 'login',
                Component: LoginPage
            },
            {
                path: 'register',
                Component: RegisterPage
            },
            {
                path: 'request-delivery',
                Component: RequestDeliveryPage
            },
            {
                path: 'book/details/:id',
                Component: BookDetailsPage,
                loader: ({ params }) => fetch(`http://localhost:3000/books/${params.id}`)
            },
        ]
    },
    {
        path: 'dashboard',
        Component: DashboardLayout,
        children: [
            {
                path: 'my-orders',
                Component: MyOrdersPage
            }
        ]
    },
]);