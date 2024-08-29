import { useState } from "react";
import { Form, redirect, useActionData, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getChar } from "../CharInfo";

function AddCharInfo(){
    const char = useLoaderData();
    const {userID: userID} = useParams();
    const [name,setName] = useState(userID);
    const [classType, setClassType] = useState(char === undefined ? "" : char.classType);
    const [race, setRace] = useState(char === undefined ? "" : char.race);
    const [background, setBackground] = useState(char === undefined ? "" : char.background);
    const navigate = useNavigate();
    const errors = useActionData();

    const handleNameChange = (evt) => {
        setName(evt.target.value === undefined ? name : evt.target.value)
    }
    const handleRaceChange = (evt) => {
        setRace(evt.target.value === undefined ? race : evt.target.value)
    }
    const handleBackgroundChange = (evt) => {
        setBackground(evt.target.value === undefined ? background : evt.target.value)
    }
    const handleClassChange = (evt) => {
        setClassType(evt.target.value === undefined ? classType : evt.target.value)
    }
    const handlePrev = (evt) => {
        evt.preventDefault();
        navigate("/user/home");
    }
    return(
        <>
            <div>
                <Form method="put">
                    <div className="col-container form">
                        <div className="errormessage" id="user-error" hidden={!errors}>
                            <div>{errors?.user && errors.user}</div>
                            <div>{errors?.race && errors.race}</div>
                            <div>{errors?.background && errors.background}</div>
                            <div>{errors?.classType && errors.classType}</div>
                            <div>{errors?.result && errors.result}</div>
                        </div>
                        <div className="form-container">
                            <label className="label-form">Name</label>
                            <input className="add-form" type="text" name="userID" onChange={handleNameChange} value={name} readOnly />
                        </div>
                        <div className="form-container">
                            <label className="label-form">Race</label>
                            <select id="race-dropdown" name="race" defaultValue={race} onChange={handleRaceChange}>
                                <option value="">--Select--</option>
                                <option value="dragonborn">Dragonborn</option>
                                <option value="dwarf">Dwarf</option>
                                <option value="elf">Elf</option>
                                <option value="halforc">Half-Orc</option>
                                <option value="halfling">Halfling</option>
                                <option value="human">Human</option>
                                <option value="tiefling">Tiefling</option>
                            </select>
                        </div>
                        <div className="form-container">
                            <label className="label-form">Background</label>
                            <input className="add-form" type="text" name="background" onChange={handleBackgroundChange} value={background}/>
                        </div>
                        <div className="form-container">
                            <label className="label-form">Class</label>
                            <select id="classType-dropdown" name="classType" defaultValue={classType} onChange={handleClassChange}>
                                <option value="">--Select--</option>
                                <option value="barbarian" disabled>Barbarian</option>
                                <option value="bard" disabled>Bard</option>
                                <option value="cleric" disabled>Cleric</option>
                                <option value="druid" disabled>Druid</option>
                                <option value="fighter" disabled>Fighter</option>
                                <option value="monk" disabled>Monk</option>
                                <option value="paladin" disabled>Paladin</option>
                                <option value="ranger" disabled>Ranger</option>
                                <option value="rogue" disabled>Rogue</option>
                                <option value="sorcerer" disabled>Sorcerer</option>
                                <option value="warlock" disabled>Warlock</option>
                                <option value="wizard">Wizard</option>
                            </select>
                        </div>
                        <div className="add-action">
                            {/* <button className="actionbutton" onClick={handlePrev}>Prev</button> */}
                            <button className="actionbutton" type="submit">Next</button>
                        </div>
                    </div>
                </Form>
            </div>
            </>
    )
}
export default AddCharInfo;

export async function action({request, params}) {
    const errors = {};
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    if (!updates.userID) {
        errors.user = "User cannot be blank.";
    }
    if (!updates.race){
        errors.race = "Please select a race.";
    }
    if (!updates.background) {
        errors.background = "Background cannot be blank.";
    }
    if (!updates.classType) {
        errors.classType = "Please select a class.";
    }
    if (Object.keys(errors).length) {
        return errors;
    }
    const result = await updateChar(params.userID, updates);
    if (result){
        errors.result = result;
        return errors;
    }
    return redirect("/user/createchar/" + params.userID +"/scores");
}

export async function loader({params}){
    const charInfo = await getChar(params.userID);
    console.log('test')
    return charInfo;
}

export async function updateChar(userID, charInfo) {
    const char = {
        level: 0,
        exp: 0,
        ...charInfo
    }
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(char)
    };
    const result = await fetch(`http://localhost:8080/charinfo/update/${userID}`, init)
        .then(response => {
            switch (response.status) {
                case 204:
                    return null;
                    // return response.json();
                case 404:
                    console.log("updateChar error");
                    return response;
                case 409:
                    return "Mismatch. Editing username will be implemented later."
                default:
                    return Promise.reject("Something went wrong here");
            }
        })
        // .then(body => {
        //     return body;
        // })
        .catch(err => console.error(err));
    return result;
}