import { Link } from "react-router-dom" //ignore for now

export function Homescreen() {
    // Copy and paste code starting from <main> to </main> from the index.html in "old-files". Debug as needed.
    // Note: It's fine that the cards don't go anywhere when you press open.

    return (
        <main>
            <section>
        <div className="intro-container">
            <div className="intro-content">
                <h1 className="intro-title">Ready to plan your next adventure?</h1>
                <a href="plan.html">
                    <p className="btn btn-primary" role="button">Plan with us.</p>
                </a>
            </div>
        </div>
        </section>
        <section>
            <div className="recommend-itinerary-container">
                <div className="container">
                    <h2 className="pt-5 text-center">Featured Itineraries</h2>
                    <div className="cards row d-flex flex-wrap">
                        <div className="col col-12 col-md-6 col-lg-3 d-flex justify-content-center">
                            <div className="card">
                                <img className="card-img-top" src="img/kyoto-3.jpg" alt="two girls walking in kyoto"/>
                                <div className="card-body">
                                    <h3 className="card-title">Dazzling Kyoto</h3>
                                    <p className="card-text">Known for it's beautiful shrines and culture, Kyoto has an abundance of places to offer. Explore shrines, city life and meet various others assist you in learning Japanese culture.</p>
                                    <a href="itinerary.html" className="btn btn-primary">Explore Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col col-12 col-md-6 col-lg-3 d-flex justify-content-center">
                            <div className="card">
                                <img className="card-img-top" src="img/seattle.jpg" alt="buildings of seattle"/>
                                <div className="card-body">
                                    <h3 className="card-title">Pacific Northwest Seattle</h3>
                                    <p className="card-text">Explore Seattle and all the wonders it has to offer. Take a hike and view picturesque views of Puget Sound, the Olympic Mountains, and Mount Ranier.</p>
                                    <a href="itinerary.html" className="btn btn-primary">Explore Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col col-12 col-md-6 col-lg-3 d-flex justify-content-center">
                            <div className="card">
                                <img className="card-img-top" src="img/machu.jpg" alt="ancient buildings in machu picchu"/>
                                <div className="card-body">
                                    <h3 className="card-title">Machu Picchu Exploration</h3>
                                    <p className="card-text">Explore a breathtaking and remote location high in the Andes Mountains of Peru. Approximately 2,430 meters above sea level, rediscover the lost city hidden behind the mountains.</p>
                                    <a href="itinerary.html" className="btn btn-primary">Explore Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col col-12 col-md-6 col-lg-3 d-flex justify-content-center">
                            <div className="card">
                                <img className="card-img-top" src="img/berlin.jpg" alt="freeway with buildings in the background of berlin"/>
                                <div className="card-body">
                                    <h3 className="card-title">Berlin Adventures</h3>
                                    <p className="card-text">Dive into significant historical events like the Cold War and the fall of the Berlin Wall. Let's not forget the amazing nightlife scenes with countless bars, clubs and music venues.</p>
                                    <a href="itinerary.html" className="btn btn-primary">Explore Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </main>
    )
}