import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import EditBS from "./edit/EditBS";

function BattleStat(){
    const [error, setError] = useState(null);
    const [bs, setBS] = useState();
    const {id: userID} = useParams();
    const ref = useRef();
    const openPopup = () => ref.current.open();
    const closePopup = () => ref.current.close();
    const handleBS = (bs) => {
        setBS(bs);
    }
    const getBS = () => {
        const init = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        fetch(`http://localhost:8080/battlestat/${userID}`, init)
        .then(response => {
            if (response.status === 200){
                return response.json();
            }
            return Promise.reject("Something went wrong here.");
        })
        .then(body => {
            setBS(body);
            console.log(body);
        })
        .catch(err => {
            setError(err);
        })
    };
    useEffect(() => getBS, []);
    return(
        <>
        {error ? (
            <div>Error: {error}</div>
        ) : (
        bs ? (
            <>
            <div className="bs-container">
                <div className="initiative-container">Init: {bs.initiative}</div>
                <div className="armor-container">Armor: {bs.armor}</div>
                <div className="defense-container">Defense: {bs.defense}</div>
                <div className="inspiration-container">Insp: {bs.inspiration}</div>
                <div className="profbonus-container">Prof Bonus: {bs.profBonus}</div>
                <div className="assavedc-container">AS Save DC: {bs.asSaveDC}</div>
                <div className="speed-container">Speed: {bs.speed}</div>
                <button onClick={openPopup}>Edit</button>
                <Popup ref={ref} closeOnDocumentClick={false} modal>
                    <EditBS bs={bs} editBS={handleBS} closePop={closePopup} />
                </Popup>
            </div>
            </>
        ) :
        <div></div>
        )}
        </>
    )
}
export default BattleStat;

export async function addBS(bs){
    const start = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bs)
    };
    return fetch("http://localhost:8080/battlestat", start)
        .then(response => {
            console.log(response.status);
            switch (response.status) {
                case 201:
                    return null;
                case 404:
                    console.log("NO")
                    return 1;
                default:
                    console.log("default")
                    return Promise.reject("Something went wrong here");
            };
        })
        .catch(err => console.error(err));
}