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
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`

            },
            body: JSON.stringify(updateBS)
        };
        fetch(`${process.env.REACT_APP_URL}/battlestat/update/${userID}`, start)
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
                    case 403:
                        setError(["Invalid Login"])
                    default:
                        return Promise.reject("Something went wrong here");
                };
            })
            .catch(err => console.error(err));
        
    };
    const handleCancel = (evt) => {
        evt.preventDefault();
        closePop();
    };
    return(
        <>
        <div className="popup">
            <form className="popup-form col-container">
                <div className="errormessage" hidden={!error}>
                    {error ?
                        <div className="bs-error">{error.map((e, idx) =>
                            <div key={idx}>{e}</div>)}</div>
                        :
                        <></>}
                </div>
                <div className="form-container">
                    <label className="label-form">Initiative: </label>
                    <input className="bs-input" type="number" onChange={handleInitiativeChange} value={initiative}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Armor: </label>
                    <input className="bs-input" type="number" onChange={handleArmorChange} value={armor}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Defense: </label>
                    <input className="bs-input" type="textarea" onChange={handleDefenseChange} value={defense}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Inspiration: </label>
                    <input className="bs-input" type="number" onChange={handleInspirationChange} value={inspiration}></input>
                    </div>
                <div className="form-container">
                    <label className="label-form">Prof Bonus: </label>
                    <input className="bs-input" type="number" onChange={handleProfBonusChange} value={profBonus}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Ability Score Saving DC: </label>
                    <input className="bs-input" type="number" onChange={handleAsSaveDCChange} value={asSaveDC}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Speed: </label>
                    <input className="bs-input" type="textarea" onChange={handleSpeedChange} value={speed}></input>
                </div>
                <div className="add-action">
                    <button className="actionbutton" type="submit" onClick={handleSubmit}>Save</button>
                    <button className="actionbutton" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
        </>
    )
}
export default EditBS;