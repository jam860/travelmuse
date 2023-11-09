import { NavLink } from "react-router-dom";

export function Navbar() {
    return (
        <header>
            <nav>
                <div className="nav-container">
                    <div className="logo" role="button">
                        <NavLink to="/"><img width="300" height="50" src="img/logo.png" aria-label="TravelMuse logo" alt="TravelMuse logo" /></NavLink>
                    </div>
                    <div className="nav-links">
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="plan">Plan</NavLink>
                            </li>
                            <li>
                                <NavLink to="mytrips">Trips</NavLink>
                            </li>
                            <li>
                                <NavLink to="#">Sign-in</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

