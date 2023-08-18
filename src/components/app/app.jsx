import React, {useEffect} from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import { OnlyUnAuth, OnlyAuth } from "../protected-route/protected-route";
import NotFound404 from "../../pages/not-found/not-found";
import RegisterPage from "../../pages/register/register";
import Modal from "../modal/modal";
import Ingredient from "../../pages/ingredient/ingredient";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch } from "react-redux";
import { checkUserAuth } from "../../services/actions/user";
import FeedPage from "../../pages/feed/feed";
import OrderInfoPage from "../../pages/order-info/order-info";
import Orders from "../orders/orders";
import ProfileEdit from "../profile-edit/profile-edit";
import { getIngredients } from "../../services/actions/ingredients";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  useEffect(() => {
    dispatch(getIngredients())
  }, []);

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  return (
      <DndProvider backend={HTML5Backend}>
        <div className={styles.app}>
          <AppHeader />
          <Routes location={background || location}>
            <Route path={"/"} element={<HomePage />} />

            <Route path={"/feed"} element={<FeedPage />} />

            <Route path={"/profile"} element={<OnlyAuth component={<ProfilePage />} />}>
              <Route index element={<OnlyAuth component={<ProfileEdit />} />} />
              <Route path={"/profile/orders"} element={<OnlyAuth component={<Orders />} />} />
            </Route>

            <Route path={"/login"} element={<OnlyUnAuth component={<LoginPage />} />} />
            <Route path={"/register"} element={<OnlyUnAuth component={<RegisterPage />} />} />
            <Route path={"/forgot-password"} element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
            <Route path={"/reset-password"} element={<OnlyUnAuth component={<ResetPasswordPage />} />} />

            <Route path={"/feed/:id"} element={<OrderInfoPage />} />
            <Route path={"/profile/orders/:id"} element={<OnlyAuth component={<OrderInfoPage />} />} />
            <Route path={"/ingredients/:ingredientId"} element={<Ingredient />} />
            <Route path={"/not-found"} element={<NotFound404 />} />
          </Routes>

          { background && (
              <Routes>
                <Route
                    path='/ingredients/:ingredientId'
                    element={
                      <Modal handleClose={handleModalClose} header={"Детали ингредиента"}>
                        <IngredientDetails />
                      </Modal>
                    }
                />
                <Route
                    path='/feed/:id'
                    element={
                      <Modal handleClose={handleModalClose}>
                        <OrderInfoPage isModal={true}/>
                      </Modal>
                    }
                />
                <Route
                    path='/profile/orders/:id'
                    element={
                      <Modal handleClose={handleModalClose}>
                        <OrderInfoPage isModal={true}/>
                      </Modal>
                    }
                />
              </Routes>
          )}
        </div>
      </DndProvider>
  )
};

export default App;