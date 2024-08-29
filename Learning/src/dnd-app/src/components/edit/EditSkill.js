import { useState } from "react";
import { useParams } from "react-router-dom";

function EditSkill({as, setScore, closePopup}){
    const { id: userID } = useParams();

    const [strength, setStrength] = useState(as.strength);
    const [dexterity, setDexterity] = useState(as.dexterity);
    const [constitution, setConstitution] = useState(as.constitution);
    const [intelligence, setIntelligence] = useState(as.intelligence);
    const [wisdom, setWisdom] = useState(as.wisdom);
    const [charisma, setCharisma] = useState(as.charisma);
    const [error, setError] = useState();
    
    const handleStrengthChange = (evt) => {
        setStrength(evt.target.value === undefined ? strength : evt.target.value);
    };

    const handleDexterityChange = (evt) => {
        setDexterity(evt.target.value === undefined ? dexterity : evt.target.value);
    };

    const handleConstitutionChange = (evt) => {
        setConstitution(evt.target.value === undefined ? constitution : evt.target.value);
    };

    const handleIntelligenceChange = (evt) => {
        setIntelligence(evt.target.value === undefined ? intelligence : evt.target.value);
    };

    const handleWisdomChange = (evt) => {
        setWisdom(evt.target.value === undefined ? wisdom : evt.target.value);
    };

    const handleCharismaChange = (evt) => {
        setCharisma(evt.target.value === undefined ? charisma : evt.target.value);
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const updateAScore = {
            asID: as.asID,
            strength: strength,
            dexterity: dexterity,
            constitution: constitution,
            intelligence: intelligence,
            wisdom: wisdom,
            charisma: charisma,
            userID: userID
        }
        const start = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`
            },
            body: JSON.stringify(updateAScore)
        };
        await fetch(`${process.env.REACT_APP_URL}/abilityscore/user/${userID}`, start)
            .then(response => {
                switch (response.status) {
                    case 204:
                        setScore(updateAScore);
                        closePopup();
                        return null;
                    case 400:
                        response.json()
                        .then((result) => { setError(result) });
                        return null;
                    case 403: 
                        setError(["Invalid Login"])
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
    }
    return(
        <>
        <div className="popup">
            <form className="popup-form col-container">
                <div className="errormessage" hidden={!error}>
                    {error ? 
                        <div className="skill-error">{error.map((e,i) =>
                            <div key={i}>{e}</div>)}
                            </div>
                        :
                        <></>}
                </div>
                <div className="form-container">
                    <label className="label-form">Strength: </label>
                    <input type="number" className="as-text" value={strength} onChange={handleStrengthChange}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Dexterity: </label>
                    <input type="number" className="as-text" value={dexterity} onChange={handleDexterityChange}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Constitution: </label>
                    <input type="number" className="as-text" value={constitution} onChange={handleConstitutionChange}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Intelligence: </label>
                    <input type="number" className="as-text" value={intelligence} onChange={handleIntelligenceChange}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Wisdom: </label>
                    <input type="number" className="as-text" value={wisdom} onChange={handleWisdomChange}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Charisma: </label>
                    <input type="number" className="as-text" value={charisma} onChange={handleCharismaChange}></input>
                </div>
                <div className="add-action">
                    <button className="actionbutton" onClick={handleSubmit}>Submit</button>
                    <button className="actionbutton" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
        </>
    )
}
export default EditSkill;