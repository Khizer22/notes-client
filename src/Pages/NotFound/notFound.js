import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <p>PAGE NOT FOUND</p>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    )
}

export default NotFound;