export const set_name = "SET_NAME";
export const cart_item_id = "CART_ITEM_ID";
export const updated_cart_item_list = "UPDATED_ITEM_LIST";
export const cart_is_active = "CART_IS_ACTIVE";


export const setName = (name) => ({
    type: set_name,
    payload: name
});

export const setCartId = (data) => ({
    type: cart_item_id,
    payload: {
        data,
    }
});

export const setUpdatedCart = (data) => ({
    type: updated_cart_item_list,
    payload: {
        data,
    }
});

export const setCartIsActive = (cartActive) => ({
    type: cart_is_active,
    payload: cartActive
});
