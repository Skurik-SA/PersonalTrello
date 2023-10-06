import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import reactLogo from "../../assets/react.svg";
import viteLogo from "../../../public/vite.svg";
import {dec, inc} from "../../redux/store/slices/slice_User_Data.js";
import Portal from "../../components/Portal/Portal.jsx";


const PreviousAppPage = () => {
    const [count, setCount] = useState(0)

    const counter = useSelector(state => state.user_data.counter)
    const dispatcher = useDispatch()

    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <div className="card">
                <button onClick={() => dispatcher(inc())}>
                    count is {counter}
                </button>
                <button onClick={() => dispatcher(dec())}>
                    count is {counter}
                </button>
            </div>
            <Portal onClose={() => setIsOpen(false)} open={isOpen}>
                <div style={{color: 'black'}}>
                    Привет
                </div>
            </Portal>
            <div className="card">
                <button onClick={() => setIsOpen(true)}>
                    popup
                </button>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default PreviousAppPage;