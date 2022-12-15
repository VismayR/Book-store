import { cart_item_id,updated_cart_item_list } from "../action";

const initialState = {
    data: []
}

export const cartItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case cart_item_id:
            // console.log(action.payload.data)
            return {data: [ ...state.data, action.payload.data]};
        case updated_cart_item_list:
            // console.log(action.payload.data)
            return {data: action.payload.data }
        default:
            return state;
    }
}