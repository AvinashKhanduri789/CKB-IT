import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Play from './pages/Play';
import Admin from './pages/Admin';
import { useState } from 'react';
import './styles/css/App.css'


const Home = () => {
    const [isPlaying, setPlaying] = useState(false)
    const [totalTimer, setTotalTimer] = useState(30*60)

    return (
        <BrowserRouter>
            <Routes>
            <Route path="/">
                <Route index element={  <Play 
                                            setPlaying={setPlaying}
                                            totalTimer={totalTimer} setTotalTimer={setTotalTimer}
                                        />} 
            />
            <Route path="admin" element={<Admin />} />
            </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Home