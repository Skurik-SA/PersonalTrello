import {Route, Routes} from "react-router-dom";
import Layout from "./Layout.jsx";
import LoginPage from "../../pages/AuthPages/LoginPage/LoginPage.jsx";
import RegistrationPage from "../../pages/AuthPages/RegistrationPage/RegistrationPage.jsx";
import PreviousAppPage from "../../pages/PreviousAppPage/PreviousAppPage.jsx";
import Board from "../../pages/Board/Board.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<LoginPage/>}/>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='registration' element={<RegistrationPage/>}/>
                <Route path='prevApp' element={<PreviousAppPage/>}/>
                <Route path='my-boards' element={<Board/>}/>
            </Route>
        </Routes>
    )
}

export default AppRouter;