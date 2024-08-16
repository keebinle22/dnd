import { useState } from "react";
import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { getHealth } from "../Health";

function AddHealth(){
    const healthload = useLoaderData();
    const [health, setHealth] = useState(healthload === undefined ? 0 : healthload.maxHP);
    const navigate = useNavigate();
    const errors = useActionData();
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
                <div className="col-container form">
                    <div className="errormessage" id="health-error" hidden={!errors?.hp}>{errors?.hp && errors.hp}</div>
                    <div className="form-container">
                        <label className="label-form">Health (Roll 1d6)</label>
                        <input className="add-form" type="number" name="health" onChange={handleHealthChange} value={health}/>
                    </div>
                    <div className="add-action">
                        <button className="actionbutton" onClick={handlePrev}>Prev</button>
                        <button className="actionbutton" type="submit">Review</button>
                    </div>
                </div>
            </Form>
        </div>
        </>
    )
}
export default AddHealth;

export async function action({ request, params }) {
    const errors = {};
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    if (!updates.health){
        errors.hp = "Invalid HP value.";
        return errors;
    }
    if (updates.health < 1 || updates.health > 6){
        errors.hp = "HP is not in range of 1d6.";
        return errors;
    }
    const result = await updateHealth(params.userID, updates);
    console.log(updates);
    if (result){
        errors.result = result;
        return errors;
    }
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
    const result = fetch(`http://localhost:8080/health/update/${userID}`, start)
        .then(response => {
            switch (response.status) {
                case 204:
                    return null;
                case 400:
                    console.log("error")
                    return "400 error";
                default:
                    return Promise.reject("Something went wrong here");
            };
        })
        .catch(err => console.error(err));
    return result;
}