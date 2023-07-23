import { useDispatch, useSelector } from "react-redux";
import AppState from "../intefaces/AppState";

function Areas() {
    
    const areas = useSelector((state: AppState) => state.areas);
    const location = useSelector((state: AppState) => state.location);
    const dispatch = useDispatch();

    const deleteArea = (name: string) => {
        dispatch({ type: 'DELETE_AREA', payload: name });
    }

    const changeArea = (name: string) => {
        dispatch({ type: 'FOCUS_AREA', payload: name });
    }

    return (
        <>
            {
                Array.from(areas).map((i,index) => (
                    <div key={index}>
                        <label className={location === i ? "border" : ""} onClick={() => changeArea(i)}>{i}</label>
                        <input type="button" value="Видалити" onClick={() => deleteArea(i)}/>
                    </div>
                ))
            }
        </>
    )
}

export default Areas;