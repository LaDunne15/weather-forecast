import { useDispatch, useSelector } from "react-redux";
import AppState from "../../intefaces/AppState";
import "./areas.css";

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

    const active_area = "area focused";
    const normal_area = "area";

    return (
        <>
            <span className="text">Попередні запити:</span>
            <div className="areas">
            {
                Array.from(areas).map((i,index) => (
                    <div key={index} className={location.toLowerCase() === i.toLowerCase() ? active_area : normal_area}>
                        <label onClick={() => changeArea(i)}>{i}</label>
                        {
                            location.toLowerCase() === i.toLowerCase() && (
                                <input className="close-area" type="button" value="x" onClick={() => deleteArea(i)}/>
                            )
                        }
                    </div>
                ))
            }
            </div>
        </>
    )
}

export default Areas;