import {EDIT_SEARCH_FIELD} from '../actions/constants'
const initialState= {
    searchField: ""

}

export const searchRobots =(state = initialState, action = {})=>{
    switch(action.type){
        case EDIT_SEARCH_FIELD:
            return {
                ...state,
                searchField: action.payload
            }
        default:
        return state;
    }
}

