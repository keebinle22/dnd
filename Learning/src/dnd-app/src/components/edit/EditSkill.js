import { useState } from "react";
import { useParams } from "react-router-dom";

function EditSkill({as, setScore, closePopup, getSkill}){
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

    const handleSubmit = (evt) => {
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
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateAScore)
        };
        fetch(`http://localhost:8080/api/abilityscore/user/${userID}`, start)
            .then(response => {
                switch (response.status) {
                    case 204:
                        setScore(updateAScore);
                        getSkill(updateAScore.asID);
                        closePopup();
                        return null;
                    case 400:
                        response.json()
                        .then((result) => { setError(result) });
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
        <div className="skill-popup">
            {error ? 
                <div className="skill-error">{error.map((e,i) =>
                    <div key={i}>{e}</div>)}
                    </div>
                :
                <></>}
            <form>
                <div>
                    <span>Strength: </span>
                    <input type="number" id="asText" value={strength} onChange={handleStrengthChange}></input>
                </div>
                <div>
                    <span>Dexterity: </span>
                    <input type="number" id="asText" value={dexterity} onChange={handleDexterityChange}></input>
                </div>
                <div>
                    <span>Constitution: </span>
                    <input type="number" id="asText" value={constitution} onChange={handleConstitutionChange}></input>
                </div>
                <div>
                    <span>Intelligence: </span>
                    <input type="number" id="asText" value={intelligence} onChange={handleIntelligenceChange}></input>
                </div>
                <div>
                    <span>Wisdom: </span>
                    <input type="number" id="asText" value={wisdom} onChange={handleWisdomChange}></input>
                </div>
                <div>
                    <span>Charisma: </span>
                    <input type="number" id="asText" value={charisma} onChange={handleCharismaChange}></input>
                </div>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
        </>
    )
}
export default EditSkill;