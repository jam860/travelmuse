import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth";

export function Navbar(props) {
    function onSignOut() {
        signOut(getAuth())
        .catch((err) => {
            return <p>Something went wrong! Refresh your page to try again.</p>
        });
    }

    return (
        <header>
            <nav>
                <div className="nav-container">
                    <div className="logo" role="button">
                        <NavLink to="/"><img width="300" height="50" src="/img/logo.png" aria-label="TravelMuse logo" alt="TravelMuse logo" /></NavLink>
                    </div>
                    <div className="nav-links desktop-nav">
                        {!props.currentUser && 
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
                        }
                        {props.currentUser && 
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
                                <NavLink to="/" onClick={onSignOut}>Sign-Out</NavLink>
                            </li>
                        </ul>
                        }
                    </div>
                    {!props.currentUser && <nav className="hamburger-nav">
                        <Dropdown className="hamburger-menu">
                            <Dropdown.Toggle menuvariant="#FAB573">
                                <span className="material-icons icon-center">&#xE5D2;</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to="/">Home</Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="plan">Plan</Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="mytrips">Trips</Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="login">Sign-in</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </nav>}
                    {props.currentUser && <nav className="hamburger-nav">
                        <Dropdown className="hamburger-menu">
                            <Dropdown.Toggle menuvariant="#FAB573">
                                <span className="material-icons icon-center">&#xE5D2;</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to="/">Home</Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="plan">Plan</Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="mytrips">Trips</Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="/" onClick={onSignOut}>Sign-Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </nav>}
                </div>
            </nav>
        </header>
    )
}

