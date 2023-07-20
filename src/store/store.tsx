import { Action, createStore } from "redux";
import AppState from "../intefaces/AppState";
import { addArea, deleteArea, getAreas } from "../service/localStarage";

const initialState: AppState = {
    areas : getAreas()
}

enum ActionTypes {
    ADD_AREA = 'ADD_AREA',
    DELETE_AREA = 'DELETE_AREA'
}

interface AddAreaAction {
    type: ActionTypes.ADD_AREA,
    payload:string
}

interface DeleteAreaAction {
    type: ActionTypes.DELETE_AREA,
    payload:string
}


const rootReduser = (state = initialState, action: AddAreaAction | DeleteAreaAction) : AppState => {
    switch (action.type) {
        case ActionTypes.ADD_AREA:
            return {
                ...state,
                areas: addArea(action.payload)
            };
        case ActionTypes.DELETE_AREA:
            return {
                ...state,
                areas: deleteArea(action.payload)
            };
        default:
            return state;
    }
}

const store = createStore(rootReduser);
export default store;