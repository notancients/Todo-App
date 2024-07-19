import { createBrowserRouter } from "react-router-dom";
import Homepage from "./screens/homepage";
import Landing from "./screens/landing";
import Signin from "./screens/signin";
import Signup from "./screens/signup";
import TodoList from "./screens/todolist";




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
    {
        path: "todolist",
        element: <TodoList/>
    }
])

export default router;