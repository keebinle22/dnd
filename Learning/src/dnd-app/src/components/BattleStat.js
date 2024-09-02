import { useEffect, useRef, useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import Popup from "reactjs-popup";
import EditBS from "./edit/EditBS";

function BattleStat(){
    const [error, setError] = useState(null);
    const bs = useLoaderData().bs;
    const ref = useRef();
    const openPopup = () => ref.current.open();
    const closePopup = () => ref.current.close();
    const fetcher = useFetcher({key: "charinfo"});
    useEffect(() => {
        if ((fetcher.state === "loading" && fetcher.data === null) || fetcher.data === "cancel") {
            closePopup();
        }
    }, [fetcher.state]);
    return(
        <>
        {error ? (
            <div>Error: {error}</div>
        ) : (
        bs ? (
            <>
            <div className="bs-container">
                <button id="bs-edit-popup-btn" onClick={openPopup}>Edit</button>
                <div className="initiative-container backdrop">
                    <label>Init</label>
                    <span>
                        {bs.initiative}
                    </span>
                </div>
                <div className="armor-container backdrop">
                    <label>Armor</label>
                    <span>{bs.armor}</span>
                </div>
                <div className="defense-container backdrop">
                    <label>Defense</label>
                    <span>{bs.defense}</span>
                </div>
                <div className="inspiration-container backdrop">
                    <label>Inspiration</label>
                    <span>{bs.inspiration}</span>
                </div>
                <div className="profbonus-container backdrop">
                    <label>Prof Bonus</label>
                    <span>{bs.profBonus}</span> 
                </div>
                <div className="assavedc-container backdrop">
                    <label>AS Save DC</label>
                    <span>{bs.asSaveDC}</span>
                </div>
                <div className="speed-container backdrop">
                    <label>Speed</label>
                    <span>{bs.speed}</span>
                </div>
                <Popup ref={ref} closeOnDocumentClick={false} modal>
                    <EditBS bs={bs} />
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
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(bs)
    };
    return fetch(`${process.env.REACT_APP_URL}/battlestat`, start)
        .then(response => {
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

export async function getBS(userID){
    const init = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    };
    const result = await fetch(`${process.env.REACT_APP_URL}/battlestat/${userID}`, init)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            return Promise.reject("Something went wrong here.");
        })

        .catch(err => {console.err(err)})
    return result;
};