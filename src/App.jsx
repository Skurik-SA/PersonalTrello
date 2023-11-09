import './App.css'
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter.jsx";
import Nav from "./components/NavigationPanel/Nav.jsx";
import {DragDropContext} from "react-beautiful-dnd";


function App() {
    return (
        <BrowserRouter>
            <Nav/>
                <AppRouter/>
        </BrowserRouter>
    )
}

export default App
