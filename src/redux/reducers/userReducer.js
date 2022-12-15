import { set_name } from "../action";


const initialState = {
    name: ''
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case set_name:
            return { name: action.payload };
        default:
            return state;
    }
}