import { useFetcher } from "react-router-dom";

function EditSkill({as}){
    const fetcher = useFetcher({key: "charinfo"});
    return(
        <>
        <div className="popup">
            <fetcher.Form method="put" className="popup-form">
                <div className="errormessage" hidden={!fetcher.data}>
                    {fetcher.data ? 
                        <div className="skill-error">{fetcher.data.map((e,i) =>
                            <div key={i}>{e}</div>)}
                            </div>
                        :
                        <></>}
                </div>
                <div className="form-container">
                    <label className="label-form">Strength: </label>
                    <input type="number" className="as-text" name="strength" defaultValue={as.strength}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Dexterity: </label>
                    <input type="number" className="as-text" name="dexterity" defaultValue={as.dexterity}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Constitution: </label>
                    <input type="number" className="as-text" name="constitution" defaultValue={as.constitution}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Intelligence: </label>
                    <input type="number" className="as-text" name="intelligence" defaultValue={as.intelligence}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Wisdom: </label>
                    <input type="number" className="as-text" name="wisdom" defaultValue={as.wisdom}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Charisma: </label>
                    <input type="number" className="as-text" name="charisma" defaultValue={as.charisma}></input>
                </div>
                <div className="add-action">
                    <button className="actionbutton" name="name" value="as">Submit</button>
                    <button className="actionbutton" name="name" value="cancel">Cancel</button>
                </div>
            </fetcher.Form>
        </div>
        </>
    )
}
export default EditSkill;

export async function editAScore(as) {
    const start = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(as)
    };
    const result = await fetch(`${process.env.REACT_APP_URL}/abilityscore/user/${as.userID}`, start)
        .then(response => {
            switch (response.status) {
                case 204:
                    return null;
                case 400:
                    return response.json()
                case 403:
                    return ["Invalid Login"];
                default:
                    return Promise.reject("Something went wrong here");
            };
        })
        .catch(err => console.error(err));
    return result;
}