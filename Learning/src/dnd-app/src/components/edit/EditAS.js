import { useState } from "react";
import { useParams } from "react-router-dom";

function EditAS(){
    
    const id = useParams();
    const [strength, setStrength] = useState("");
    const [dexterity, setDexterity] = useState("");
    const [constitution, setConstitution] = useState("");
    const [intelligence, setIntelligence] = useState("");
    const [wisdom, setWisdom] = useState("");
    const [charisma, setCharisma] = useState("");
    
    const handleStrengthChange = (evt) => {
        setStrength(evt.target.value)
    };

    const handleDexterityChange = (evt) => {
        setDexterity(evt.target.value)
    };

    const handleConstitutionChange = (evt) => {
        setConstitution(evt.target.value)
    };

    const handleIntelligenceChange = (evt) => {
        setIntelligence(evt.target.value)
    };

    const handleWisdomChange = (evt) => {
        setWisdom(evt.target.value)
    };

    const handleCharismaChange = (evt) => {
        setCharisma(evt.target.value)
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const updateScore = {
            id: id,
            strength: strength,
            dexterity: dexterity,
            constitution: constitution,
            intelligence: intelligence,
            wisdom: wisdom,
            charisma: charisma
        }

    }
    const start = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify
    };
    fetch(`http://localhost:8080/api/skill/update/${id}`, start)
        .then(response => {
            switch(response.status){
                case 204:
                    return null;
                case 400:
                    return response.json();
                default:
                    return Promise.reject("Something went wrong here");
            };
        })
        .catch(err => console.error(err));
}