import { useState } from "react";
import { Form, redirect, useActionData, useFetcher, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getChar } from "../CharInfo";

function AddCharInfo(){
    const fetcher = useFetcher({ key: "charinfo"});
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
        navigate("/home");
    }
    return(
        <>
            <div>
                <fetcher.Form method="post">
                    <div>
                        <span>Name: </span>
                        <input className="create-input" type="text" name="userID" onChange={handleNameChange} value={name}/>
                    </div>
                    <div>
                        <span>Race: </span>
                        <select id="race" name="race" defaultValue={race} onChange={handleRaceChange}>
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
                    <div>
                        <span>Background: </span>
                        <input className="create-input" type="text" name="background" onChange={handleBackgroundChange} value={background}/>
                    </div>
                    <div>
                        <span>Class: </span>
                        <select id="classType" name="classType" defaultValue={classType} onChange={handleClassChange}>
                            <option>--Select--</option>
                            <option value="barbarian">Barbarian</option>
                            <option value="bard">Bard</option>
                            <option value="cleric">Cleric</option>
                            <option value="druid">Druid</option>
                            <option value="fighter">Fighter</option>
                            <option value="monk">Monk</option>
                            <option value="paladin">Paladin</option>
                            <option value="ranger">Ranger</option>
                            <option value="rogue">Rogue</option>
                            <option value="sorcerer">Sorcerer</option>
                            <option value="warlock">Warlock</option>
                            <option value="wizard">Wizard</option>
                        </select>
                    </div>
                    <button onClick={handlePrev}>Prev</button>
                    <button type="submit">Next</button>
                </fetcher.Form>
            </div>
            </>
    )
}
export default AddCharInfo;

export async function action({request, params}) {
    const errors = [];
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateChar(params.userID, updates);
    return redirect("/createchar/" + params.userID +"/scores");
}

export async function loader({params}){
    const charInfo = await getChar(params.userID);
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
            "Content-Type": "application/json"
        },
        body: JSON.stringify(char)
    };
    await fetch(`http://localhost:8080/charinfo/update/${userID}`, init)
        .then(response => {
            switch (response.status) {
                case 204:
                    break;
                    // return response.json();
                case 404:
                    console.log("updateChar error");
                    return null;
                default:
                    return Promise.reject("Something went wrong here");
            }
        })
        // .then(body => {
        //     return body;
        // })
        .catch(err => console.error(err));
}