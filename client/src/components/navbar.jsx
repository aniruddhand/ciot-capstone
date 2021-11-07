import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authprovider";

export default function Navbar() {
    const auth = useAuth();
    const navigate = useNavigate();

    function logout() {
        auth.signOut(auth.user?.email, () => {
            navigate('/login', {replace: true});
        });
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <h1><Link className="navbar-brand" to="/dashboard/summary">Smart Water Level Controller</Link></h1>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="d-flex navbar-nav me-auto mb-2 mb-lg-0"></ul>
                    <div className="nav-item dropdown d-flex">
                        <div className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </span>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}