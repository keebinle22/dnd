import { useState } from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { getHealth } from "../Health";

function AddHealth(){
    const healthload = useLoaderData();
    const [health, setHealth] = useState(healthload === undefined ? 0 : healthload.maxHP);
    const navigate = useNavigate();
    const handleHealthChange = (evt) => {
        setHealth(evt.target.value === undefined ? health : evt.target.value)
    }
    const handleNext = (evt) => {
        evt.preventDefault();
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
                    <span>Health (Roll 1d6): </span>
                    <input type="number" name="health" onChange={handleHealthChange} value={health}/>
                </div>
                <button onClick={handlePrev}>Prev</button>
                <button type="submit">Review</button>
            </Form>
        </div>
        </>
    )
}
export default AddHealth;

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateHealth(params.userID, updates);
    return redirect("/createchar/" + params.userID + "/review");
}

export async function loader({ params }) {
    const health = await getHealth(params.userID);
    return health;
}

export async function updateHealth(userID, hp) {
    const start = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            maxHP: hp.health,
            curHP: hp.health,
            tempHP: 0,
            totalHitDice: 0,
            curHitDice: 0,
            successDeathSaves: 0,
            failDeathSaves: 0,
            userID: userID
        })
    };
    fetch(`http://localhost:8080/health/update/${userID}`, start)
        .then(response => {
            switch (response.status) {
                case 204:
                    return null;
                case 400:
                    console.log("error")
                    return null;
                default:
                    return Promise.reject("Something went wrong here");
            };
        })
        .catch(err => console.error(err));
}