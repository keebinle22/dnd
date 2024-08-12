import { useEffect, useState } from "react";
import { Form, redirect, useFetcher, useLoaderData, useNavigate } from "react-router-dom";
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
    const fetcher = useFetcher({key: "charinfo"});

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
        console.log(score);
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
                <div>
                    <span>Rollie the dice</span>
                </div>
                <div>
                    <span>Strength: </span>
                    <input type="number" name="strength" onChange={handleStrengthChange} value={strength}/>
                </div>
                <div>
                    <span>Dexterity: </span>
                    <input type="number" name="dexterity" onChange={handleDexterityChange} value={dexterity} />
                </div>
                <div>
                    <span>Constitution: </span>
                    <input type="number" name="constitution" onChange={handleConstitutionChange} value={constitution} />
                </div>
                <div>
                    <span>Intelligence: </span>
                    <input type="number" name="intelligence" onChange={handleIntelligenceChange} value={intelligence} />
                </div>
                <div>
                    <span>Wisdom: </span>
                    <input type="number" name="wisdom" onChange={handleWisdomChange} value={wisdom} />
                </div>
                <div>
                    <span>Charisma: </span>
                    <input type="number" name="charisma" onChange={handleCharismaChange} value={charisma} />
                </div>
                <button onClick={handlePrev}>Prev</button>
                <button type="submit">Next</button>
            </Form>
        </div>
        </>
    )
}
export default AddSkill;

export async function action({request, params}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateSkill(params.userID, updates);
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