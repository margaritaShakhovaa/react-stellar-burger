import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { ingredientDetailsReducer } from "./ingredient-details";
import { burgerConstructorReducer } from "./burger-constructor";
import { userReducer } from "./user";
import { feedOrdersReducer } from "./order-feed";
import { profileOrdersReducer } from "./profile-orders";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  feedOrders: feedOrdersReducer,
  profileOrders: profileOrdersReducer
});

