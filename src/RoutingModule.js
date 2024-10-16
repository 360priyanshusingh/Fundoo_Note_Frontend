import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./componant/Login/Login";
import Signup from "./componant/Signup/Signup";
import Dashboard from "./componant/DashBoard/Dashboard.jsx";
// import NotesContainer from "./componant/NotesContainer";
import ArchiveContainer from "./componant/ArchiveContainer/ArchiveContainer.jsx";
import AddNotes from "./componant/AddNotes/AddNotes.jsx";
import NoteCard from "./componant/NoteCard/NoteCard.jsx";
import NotesContainer from "./componant/NotesContainer/NotesContainer.jsx";
import TrashContainer from "./componant/TrashContainer/TrashContainer.jsx";

export default function RoutingModule() {
    const appRoutes = createBrowserRouter([
        {
            path: "",
            element: <Login/>
        },
        {
            path: "signup",
            element: <Signup/>
        }
        ,
        {
            path:"dashboard",
            element:<Dashboard/>,
            children:[
                {
                    path:"notes",
                    element:<NotesContainer />
                },
                {
                    path:"archive",
                    element:<ArchiveContainer/>
                },
                {
                    path:"trash",
                    element:<TrashContainer/>
                }
            ]
        }
    ])

    return(
        <RouterProvider router={appRoutes}/>
    )
}