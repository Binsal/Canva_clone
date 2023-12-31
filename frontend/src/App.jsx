import {
  createBrowserRouter,
  RouterProvider ,
} from "react-router-dom";

import Index from "./pages/index";
import Layout from "./pages/layout";

const router  = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>
  }
])


function App() {

  return (
   <RouterProvider router={router}/>
  )
}

export default App
