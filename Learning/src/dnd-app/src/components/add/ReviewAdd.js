import { Form, redirect, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getChar } from "../CharInfo";
import { getAS } from "../GetSkill";
import { getHealth } from "../Health";
import { addBS } from "../BattleStat";
import { useEffect } from "react";
import { updateHealth } from "./AddHealth";

function ReviewAdd(){
    const user = useLoaderData();
    const { userID: userID} = useParams();
    const navigate = useNavigate();
    const handlePrev = (evt) => {
        evt.preventDefault();
        navigate(-1);
    }
    
    const handleUpdateTables = async () => {
        const newHealth = {
            health: user.maxHP + modifier(user.constitution)
        }
        await updateHealth(userID, newHealth);
        const bs = {
            bsID: 0,
            initiative: 2,
            armor: 10, //to be updated when class type is implemented
            defense: "",
            inspiration: 0,
            profBonus: 2, //based on char level
            asSaveDC: 0,
            speed: "30 ft", //based on class type
            userID: userID
        }
        await addBS(bs);
    }

    return(
        <>
        <div>
            <div className="reviewchar-container">
                <h3>Info</h3>
                <span>Name: {user.userID}</span>
                <span>Race: {user.race}</span>
                <span>Background: {user.background}</span>
                <span>Class: {user.classType}</span>
            </div>
            <div className="reviewas-container">
                <h3>Ability Score</h3>
                <span>Strength: {user.strength}</span>
                <span>Dexterity: {user.dexterity}</span>
                <span>Constitution: {user.constitution}</span>
                <span>Intelligence: {user.intelligence}</span>
                <span>Wisdom: {user.wisdom}</span>
                <span>Charisma: {user.charisma}</span>
            </div>
            <div className="reviewhealth-container">
                <h3>Health</h3>
                <span>Max HP: {user.maxHP + modifier(user.constitution)}</span>
            </div>
            <button onClick={handlePrev}>Prev</button>
            <Form method="post">
                <button type="submit" onClick={handleUpdateTables}>Done</button>
            </Form>
        </div>
        </>
    )
}
export default ReviewAdd;

export async function loader({params}){
    const char = await getChar(params.userID)
    const skill = await getAS(params.userID);
    const health = await getHealth(params.userID);
    return {...char, ...skill, ...health}
}

export async function action({request, params}){
    // const result = await addBS(params.userID);
    // if (result === null){
        return redirect("/charinfo");
    // }
    // return null
}

function modifier(score){
    return Math.floor((score - 10)/2);
}
