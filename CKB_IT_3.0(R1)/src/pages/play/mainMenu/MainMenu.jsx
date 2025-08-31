import 'animate.css'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import '../../../styles/css/firstPage.css'
import uuuLogo from '../../../assets/logo/UU-New-Logo.png'
import codedBorderLogo from '../../../assets/logo/Codex-border.png'
import codexLogo from '../../../assets/logo/codexLogo_nobg.png'
import itUtsav from '../../../assets/logo/IT-utsav.png'
import itUtsavTag from '../../../assets/logo/IT-Utsav-Tag.png'
import { motion } from "framer-motion";

const slideFromLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, delay } }
});

const MainMenu = ({ setGameMode, setTeam }) => {

  const navigator = useNavigate()
  const [inputValue, setInputValue] = useState('');
  
  const handleChange = (event) => {
    // console.log(event.target.value);
    setInputValue(event.target.value);
  };
  
 
  
  const switchAdminMode = () => {
    navigator('admin/')
  }


  function startGame() {
    setTeam(inputValue)
    setGameMode(1);
    console.log(inputValue);
  }


  return (
    <>
      <motion.div 
      initial="hidden" 
      animate="visible" 
      className="firstPageCKB-background overflow-hidden"  // Prevents horizontal scrolling
    >
      
      {/* Navbar */}
      <motion.div variants={slideFromLeft(0.2)} className="firstPageCKB-navigation">
        <motion.div variants={slideFromLeft(0.4)} className="firstPageCKB-uulogo">
          <img src={uuuLogo} alt="Uttranchal University logo" />
        </motion.div>

        {/* Codex Logo & Enlarged Border (No Spinning, Just Sliding In) */}
        <motion.div 
          variants={slideFromLeft(0.6)} 
          className="relative flex justify-center items-center"
        >
          {/* Increased Outer Border Size */}
          <motion.img 
            className="firstPageCKB-Codex-border size-[11rem] z-10" 
            src={codedBorderLogo} 
            alt="Outer Border Logo" 
          />
          
          {/* Inner Codex Logo */}
          <motion.img 
            className="firstPageCKB-logo absolute size-[8rem] translate-x-[6rem] translate-y-3 z-10"
            src={codexLogo} 
            alt="Inner Codex Logo"
          />
        </motion.div>

        {/* IT Utsav Logos */}
        <motion.div variants={slideFromLeft(0.8)} className="firstPageCKB-IT-utsav flex">
          <div>
            <img className="firstPageCKB-IT-Logo" src={itUtsav} alt="IT Utsav Logo" />
          </div>
          <div className="firstPageCKB-center">
            <img className="firstPageCKB-IT-Tag" src={itUtsavTag} alt="IT Utsav Tag" />
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={slideFromLeft(1)} className="firstPageCKB-main">
        <div className="firstPageCKB-main-container">
          <motion.div variants={slideFromLeft(1.2)} className="firstPageCKB-content">
            <p className="firstPageCKB-head1">Codex Club</p>
            <p className="firstPageCKB-presents">Presents</p>
            <p className="firstPageCKB-head2">CODE KE BOSS</p>
            <p className="firstPageCKB-pera">A Premier Coding Contest</p>
            <p className="firstPageCKB-quote">"Gear up, get Coding & become the</p>
            <p className="firstPageCKB-quote">Next Code Ke Boss."</p>
          </motion.div>

          {/* Animated Form */}
          <motion.div variants={slideFromLeft(1.4)} className="firstPageCKB-form">
            <div className="firstPageCKB-form-container flex items-center justify-center">
              <p className="firstPageCKB-head">IT UTSAV 3.0</p>
              <form onSubmit={startGame} className='flex items-center justify-center flex-col'>
                <input type="text" onChange={handleChange} required placeholder="ENTER TEAM ID" />
                <br />
                <br />
                <button type="submit">START</button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Admin Button */}
      <motion.div variants={slideFromLeft(1.6)} className="firstPageCKB-admin">
        <div>
          <i className="fa-solid fa-user-tie"></i>
          <button type='button' onClick={switchAdminMode}>Admin</button>
        </div>
      </motion.div>

    </motion.div>

    </>
  )
}

export default MainMenu



