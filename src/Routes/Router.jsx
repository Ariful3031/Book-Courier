import { createBrowserRouter } from "react-router";

import HomePage from "../Pages/HomePage/HomePage";
import AllBooks from "../Pages/AllBooks/AllBooks";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import DashboardPage from "../Pages/Dashboard/DashboardPage";
import RequestDeliveryPage from "../Pages/RequestDelivery/RequestDeliveryPage";
import MainLayout from "../Layouts/MainLayout";


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
                path:'/books',
                Component: AllBooks
            },
            {
                path:'/dashboard',
                Component: DashboardPage
            },
            {
                path:'/login',
                Component: LoginPage
            },
            {
                path:'/register',
                Component: RegisterPage
            },
            {
                path:'request-delivery',
                Component: RequestDeliveryPage
            },
        ]
    },
]);