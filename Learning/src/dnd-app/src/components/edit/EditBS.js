import { useFetcher } from "react-router-dom";

function EditBS({ bs }){
    const fetcher = useFetcher({key: "charinfo"});
    return(
        <>
        <div className="popup">
            <fetcher.Form method="put" className="popup-form">
                <div className="errormessage" hidden={!fetcher.data}>
                    {fetcher.data ?
                        <div className="bs-error">{fetcher.data.map((e, idx) =>
                            <div key={idx}>{e}</div>)}</div>
                        :
                        <></>}
                </div>
                <div className="form-container">
                    <label className="label-form">Initiative: </label>
                    <input className="bs-input" type="number" name="initiative" defaultValue={bs.initiative}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Armor: </label>
                    <input className="bs-input" type="number" name="armor" defaultValue={bs.armor}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Defense: </label>
                    <input className="bs-input" type="textarea" name="defense" defaultValue={bs.defense}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Inspiration: </label>
                    <input className="bs-input" type="number" name="inspiration" defaultValue={bs.inspiration}></input>
                    </div>
                <div className="form-container">
                    <label className="label-form">Prof Bonus: </label>
                    <input className="bs-input" type="number" name="profBonus" defaultValue={bs.profBonus}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Ability Score Saving DC: </label>
                    <input className="bs-input" type="number" name="asSaveDC" defaultValue={bs.asSaveDC}></input>
                </div>
                <div className="form-container">
                    <label className="label-form">Speed: </label>
                    <input className="bs-input" type="textarea" name="speed" defaultValue={bs.speed}></input>
                </div>
                <div className="add-action">
                    <button className="actionbutton" type="submit" name="name" value="bs" >Save</button>
                    <button className="actionbutton" name="name" value="cancel">Cancel</button>
                </div>
            </fetcher.Form>
        </div>
        </>
    )
}
export default EditBS;

export async function editBStat(editBS) {
    const start = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`

        },
        body: JSON.stringify(editBS)
    };
    const result = await fetch(`${process.env.REACT_APP_URL}/battlestat/update/${editBS.userID}`, start)
        .then(response => {
            switch (response.status) {
                case 204:
                    return null;
                case 400:
                    return response.json();
                case 403:
                    return ["Invalid Login"];
                default:
                    return response.json();
            };
        })
        .catch(err => console.error(err));
    return result;
};