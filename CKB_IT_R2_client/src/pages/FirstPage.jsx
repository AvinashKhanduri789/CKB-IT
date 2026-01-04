import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postTeam } from "../utils/requester";
import uuLogo from "../../public/UUlogo.png"
import codexLogo from "../../public/main_logo.gif"
import "../styles/css/firstPage.css";

function FrontPage() {
  const [inputValue, setInputValue] = useState("");
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const startGame = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    setLoading(true);
    setError(false);

    postTeam(inputValue)
      .then(() => {
        localStorage.setItem("team_name", inputValue);
        setLoading(false);
        navigator("/gameRules");
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.error("Error posting team:", err);
        alert(err.response?.data?.message || "Something went wrong");
      });
  };

  const switchAdminMode = () => {
    navigator("/login");
  };

  

  return (
    <div className="firstPageCKB-background">
      {/* Navigation */}
      <div className="firstPageCKB-navigation">
        
        
        <div className="firstPageCKB-uulogo">
          <img  src={uuLogo} alt="University Logo" />
        </div>

        <div className="firstPageCKB-center">
          <img className="firstPageCKB-Codex-border" src="/Codex-border.png" alt="" />
          <img className="firstPageCKB-logo" src={codexLogo} alt="Codex" />
        </div>

       
      </div>

      {/* Main Section */}
      <div className="firstPageCKB-main">
        <div className="firstPageCKB-main-container">
          {/* Left Content */}
          <div className="firstPageCKB-content">
            <h1 className="firstPageCKB-head1">CODEX CLUB</h1>

            <div className="firstPageCKB-presents">
              <p>Presents</p>
            </div>

            <h2 className="firstPageCKB-head2">BYTE 2.0 </h2>
             
            <p className="firstPageCKB-pera">ROUND 2</p>
            <p className="firstPageCKB-pera">Boost your technical excellence</p>

            <p className="firstPageCKB-quote">
              A Premier Coding Contest
            </p>
          </div>

          {/* Right Form */}
          <div className="firstPageCKB-form">
            <form onSubmit={startGame} className="firstPageCKB-form-container">
              <h2 className="firstPageCKB-head">Enter Team ID</h2>

              <input
                type="text"
                placeholder="Enter Your Team Id"
                value={inputValue}
                onChange={handleChange}
                required
              />

              <button type="submit">
                {loading ? "Loading..." : "Start"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Admin Button */}
      <div className="firstPageCKB-admin">
        <button onClick={switchAdminMode}>
          <i className="fa-solid fa-circle-user"></i> Admin
        </button>
      </div>
    </div>
  );
}

export default FrontPage;


