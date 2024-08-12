import { useState } from "react";
import { useParams } from "react-router-dom";

function EditBS({ bs, editBS, closePop }){
    const { id: userID } = useParams();
    const [initiative, setInitiative] = useState(bs.initiative);
    const [armor, setArmor] = useState(bs.armor);
    const [defense, setDefense] = useState(bs.defense === null ? "" : bs.defense);
    const [inspiration, setInspiration] = useState(bs.inspiration);
    const [profBonus, setProfBonus] = useState(bs.profBonus);
    const [asSaveDC, setAsSaveDC] = useState(bs.asSaveDC);
    const [speed, setSpeed] = useState(bs.speed === null ? "" : bs.speed);
    const [error, setError] = useState();

    const handleInitiativeChange = (evt) => {
        setInitiative(evt.target.value === undefined ? initiative : evt.target.value);
    };
    const handleArmorChange = (evt) => {
        setArmor(evt.target.value === undefined ? armor : evt.target.value);
    };
    const handleDefenseChange = (evt) => {
        setDefense(evt.target.value === undefined ? defense : evt.target.value);
    };
    const handleInspirationChange = (evt) => {
        setInspiration(evt.target.value === undefined ? inspiration : evt.target.value);
    };
    const handleProfBonusChange = (evt) => {
        setProfBonus(evt.target.value === undefined ? profBonus : evt.target.value);
    };
    const handleAsSaveDCChange = (evt) => {
        setAsSaveDC(evt.target.value === undefined ? asSaveDC : evt.target.value);
    };
    const handleSpeedChange = (evt) => {
        setSpeed(evt.target.value === undefined ? speed : evt.target.value);
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const updateBS = {
            bsID: bs.bsID,
            initiative: initiative,
            armor: armor,
            defense: (defense ? defense : bs.defense),
            inspiration: inspiration,
            profBonus: profBonus,
            asSaveDC: asSaveDC,
            speed: (speed ? speed : bs.speed),
            userID: userID
        }
        const start = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateBS)
        };
        fetch(`http://localhost:8080/battlestat/update/${userID}`, start)
            .then(response => {
                switch (response.status) {
                    case 204:
                        editBS(updateBS)
                        closePop();
                        return null;
                    case 400:
                        response.json()
                        .then((result) => { console.log(result); setError(result) })
                        return null;
                    default:
                        return Promise.reject("Something went wrong here");
                };
            })
            .catch(err => console.error(err));
        
    };
    const handleCancel = () => {
        console.log(bs);
        closePop();
    };
    return(
        <>
        <div className="bs-popup">
            {error ?
                <div className="bs-error">{error.map((e, idx) =>
                    <div key={idx}>{e}</div>)}</div>
                :
                <></>}
            <div>
                <span>Initiative: </span>
                <input className="bs-input" id="" type="number" onChange={handleInitiativeChange} value={initiative}></input>
            </div>
            <div>
                <span>Armor: </span>
                <input className="bs-input" id="" type="number" onChange={handleArmorChange} value={armor}></input>
            </div>
            <div>
                <span>Defense: </span>
                <input className="bs-input" id="" type="textarea" onChange={handleDefenseChange} value={defense}></input>
            </div>
            <div>
                <span>Inspiration: </span>
                <input className="bs-input" id="" type="number" onChange={handleInspirationChange} value={inspiration}></input>
                </div>
            <div>
                <span>Prof Bonus: </span>
                <input className="bs-input" id="" type="number" onChange={handleProfBonusChange} value={profBonus}></input>
            </div>
            <div>
                <span>Ability Score Saving DC: </span>
                <input className="bs-input" id="" type="number" onChange={handleAsSaveDCChange} value={asSaveDC}></input>
            </div>
            <div>
                <span>Speed: </span>
                <input className="bs-input" id="" type="textarea" onChange={handleSpeedChange} value={speed}></input>
            </div>
            <button type="submit" onClick={handleSubmit}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
        </>
    )
}
export default EditBS;