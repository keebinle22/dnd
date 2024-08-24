import { useState } from "react";
import { Form, useParams } from "react-router-dom";

function EditCharinfo({ci, handleCI, closePopup}){
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
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const updateCI = {
            userID: userID,
            classType: (classType ? classType : ci.classType),
            level: level,
            race: (race ? race : ci.race),
            background: (background ? background : ci.background), 
            exp: exp
        };
        const start = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`
            },
            body: JSON.stringify(updateCI)
        };
        fetch(`http://localhost:8080/charinfo/update/${userID}`, start)
            .then(response => {
                switch (response.status) {
                    case 204:
                        handleCI(updateCI);
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
        <div className="ci-popup popup">
            {error ? 
                <div className="ci-error">{error.map((e,idx) =>
                <div key={idx}>{e}</div>)}</div> 
            :
                <></>}
            <Form method="post">
                <div>
                    <span>Class Type: </span>
                    <input type="text" id="ci-text" name="classType" value={classType} onChange={handleClassTypeChange}/>
                </div>
                <div>
                    <span>Level: </span>
                    <input type="number" id="ci-text" name="level" value={level} onChange={handleLevelChange} />
                </div>
                <div>
                    <span>Race: </span>
                    <input type="text" id="ci-text" name="race" value={race} onChange={handleRaceChange} />
                </div>
                <div>
                    <span>Background: </span>
                    <input type="text" id="ci-text" name="background" value={background} onChange={handleBackgroundChange} />
                </div>
                <div>
                    <span>Experience: </span>
                    <input type="number" id="ci-text" name="exp" value={exp} onChange={handleExpChange} />
                </div>
                <button type="submit" name="submit" value="charinfo">Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </Form>
        </div>
        </>
    )
}
export default EditCharinfo;