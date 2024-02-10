// global styles
import './assets/styles/normalize.css'
import './assets/styles/global.css'
import './App.scss'

import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import Page404 from "./components/404/Page404.jsx";
import {Toaster} from "react-hot-toast";


const App = () => {

    return (
        <div className="App">
            <BrowserRouter>

                <Header />

                <Routes>

                    <Route path='/' element={<Home />} />


                    {/*404*/}
                    <Route path='/*' element={<Page404/>}/>

                </Routes>

                <Toaster
                    containerClassName="toast"
                    position="top-center"
                    reverseOrder={false}
                />

            </BrowserRouter>
        </div>
    )
}

export default App