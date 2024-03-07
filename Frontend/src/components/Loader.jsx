import Spinner from "../assets/loader.svg";
export default function Loader() {
    return (
        <div className="loader">
            <object type="image/svg+xml" data={Spinner} className="icon">
                Your browser does not support SVG
            </object>
        </div>
    )
}