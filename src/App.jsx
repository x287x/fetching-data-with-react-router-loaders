import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorElement from "./components/errors/error-element";
import NotFound from "./components/errors/not-found";
import Friends, { loader as friendsLoader } from "./routes/friends";
import Post, { loader as postLoader } from "./routes/post";
import Posts from "./routes/posts";
import Root from "./routes/root";
import User, { loader as userLoader } from "./routes/user";
import queryClient from "./vendors/query-client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorElement />,
    children: [
      {
        errorElement: <ErrorElement />,
        children: [
          { index: true, element: <Posts /> },
          {
            path: "/posts",
            element: <Posts />,
          },
          {
            path: "/post/:postId",
            element: <Post />,
            loader: postLoader,
            id: "post",
          },
          {
            path: "/friends",
            element: <Friends />,
            loader: friendsLoader,
          },
          {
            path: "/user/:userId",
            element: <User />,
            loader: userLoader,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools client={queryClient} />
      </QueryClientProvider>
    </>
  );
}

export default App;
