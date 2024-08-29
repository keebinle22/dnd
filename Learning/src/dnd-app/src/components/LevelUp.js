import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getChar } from "./CharInfo";
import { getClass } from "./ClassType";
import { getAS, Modifier } from "./GetSkill";
import { getHealth } from "./Health";
import { useState } from "react";

export default function LevelUp(){
    const { id: userID } = useParams();
    const char = useLoaderData();
    const [newHealth, setNewHealth] = useState(0);
    const [error, setError] = useState();
    const navigate = useNavigate();

    console.log(char);
    console.log(error)

    const levelTo = `Level ${char.charInfo.level} =\> ${char.charInfo.level+1} `
    const handleNewHealthChange = (evt) => {
        setNewHealth(evt.target.value === undefined ? newHealth : evt.target.value);
    }
    const handleNext = async (evt) => {
        evt.preventDefault();
        if (newHealth < 1 || newHealth > 6){
            setError([`Health must be in ${char.classType.hitDice} range.`]);
            return null;
        }
        const body = {
            ci: {
                userID: userID,
                classType: char.charInfo.classType,
                level: char.charInfo.level + 1,
                race: char.charInfo.race,
                background: char.charInfo.background,
                exp: char.charInfo.exp
            },
            health: {
                maxHP: parseInt(char.health.maxHP) + parseInt(newHealth) + Modifier(char.as.constitution),
                curHP: parseInt(char.health.curHP) + parseInt(newHealth) + Modifier(char.as.constitution),
                totalHitDice: char.health.totalHitDice + 1,
                userID: userID
            }
        }
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        };
        const result = await fetch(`${process.env.REACT_APP_URL}/charinfo/levelup/${userID}`, init)
            .then(response => {
                switch (response.status) {
                    case 204:
                        navigate(-1);
                        return null;
                    case 400:
                        console.log(response)
                        setError(response);
                        return null;
                    default:
                        setError(response.json());
                        return Promise.reject("Something went wrong here");
                };
            })
            .catch(err => console.error(err));   
    }
    return(
        <>
        <div>
            <h2>Level Up</h2>
            <div className="errormessage" hidden={!error}>
                {error ?
                    <div>{error.map((e, i) =>
                        <div key={i}>{e}</div>)}
                    </div>
                    :
                    <></>}
            </div>
            <span>{levelTo}</span>
            <div>
                <label>Health</label>
                <div>Roll a {char.classType.hitDice}</div>
                <input type="number" onChange={handleNewHealthChange}/>
                <button className="actionbutton" onClick={handleNext}>Next</button>
            </div>
        </div>
        </>
    )
}

export async function levelupLoader({ params }) {
    const as = await getAS(params.id);
    const health = await getHealth(params.id);
    const charInfo = await getChar(params.id);
    const classType = await getClass(params.id);
    return { as: as, health: health, charInfo: charInfo, classType: classType }
}