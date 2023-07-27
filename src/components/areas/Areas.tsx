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
                    <div key={index} className={location === i? active_area : normal_area}>
                        <label onClick={() => changeArea(i)}>{i}</label>
                        {
                            location === i && (
                                <span className="close-area" onClick={() => deleteArea(i)}>X</span>
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