import { cart_is_active } from "../action";

const initialState = {
    cartActive: false,
}

export const cartActiveReducer = (state = initialState, action) => {
    switch (action.type) {
        case cart_is_active:
            return {cartActive: action.payload};
        default:
            return state;
    }
}