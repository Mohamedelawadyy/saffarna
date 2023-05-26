import Packages from "../pages/Packages";
import AdminLayout from "../layouts/AdminLayout";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/Home";
import LoginForm from "../pages/Login";
import Register from "../pages/Register";
import Booking from "../pages/Booking";
import UserBooking from "../pages/UserBooking";
import Profile from "../pages/Profile";
import Users from "../adminPages/Users";
import PackagesAdmin from "../adminPages/PackagesAdmin";
import GetFlights from "../adminPages/GetFlights";
import GetMessages from "../adminPages/GetMessages";
import AdminHome from "../adminPages/AdminHome";
import AddUser from "../adminPages/AddUser";
export const rootRoutes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/packages",
        element: <Packages />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/userBooking",
        element: <UserBooking />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "get-users",
        element: <Users />,
      },
      {
        path: "Add-user",
        element: <AddUser />,
      },
      {
        path: "packages-admin",
        element: <PackagesAdmin />,
      },
      {
        path: "get-Flights",
        element: <GetFlights />,
      },
      {
        path: "get-messages",
        element: <GetMessages />,
      },
    ],
  },
];
