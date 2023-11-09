export function TripCard(props) {
    const itinerary = props.itinerary;
    return (
        <div className="col col-12 col-md-6 col-lg-3 d-flex justify-content-center">
        <div className="card">
            <img className="card-img-top" src={itinerary.image} alt="itinerary card title" />
            <div className="card-body">
                <h3 className="card-title">{itinerary.title}</h3>
                <p className="card-text">{"Stops: " + itinerary.firstStop + "..."}</p>
                <a href="itinerary" className="btn btn-primary">Open</a>
            </div>
        </div>
        </div>
    )
}
