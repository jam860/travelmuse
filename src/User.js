import { Link } from "react-router-dom" //ignore for now
import { Outlet } from "react-router-dom"

export function User() {
    return (
        <div>
            <h1>Welcome back User! Let's take a look at some of your itineraries.</h1>
            <Outlet />
        </div>
    )
}