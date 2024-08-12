import {useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import EditSkill from "./edit/EditSkill";

function GetSkill(){
    const [as, setAS] = useState();
    const { id: userID } = useParams();
    const ref = useRef();
    const [strength, setStrength] = useState({});
    const [dexterity, setDexterity] = useState({});
    const [constitution, setConstitution] = useState({});
    const [intelligence, setIntelligence] = useState({});
    const [wisdom, setWisdom] = useState({});
    const [charisma, setCharisma] = useState({});
    const [skill, setSkill] = useState();
    const [error, setError] = useState(null);

    const setScore = (body) => {
        setAS(body);
        setStrength({ score: body.strength, mod: Modifier(body.strength) });
        setDexterity({ score: body.dexterity, mod: Modifier(body.dexterity) });
        setConstitution({ score: body.constitution, mod: Modifier(body.constitution) });
        setIntelligence({ score: body.intelligence, mod: Modifier(body.intelligence) });
        setWisdom({ score: body.wisdom, mod: Modifier(body.wisdom) });
        setCharisma({ score: body.charisma, mod: Modifier(body.charisma) });
    }
    const getSkill = (asID) => {
        const init = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        fetch(`http://localhost:8080/api/skill/${asID}`, init)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            return Promise.reject("Something went wrong here");
        })
        .then(body => {
            setSkill(body)
        })
        .catch(err => {
            setError(err);
            console.error(err);
        });
    };
    const getAS = () => {
        const init = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        fetch(`http://localhost:8080/abilityscore/user/${userID}`, init)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                return Promise.reject("Something went wrong here");
            })
            .then(body => {
                setScore(body);
                getSkill(body.asID);
            })
            .catch(err => {
                setError(err);
                console.error(err)
            });
    };
    const openPopup = () => ref.current.open();
    const closePopup = () => ref.current.close();
    // useEffect(() => getSkill, []);
    useEffect(() => getAS, []);
    const pos = "+";
    return(
        <>
        {error ? (
            <div>Error: {error}</div>
        ) : 
            as&&skill ? (
            <>
            <div className="left-container">
                <div className="score-container">
                    <div>
                        <div className="score-type">Strength</div>
                        <div className="score-mod">{strength.mod < 0 ? strength.mod : pos.concat(strength.mod)}</div>
                        <div className="score-num">{strength.score}</div>
                    </div>
                    <div>
                        <div className="score-type">Dexterity</div>
                        <div className="score-mod">{dexterity.mod < 0 ? dexterity.mod : pos.concat(dexterity.mod)}</div>
                        <div className="score-num">{dexterity.score}</div>
                    </div>
                    <div>
                        <div className="score-type">Constitution</div>
                        <div className="score-mod">{constitution.mod < 0 ? constitution.mod : pos.concat(constitution.mod)}</div>
                        <div className="score-num">{constitution.score}</div>
                    </div>
                    <div>
                        <div className="score-type">Intelligence</div>
                        <div className="score-mod">{intelligence.mod < 0 ? intelligence.mod : pos.concat(intelligence.mod)}</div>
                        <div className="score-num">{intelligence.score}</div>
                    </div>
                    <div>
                        <div className="score-type">Wisdom</div>
                        <div className="score-mod">{wisdom.mod < 0 ? wisdom.mod : pos.concat(wisdom.mod)}</div>
                        <div className="score-num">{wisdom.score}</div>
                    </div>
                    <div>
                        <div className="score-type">Charisma</div>
                        <div className="score-mod">{charisma.mod < 0 ? charisma.mod : pos.concat(charisma.mod)}</div>
                        <div className="score-num">{charisma.score}</div>
                    </div>
                </div>
                <div className="savingThrow-container">
                    <div className="strengthThrow" id="throws-row">
                        <div className="prof">
                            <span>Circle</span>
                        </div>
                        <div className="mod">{strength.mod < 0 ? strength.mod : pos.concat(strength.mod)}</div>
                        <div className="score">Strength</div>
                    </div>
                    <div className="dexterityThrow" id="throws-row">
                        <div className="prof">
                            <span>Circle</span>
                        </div>
                        <div className="mod">{dexterity.mod < 0 ? dexterity.mod : pos.concat(dexterity.mod)}</div>
                        <div className="score">Dexterity</div>
                    </div>
                    <div className="constitutionThrow" id="throws-row">
                        <div className="prof">
                            <span>Circle</span>
                        </div>
                        <div className="mod">{constitution.mod < 0 ? constitution.mod : pos.concat(constitution.mod)}</div>
                        <div className="score">Constitution</div>
                    </div>
                    <div className="intelligenceThrow" id="throws-row">
                        <div className="prof">
                            <span>Circle</span>
                        </div>
                        <div className="mod">{intelligence.mod < 0 ? intelligence.mod : pos.concat(intelligence.mod)}</div>
                        <div className="score">Intelligence</div>
                    </div>
                    <div className="wisdomThrow" id="throws-row">
                        <div className="prof">
                            <span>Circle</span>
                        </div>
                        <div className="mod">{wisdom.mod < 0 ? wisdom.mod : pos.concat(wisdom.mod)}</div>
                        <div className="score">Wisdom</div>
                    </div>
                    <div className="charismaThrow" id="throws-row">
                        <div className="prof">
                            <span>Circle</span>
                        </div>
                        <div className="mod">{charisma.mod < 0 ? charisma.mod : pos.concat(charisma.mod)}</div>
                        <div className="score">Charisma</div>
                    </div>
                </div>
                <div className="skill-container">
                    <div className="skillGrid-head" id="skillGrid-row">
                        <div className="prof">PROF</div>
                        <div className="mod">MOD</div>
                        <div className="skill">SKILL</div>
                        <div className="bonus">BONUS</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">DEX</div>
                        <div className="skill">Acrobatics</div>
                        <div className="bonus">{skill.acrobatics < 0 ? skill.acrobatics : pos.concat(skill.acrobatics)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">WIS</div>
                        <div className="skill">Animal Handling</div>
                        <div className="bonus">{skill.animalHandling < 0 ? skill.animalHandling : pos.concat(skill.animalHandling)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">INT</div>
                        <div className="skill">Arcana</div>
                        <div className="bonus">{skill.arcana < 0 ? skill.arcana : pos.concat(skill.arcana)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">STR</div>
                        <div className="skill">Athletics</div>
                        <div className="bonus">{skill.athletics < 0 ? skill.athletics : pos.concat(skill.athletics)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">CHA</div>
                        <div className="skill">Deception</div>
                        <div className="bonus">{skill.deception < 0 ? skill.deception : pos.concat(skill.deception)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">INT</div>
                        <div className="skill">History</div>
                        <div className="bonus">{skill.history < 0 ? skill.history : pos.concat(skill.history)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">WIS</div>
                        <div className="skill">Insight</div>
                        <div className="bonus">{skill.insight < 0 ? skill.insight : pos.concat(skill.insight)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">CHA</div>
                        <div className="skill">Intimidation</div>
                        <div className="bonus">{skill.intimidation < 0 ? skill.intimidation : pos.concat(skill.intimidation)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">INT</div>
                        <div className="skill">Investigation</div>
                        <div className="bonus">{skill.investigation < 0 ? skill.investigation : pos.concat(skill.investigation)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">WIS</div>
                        <div className="skill">Medicine</div>
                        <div className="bonus">{skill.medicine < 0 ? skill.medicine : pos.concat(skill.medicine)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">INT</div>
                        <div className="skill">Nature</div>
                        <div className="bonus">{skill.nature < 0 ? skill.nature : pos.concat(skill.nature)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">WIS</div>
                        <div className="skill">Perception</div>
                        <div className="bonus">{skill.perception < 0 ? skill.perception : pos.concat(skill.perception)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">CHA</div>
                        <div className="skill">Performance</div>
                        <div className="bonus">{skill.performance < 0 ? skill.performance : pos.concat(skill.performance)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">CHA</div>
                        <div className="skill">Persuasion</div>
                        <div className="bonus">{skill.persuasion < 0 ? skill.persuasion : pos.concat(skill.persuasion)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">INT</div>
                        <div className="skill">Religion</div>
                        <div className="bonus">{skill.religion < 0 ? skill.religion : pos.concat(skill.religion)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">DEX</div>
                        <div className="skill">Sleight of Hand</div>
                        <div className="bonus">{skill.sleightOfHand < 0 ? skill.sleightOfHand : pos.concat(skill.sleightOfHand)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">DEX</div>
                        <div className="skill">Stealth</div>
                        <div className="bonus">{skill.stealth < 0 ? skill.stealth : pos.concat(skill.stealth)}</div>
                    </div>
                    <div id="skillGrid-row">
                        <div className="prof"><span>Circle</span></div>
                        <div className="mod">WIS</div>
                        <div className="skill">Survival</div>
                        <div className="bonus">{skill.survival < 0 ? skill.survival : pos.concat(skill.survival)}</div>
                    </div>
                </div>
                <button onClick={openPopup}>Edit</button>
                <Popup ref={ref} closeOnDocumentClick={false} modal>
                    <EditSkill as={as} setScore={setScore} closePopup={closePopup} getSkill={getSkill}/>
                </Popup>
            </div>
            </>
        ) : (
        <div>asd</div>
        )
        }
        </>
    )
}
export default GetSkill;

function Modifier(value) {
    let mod = Math.floor((value - 10) / 2);
    return mod;
}

export function getAS(userID){
    const init = {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    };
    const result = fetch(`http://localhost:8080/abilityscore/user/${userID}`, init)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            return Promise.reject("Something went wrong here");
        })
        .then(body => {
            return body;
        })
        .catch(err => console.error(err));
    return result;
};
