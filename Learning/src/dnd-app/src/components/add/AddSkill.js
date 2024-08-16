import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { getAS } from "../GetSkill";

function AddSkill(){
    const as = useLoaderData();
    const [strength, setStrength] = useState(as === undefined ? 0 : as.strength);
    const [dexterity, setDexterity] = useState(as === undefined ? 0 : as.dexterity);
    const [constitution, setConstitution] = useState(as === undefined ? 0 : as.constitution);
    const [intelligence, setIntelligence] = useState(as === undefined ? 0 : as.intelligence);
    const [wisdom, setWisdom] = useState(as === undefined ? 0 : as.wisdom);
    const [charisma, setCharisma] = useState(as === undefined ? 0 : as.charisma);
    const navigate = useNavigate();
    const errors = useActionData();
    const fetcher = useFetcher({key: "as"});

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
    const handleNext = (evt) => {
        evt.preventDefault();
        const score = {
            strength: strength,
            dexterity: dexterity,
            constitution: constitution,
            intelligence: intelligence,
            wisdom: wisdom,
            charisma: charisma
        }
        navigate("/createchar/health");
    }
    const handlePrev = (evt) => {
        evt.preventDefault();
        navigate(-1);
    }
    return(
        <>
        <div>
            <Form method="post">
                <div className="col-container form">
                    <div className="errormessage" id="as-error" hidden={!errors}>{errors}</div>
                    <div className="form-container">
                        <span>Rollie the dice</span>
                    </div>
                    <div className="form-container">
                        <label className="label-form">Strength</label>
                        <input className="add-form" type="number" name="strength" onChange={handleStrengthChange} value={strength}/>
                    </div>
                    <div className="form-container">
                        <label className="label-form">Dexterity</label>
                        <input className="add-form" type="number" name="dexterity" onChange={handleDexterityChange} value={dexterity} />
                    </div>
                    <div className="form-container">
                        <label className="label-form">Constitution</label>
                        <input className="add-form" type="number" name="constitution" onChange={handleConstitutionChange} value={constitution} />
                    </div>
                    <div className="form-container">
                        <label className="label-form">Intelligence</label>
                        <input className="add-form" type="number" name="intelligence" onChange={handleIntelligenceChange} value={intelligence} />
                    </div>
                    <div className="form-container">
                        <label className="label-form">Wisdom</label>
                        <input className="add-form" type="number" name="wisdom" onChange={handleWisdomChange} value={wisdom} />
                    </div>
                    <div className="form-container">
                        <label className="label-form">Charisma</label>
                        <input className="add-form" type="number" name="charisma" onChange={handleCharismaChange} value={charisma} />
                    </div>
                    <div className="add-action">
                        <button className="actionbutton" onClick={handlePrev}>Prev</button>
                        <button className="actionbutton" type="submit">Next</button>
                    </div>
                </div>
            </Form>
        </div>
        </>
    )
}
export default AddSkill;

export async function action({request, params}){
    const errors = [];
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    // if (updates.strength){errors.str = "Strength cannot be blank."}
    // if (updates.dexterity) { errors.dex = "Dexterity cannot be blank." }
    // if (updates.constitution) { errors.con = "Constitution cannot be blank." }
    // if (updates.intelligence) { errors.int = "Intelligence cannot be blank." }
    // if (updates.wisdom) { errors.wis = "Wisdom cannot be blank." }
    // if (updates.charisma) { errors.cha = "Charisma cannot be blank." }
    const keys = Object.keys(updates);
    const values = Object.values(updates)
    for (let i = 0; i < values.length; i++) {
        if (!values[i]) { 
            errors.push(capital(`${keys[i]} cannot be blank.`));
        }
        if (values[i] > 20 || values[i] < 0){
            errors.push(capital(`${keys[i]} must be between 0 and 20.`))
        }
    }
    if (errors.length){
        return errors;
    }
    const result = await updateSkill(params.userID, updates);
    if (result){
        errors.push(result);
    }
    return redirect("/createchar/" + params.userID + "/health");
}

export async function loader({params}){
    const skill = await getAS(params.userID);
    return skill;
}
export async function updateSkill(userID, skill){
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userID: userID, ...skill})
    };
    await fetch(`http://localhost:8080/abilityscore/user/${userID}`, init)
        .then(response => {
            switch (response.status) {
                case 204:
                    break;
                    // return response.json();
                case 404:
                    console.log("updateSkill error");
                    return null;
                default:
                    return Promise.reject("Something went wrong here");
            }
        })
        .catch(err => console.error("message: " + err));
}

function capital(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}