import { useState } from "react";
import { Form, useParams } from "react-router-dom";

function EditCharinfo({ ci, updateCI, closePopup}){
    const { id: userID } = useParams();
    const [classType, setClassType] = useState(ci.classType);
    const [level, setLevel] = useState(ci.level);
    const [race, setRace] = useState(ci.race);
    const [background, setBackground] = useState(ci.background);
    const [exp, setExp] = useState(ci.exp);
    const [error, setError] = useState();

    const handleClassTypeChange = (evt) => {
        setClassType(evt.target.value === undefined ? classType : evt.target.value)
    }
    const handleLevelChange = (evt) => {
        setLevel(evt.target.value === undefined ? level : evt.target.value)
    }
    const handleRaceChange = (evt) => {
        setRace(evt.target.value === undefined ? race : evt.target.value)
    }
    const handleBackgroundChange = (evt) => {
        setBackground(evt.target.value === undefined ? background : evt.target.value)
    }
    const handleExpChange = (evt) => {
        setExp(evt.target.value === undefined ? exp : evt.target.value)
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const editCI = {
            userID: userID,
            classType: (classType ? classType : ci.classType),
            level: level,
            race: (race ? race : ci.race),
            background: (background ? background : ci.background), 
            exp: (exp ? exp : ci.exp)
        };
        const start = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`
            },
            body: JSON.stringify(editCI)
        };
        await fetch(`${process.env.REACT_APP_URL}/charinfo/update/${userID}`, start)
            .then(response => {
                switch (response.status) {
                    case 204:
                        updateCI(editCI);
                        closePopup();
                        return null;
                    case 400:
                        response.json()
                        .then((result) => {console.log(result);setError(result)})
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
                    <div className="ci-error">{error.map((e,idx) =>
                    <div key={idx}>{e}</div>)}</div> 
                :
                    <></>}

                </div>
                {/* <div>
                    <label className="label-form">Class Type: </label>
                    <input type="text" className="ci-text" name="classType" value={classType} onChange={handleClassTypeChange}/>
                </div> */}
                {/* <div>
                    <label className="label-form">Level: </label>
                    <input type="number" className="ci-text" name="level" value={level} onChange={handleLevelChange} />
                </div> */}
                <div className="form-container">
                    <label className="label-form">Race: </label>
                    <input type="text" className="ci-text" name="race" value={race} onChange={handleRaceChange} />
                </div>
                <div className="form-container">
                    <label className="label-form">Background: </label>
                    <input type="text" className="ci-text" name="background" value={background} onChange={handleBackgroundChange} />
                </div>
                <div className="form-container">
                    <label className="label-form">Experience: </label>
                    <input type="number" className="ci-text" name="exp" value={exp} onChange={handleExpChange} />
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
export default EditCharinfo;