import { useNavigate, useRouteError } from "react-router-dom";

function ErrorPage(){
    const error = useRouteError();
    console.error(error);
    const navigate = useNavigate();
    return(
        <>
        <div className="errorpage-container">
            <h1 className="errorpage">Error</h1>
            <p className="errorpage">
                An unexpected error has occured :/
            </p>
            <button className="actionbutton" id="error-btn" onClick={() => navigate("/")}>Home</button>
        </div>
        </>
    )
}
export default ErrorPage;