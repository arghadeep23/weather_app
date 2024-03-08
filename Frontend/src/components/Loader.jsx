import Spinner from "../assets/loader.svg";
export default function Loader() {
    // Loader component to be shown when the forecast is being fetched
    return (
        <div className="loader">
            <object type="image/svg+xml" data={Spinner} className="icon">
                Your browser does not support SVG
            </object>
        </div>
    )
}