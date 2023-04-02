import React, { useContext } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginScreen from "../modules/auth/screens/Login.screen";
import { AuthContext } from "../modules/shared/context/auth";

const PrivateRoute: React.FC<{ children?: React.ReactElement }> = ({
  children,
}) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? children ? children : <Outlet /> : <Navigate to="/" />}
    </>
  );
};

const RootRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginScreen />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<h1>Hello world</h1>} />
          {/* <Route path="/create-entry" element={<CreateApartamentScreen />}>
            <Route path=":apartamentId" element={<CreateApartamentScreen />} />
            <Route path="" element={<CreateApartamentScreen />} />
          </Route>
          <Route path="/edit-profile" element={<EditProfileScreen />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootRoutes;
