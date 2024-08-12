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
        <div>
            <button onClick={() => navigate('/home')}>Return</button>
        </div>
        <div className="header">
            <h1>{userID}</h1>
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