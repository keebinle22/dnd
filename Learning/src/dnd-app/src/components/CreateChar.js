import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function CreateChar(){
    const navigate = useNavigate();
    useEffect(() => {
        navigate("user");
    }, [])
    return(
        <>
        <Outlet/>
        
        </>
    )
}
export default CreateChar;