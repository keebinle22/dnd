import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import EditHealth from "./edit/EditHealth";

function Health(){
    const [health, setHealth] = useState();
    const [error, setError] = useState(null);
    const {id: userID} = useParams();
    const ref = useRef();
    const getHealth = () => {
        const init = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        fetch(`http://localhost:8080/health/${userID}`, init)
        .then(response => {
            if (response.status === 200){
                return response.json();
            }
            return Promise.reject("Something went wrong here.");
        })
        .then(body => {
            setHealth(body);
        })
        .catch(err => {
            setError(err);
        });
    };
    useEffect(() => getHealth, []);
    const openPopup = () => ref.current.open();
    const closePopup = () => ref.current.close();
    const handleHealth = (val) => {
        setHealth(val);
    }
    return(
        <>
        {error ? (
            <div>Error: {error}</div>
        ) : (
            health ? (
                <>
                <div className="health-container">
                    <div className="hp-container">
                        <div className="health" id="maxHP-container">
                            <label>Max HP</label>
                            <span>{health.maxHP}</span>
                        </div>
                        <div className="health" id="curHP-container">
                            <label>Cur HP</label>
                            <span>{health.curHP}</span>
                        </div>
                        <div className="health" id="tempHP-container">
                            <label>Temp HP</label>
                            <span>{health.tempHP === 0 ? "-" : health.tempHP}</span>
                        </div>
                    </div>
                    <div className="hit-container">
                        <div className="totalHit-container">Total Hit Dice: {health.totalHitDice}</div>
                        <div className="curHit-container">Cur Hit Dice: {health.curHitDice}</div>
                    </div>
                    <div className="death-container">
                        <div className="successDeath-container">Success Death Saves: {health.successDeathSaves}</div>
                        <div className="failDeath-container">Fail Death Saves: {health.failDeathSaves}</div>
                    </div>
                    {/* <button onClick={openPopup}>Edit</button> */}
                    <Popup ref={ref} closeOnDocumentClick={false} modal>
                        <EditHealth health={health} handleHealth={handleHealth} closePopup={closePopup}/>
                    </Popup>
                </div>
                </>
            ) : (
            <div></div>
            ))}
        </>
    )
}
export default Health;

export async function getHealth(userID){
    const init = {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    };
    const result = await fetch(`http://localhost:8080/health/${userID}`, init)
        .then(response => {
            switch (response.status) {
                case 200:
                    return response.json();
                case 404:
                    console.log("404 error getHealth")
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