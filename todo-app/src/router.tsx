import { createBrowserRouter } from "react-router-dom";
import Homepage from "./screens/homepage";
import Landing from "./screens/landing";
import LoginSignup from "./screens/login_signup";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing/>,
    },
    {
        path: "login",
        element: <LoginSignup/>
    },
    {
        path: "homepage",
        element: <Homepage/>
    },
])

export default router;