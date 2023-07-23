import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/home/home";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile/profile";
import { OnlyUnAuth, OnlyAuth} from "../protected-route/protected-route";


function App() {

  return (
      <DndProvider backend={HTML5Backend}>
        <div className={styles.app}>
          <AppHeader />
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/login"} element={<OnlyUnAuth component={<LoginPage />} />} />
            <Route path={"/register"} element={<OnlyUnAuth component={<RegisterPage />} />} />
            <Route path={"/forgot-password"} element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
            <Route path={"/reset-password"} element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
            <Route path={"/profile"} element={<OnlyAuth component={<ProfilePage />} />} />
          </Routes>
        </div>
      </DndProvider>
  );
}

export default App;
