import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import Media from "../pages/Media/Media";
import PostDetails from "../pages/PostDetails/PostDetails";
import SignIn from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/media',
                element: <Media />
            },
            {
                path: "/signup",
                element: <SignUp />
            },
            {
                path: "/signin",
                element: <SignIn />
            },
            {
                path: "/posts/:id",
                element: <PostDetails />,
                loader: ({ params }) => fetch(`https://backend-silk-kappa.vercel.app/posts/${params.id}`)
            },
            {
                path: "/about",
                element: <About />
            }
        ]
    }
])