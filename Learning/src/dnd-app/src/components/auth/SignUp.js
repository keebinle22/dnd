import { Form, redirect, useActionData } from "react-router-dom";
import { url } from "../../App";

export default function SignUp(){
    let errors = useActionData();

    return(
        <>
        <div>
            <Form method="post">
                <div className="col-container form">
                    <div className="errormessage" hidden={!errors}>
                            <div>{errors?.userError && errors.userError}</div>
                            <div>{errors?.roleError && errors.roleError}</div>
                            <div>{errors?.passError && errors.passError}</div>
                            <div>{errors?.errors && errors.errors}</div>
                    </div>
                    <div className="form-container">
                        <label className="label-form">Username</label>
                        <input className="add-form" type="text" name="username"/>
                    </div>
                    <div className="form-container">
                        <label className="label-form">Role</label>
                        <input type="radio" id="roleChoice1" name="role" value="Player"/>
                        <label htmlFor="roleChoice1">Player</label>
                        <input type="radio" id="roleChoice2" name="role" value="DM" />
                        <label htmlFor="roleChoice2">DM</label>
                    </div>
                    <div className="form-container">
                        <label className="label-form">Password</label>
                        <input className="add-form" type="text" name="password"/>
                    </div>
                    <div className="form-container">
                        <label className="label-form">Retype Password</label>
                        <input className="add-form" type="text" name="confirmation"/>
                    </div>
                    <div className="add-action">
                        <button className="actionbutton" name="action" value="cancel">Cancel</button>
                        <button className="actionbutton" name="action" value="signup">Sign Up</button>
                    </div>
                </div>
            </Form>
        </div>
        </>
    )
}

export async function signupAction({request}){
    const errors = {};
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    console.log(updates.action);
    switch(updates.action){
        case "signup":
            if (!updates.username){
                errors.userError = "Username cannot be blank.";
            }
            if (!updates.role){
                errors.roleError = "Role cannot be blank.";
            }
            if (!updates.password) {
                errors.passError = "Password cannot be blank.";
            }
            if (updates.password !== updates.confirmation){
                errors.passError = "Password does not match.";
            }
            if (Object.keys(errors).length){
                console.log(errors)
                return errors;
            }
            const result = await signUp(updates);
            if (result){
                return result;
            }
            return redirect("/");
        case "cancel":
            return redirect("/");
        default:
            errors.error = "System Error.";
            return errors;
    }
}

async function signUp(user){
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    };
    const result = await fetch(`${url}/auth/signup`, init)
        .then(resp => {
            switch (resp.status) {
                case 200:
                    return null;
                case 401:
                    return resp.json()
                case 403:
                    return resp.json()
                default:
                    return Promise.reject("Something went wrong here");
            }
        })
        .catch(err => console.error(err));
    return result;
}