import { NavLink } from "react-router-dom";

export function Footer(props) {
    return (
        <footer className="foot">
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
            <div className="travel-muse-info ">
                <div className="pb-3" role="button">
                    <NavLink to="/"><img width="225" height="38" src="/img/logo.png" aria-label="TravelMuse logo" alt="TravelMuse logo" /></NavLink>
                </div>
                <p>TravelMuse simplifies the process of planning trips, vacations, group meetings, and more. It also offers a convenient way for users to share and collaborate on their itineraries with others. </p>
                <p>&copy; 2023 TravelMuse. All Rights Reserved.</p>
            </div>
        </footer>
    )
}