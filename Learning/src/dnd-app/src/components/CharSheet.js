import { useNavigate, useParams } from 'react-router-dom';
import GetSkill, { getAS, getSkill } from "./GetSkill";
import Charinfo, { getChar } from "./CharInfo";
import BattleStat, { getBS } from "./BattleStat";
import Health, { getHealth } from "./Health";
import { editCharInfo } from './edit/EditCharInfo';
import { editAScore } from './edit/EditSkill';
import { editBStat } from './edit/EditBS';


function CharSheet(){
    const navigate = useNavigate();
    const {id: userID} = useParams();
    
    return(
        <>
        <div className="header">
            <div id="charsheet-btn">
                <button className="actionbutton" onClick={() => navigate(-1)}>Return</button>
                <button className="actionbutton" onClick={() => navigate(`/user/char/${userID}/levelup`)}>Level Up</button>
            </div>
            <h1 id="username">{userID}</h1>
            <Charinfo/>
        </div>
        <div className="stat-container">
            <GetSkill/>
            <Health/>
            <BattleStat/>
        </div>
        </>
    )
}
export default CharSheet;

export async function charSheetLoader({params}){
    const as = await getAS(params.id);
    const skill = await getSkill(as.asID);
    const health = await getHealth(params.id);
    const bs = await getBS(params.id);
    const charInfo = await getChar(params.id);
    console.log("test")
    return { as: as, skill: skill, health: health, bs: bs, charInfo: charInfo }
}

export async function charSheetAction({request, params}){
    let formData = await request.formData();
    const popup = formData.get("name");
    switch (popup){
        case "ci":
            const editCI = {
                userID: params.id,
                race: formData.get("race"),
                background: formData.get("background"),
                exp: formData.get("exp")
            };
            return await editCharInfo(editCI);
        case "as":
            const editAS = {
                strength: formData.get("strength"),
                dexterity: formData.get("dexterity"),
                constitution: formData.get("constitution"),
                intelligence: formData.get("intelligence"),
                wisdom: formData.get("wisdom"),
                charisma: formData.get("charisma"),
                userID: params.id
            };
            return await editAScore(editAS);
        case "bs":
            const editBS = {
                initiative: formData.get("initiative"),
                armor: formData.get("armor"),
                defense: formData.get("defense"),
                inspiration: formData.get("inspiration"),
                profBonus: formData.get("profBonus"),
                asSaveDC: formData.get("asSaveDC"),
                speed: formData.get("speed"),
                userID: formData.get("userID")
            }
            return await editBStat(editBS);
        default: //cancel action
            return null;
    }
    return null;
}