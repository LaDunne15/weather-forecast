import { createStore } from "redux";
import AppState from "../intefaces/AppState";
import { addArea, deleteArea, getAreas } from "../service/localStorage";

const initialState: AppState = {
    areas: getAreas(),
    location: getAreas().size?Array.from(getAreas())[0]:""
}

enum ActionTypes {
    ADD_AREA = 'ADD_AREA',
    DELETE_AREA = 'DELETE_AREA',
    FOCUS_AREA = 'FOCUS_AREA'
}

interface AddAreaAction {
    type: ActionTypes.ADD_AREA,
    payload:string
}

interface DeleteAreaAction {
    type: ActionTypes.DELETE_AREA,
    payload:string
}

interface FocusAreaAction {
    type: ActionTypes.FOCUS_AREA,
    payload:string
}


const rootReduser = (state = initialState, action: AddAreaAction | DeleteAreaAction | FocusAreaAction) : AppState => {
    switch (action.type) {
        case ActionTypes.ADD_AREA:
            return {
                ...state,
                areas: addArea(action.payload)
            };
        case ActionTypes.DELETE_AREA:
            return {
                ...state,
                areas: deleteArea(action.payload),
                location: Array.from(getAreas())[0]
            };
        case ActionTypes.FOCUS_AREA:
            return {
                ...state,
                location: action.payload
            }
        default:
            return state;
    }
}

const store = createStore(rootReduser);
export default store;