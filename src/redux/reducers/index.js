import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { cartItemsReducer } from "./cartItemsReducer";
import { cartActiveReducer } from "./cartSectionActiveReducer";


const rootReducer = combineReducers({
    userReducer,
    cartItemsReducer,
    cartActiveReducer
});

export default rootReducer;