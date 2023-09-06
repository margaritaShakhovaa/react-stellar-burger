import { store } from "../store/store";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TIngredientDetailsActions } from "../actions/ingredient-details";
import { TIngredientsActions } from "../actions/ingredients";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TOrderActions } from "../actions/order";
import { TOrderFeedActions } from "../actions/order-feed";
import { TProfileOrdersActions } from "../actions/profile-orders";
import { TUserActions } from "../actions/user";
import { rootReducer } from "../reducers";

// Типизация всех экшенов приложения
type TApplicationActions = TBurgerConstructorActions
| TIngredientDetailsActions
    | TIngredientsActions
    | TOrderActions
    | TOrderFeedActions
    | TProfileOrdersActions
    | TUserActions;

export type RootState = ReturnType<typeof rootReducer>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;

// Типизация thunk в нашем приложении
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;