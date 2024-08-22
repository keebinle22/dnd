import { useNavigate, useParams } from 'react-router-dom';
import GetSkill from "./GetSkill";
import Charinfo from "./CharInfo";
import BattleStat from "./BattleStat";
import Health from "./Health";

function CharSheet(){
    const navigate = useNavigate();
    const {id: userID} = useParams();
    
    return(
        <>
        <div className="header">
            <div id='actionbutton'>
                <button onClick={() => navigate(-1)}>Return</button>
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