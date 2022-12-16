import { cart_item_id, updated_cart_item_list, delete_cart_item } from "../action";

const initialState = {
    data: []
}

export const cartItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case cart_item_id:
            return { data: [...state.data, action.payload.data] };
        case updated_cart_item_list:
            return { data: action.payload.data }
        default:
            return state;
    }
}