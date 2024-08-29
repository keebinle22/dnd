import { useNavigate, useParams } from 'react-router-dom';
import GetSkill, { getAS, getSkill } from "./GetSkill";
import Charinfo, { getChar } from "./CharInfo";
import BattleStat, { getBS } from "./BattleStat";
import Health, { getHealth } from "./Health";


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
    console.log(charInfo);
    console.log({as: as, skill: skill, health: health, bs: bs, charInfo: charInfo})
    return { as: as, skill: skill, health: health, bs: bs, charInfo: charInfo }
}

export async function charSheetAction({request}){
    return null;
}