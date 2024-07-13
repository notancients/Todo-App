import { createBrowserRouter } from "react-router-dom";
import Homepage from "./screens/homepage";
import Landing from "./screens/landing";
import Signin from "./screens/signin";
import Signup from "./screens/signup";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing/>,
    },
    {
        path: "signin",
        element: <Signin/>
    },
    {
        path: "signup",
        element: <Signup/>
    },
    {
        path: "homepage",
        element: <Homepage/>
    },
])

export default router;