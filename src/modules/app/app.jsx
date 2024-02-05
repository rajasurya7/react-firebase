// App.js
import React,{ Suspense, useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "src/store";

import "../../utils/i18n";
import LoginPage from "../auth/LoginPage";
import MainPage from "./MainPage";
import PrivateRoute from "../auth/PrivateRoute";
import "../../_legacy/index.css";
const App = () => {
  return (
      <Suspense fallback="Loading...">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route
                  path="/*"
                  element={
                    <PrivateRoute>
                      <MainPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Router>
          </PersistGate>
        </Provider>
      </Suspense>
  );
};

export default App;
