import { useState } from "react";
import { useParams } from "react-router-dom";

function EditHealth({health, handleHealth, closePopup}){
    const {id: userID} = useParams();
    const [maxHP, setMaxHP] = useState(health.maxHP);
    const [curHP, setCurHP] = useState(health.curHP);
    const [tempHP, setTempHP] = useState(health.tempHP);
    const [totalHitDice, setTotalHitDice] = useState(health.totalHitDice);
    const [curHitDice, setCurHitDice] = useState(health.curHitDice);
    const [successDeathSave, setSuccessDeathSave] = useState(health.successDeathSaves);
    const [failDeathSave, setFailDeathSave] = useState(health.failDeathSaves);
    const [error, setError] = useState();
    
    const handleMaxHPChange = (evt) => {
        setMaxHP(evt.target.value === undefined ? maxHP : evt.target.value);
    }
    const handleCurHPChange = (evt) => {
        setCurHP(evt.target.value === undefined ? curHP : evt.target.value);
    }
    const handleTempHPChange = (evt) => {
        setTempHP(evt.target.value === undefined ? tempHP : evt.target.value);
    }
    const handleTotalHitDiceChange = (evt) => {
        setTotalHitDice(evt.target.value === undefined ? totalHitDice : evt.target.value);
    }
    const handleCurHitDiceChange = (evt) => {
        setCurHitDice(evt.target.value === undefined ? curHitDice : evt.target.value);
    }
    const handleSuccessDeathSaveChange = (evt) => {
        setSuccessDeathSave(evt.target.value === undefined ? successDeathSave : evt.target.value);
    }
    const handleFailDeathSaveChange = (evt) => {
        setFailDeathSave(evt.target.value === undefined ? failDeathSave : evt.target.value);
    }
    const handleSubmit = (evt) =>{
        evt.preventDefault();
        const updateHealth = {
            healthID: health.healthID,
            maxHP: maxHP,
            curHP: curHP,
            tempHP: tempHP,
            totalHitDice: totalHitDice,
            curHitDice: curHitDice,
            successDeathSaves: successDeathSave,
            failDeathSaves: failDeathSave,
            userID: userID
        };
        const start = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateHealth)
        };
        fetch(`http://localhost:8080/health/update/${userID}`, start)
            .then(response => {
                switch (response.status) {
                    case 204:
                        handleHealth(updateHealth)
                        closePopup();
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
    }
    const handleCancel = (evt) => {
        evt.preventDefault();
        closePopup();
    };
    return (
        <>
        <div className="health-popup">
            {error ?
                <div className="health-error">{error.map((e, idx) =>
                    <div key={idx}>{e}</div>)}</div>
                :
                <></>}
            <form>
                <div>
                    <span>Max HP: </span>
                        <input type="number" id="health-text" value={maxHP} onChange={handleMaxHPChange}></input>
                </div>
                <div>
                    <span>Cur HP: </span>
                        <input type="number" id="health-text" value={curHP} onChange={handleCurHPChange}></input>
                </div>
                <div>
                    <span>Temp HP: </span>
                        <input type="number" id="health-text" value={tempHP} onChange={handleTempHPChange}></input>
                </div>
                <div>
                    <span>Total Hit Dice: </span>
                        <input type="number" id="health-text" value={totalHitDice} onChange={handleTotalHitDiceChange}></input>
                </div>
                <div>
                    <span>Cur Hit Dice: </span>
                        <input type="number" id="health-text" value={curHitDice} onChange={handleCurHitDiceChange}></input>
                </div>
                <div>
                    <span>Success Death Saves: </span>
                        <input type="number" id="health-text" value={successDeathSave} onChange={handleSuccessDeathSaveChange}></input>
                </div>
                <div>
                    <span>Fail Death Saves: </span>
                        <input type="number" id="health-text" value={failDeathSave} onChange={handleFailDeathSaveChange}></input>
                </div>
                <button type="submit" onClick={handleSubmit}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
        </>
    )
}
export default EditHealth;