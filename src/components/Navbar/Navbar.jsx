import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userName = useSelector(state => {
        console.log("Redux state:", state);
        return state.userReducer.userName;
    });

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src="/img/argentBankLogo.webp"
                    alt="Argent Bank Logo"
                />
            </Link>
            <div>
                {token ? (
                    <>
                        <Link className="main-nav-item" to="/user">
                            <FontAwesomeIcon icon={faUserCircle} /> {userName || "Utilisateur"}
                        </Link>
                        <button className="main-nav-item" onClick={handleSignOut}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
                        </button>
                    </>
                ) : (
                    <Link className="main-nav-item" to="/sign-in">
                        <FontAwesomeIcon icon={faUserCircle} /> Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}
