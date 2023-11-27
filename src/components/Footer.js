import { NavLink } from "react-router-dom";

export function Footer(props) {
    return (
        <footer className="d-md-flex justify-content-center flex-wrap pb-5 p-5">
            <div className="travel-muse-info ">
                <div className="pb-3" role="button">
                    <NavLink to="/"><img width="300" height="50" src="/img/logo.png" aria-label="TravelMuse logo" alt="TravelMuse logo" /></NavLink>
                </div>
                <p>TravelMuse simplifies the process of planning trips, vacations, group meetings, and more. It also offers a convenient way for users to share and collaborate on their itineraries with others. </p>
                <p>&copy; 2023 TravelMuse. All Rights Reserved.</p>
            </div>
            <div className="quick-links text-center">
                <h2>Quick Links</h2>
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
                        <NavLink to="login">Sign-in</NavLink>
                    </li>
                </ul>                
            </div>
        </footer>
    )
}