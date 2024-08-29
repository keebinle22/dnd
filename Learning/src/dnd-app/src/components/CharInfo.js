import { useRef, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import EditCharinfo from "./edit/EditCharInfo";

function Charinfo(){
    const [charInfo, setCharInfo] = useState(useLoaderData().charInfo);
    const { id: userID } = useParams();

    const ref = useRef();
    const openPopup = () => ref.current.open();
    const closePopup = () => ref.current.close();

    return (
        <>
        <div className="charinfo-container">
            <button id="ci-edit-popup-btn" onClick={openPopup}>Edit</button>
            <div className="classType">
                <span>{charInfo.classType}</span>
                <label>Class</label>
            </div>
            <div className="level">
                <span>{charInfo.level}</span>
                <label>Level</label> 
            </div>
            <div className="race">
                <span>{charInfo.race}</span>
                <label>Race</label>
            </div>
            <div className="background">
                <span>{charInfo.background}</span>
                <label>Background</label>
            </div>
            <div className="exp">
                <span>{charInfo.exp}</span>
                <label>Experience</label>
            </div>
            <Popup ref={ref} closeOnDocumentClick={false} modal>
                <EditCharinfo ci={charInfo} updateCI={setCharInfo} closePopup={closePopup}/>
            </Popup>
        </div>
        </>
    )
}
export default Charinfo;

export async function getChar(userID){
    const init = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    };
    const result = await fetch(`${process.env.REACT_APP_URL}/charinfo/${userID}`, init)
        .then(response => {
            switch (response.status){
                case 200:
                    return response.json();
                case 404:
                    console.log("404 error getChar")
                    return null;
                default:
                    return Promise.reject("Something went wrong here");
            }     
        })
        .then(body => {
            return body;
        })
        .catch(err => console.error("asdfasdf" + err));
    return result;
}