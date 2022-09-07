import React, {Fragment} from 'react';
import * as ST from './styled';
import {Route, Navigate, Routes} from "react-router-dom";
import Notify from "./components/Notify";
import {useAppSelector} from "./hooks/redux";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";

const App: React.FC = () => {
    const {isAuth} = useAppSelector(state => state.user);

    return (
        <ST.AppWrapper>
            <Notify/>
            <Routes>
                {isAuth ? (
                    <Fragment>
                        <Route path="/change_password" element={<ChangePassword/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/change_password" replace />}
                        />
                    </Fragment>
                ) : (
                    <Fragment>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/login" replace />}
                        />
                    </Fragment>)}
            </Routes>
        </ST.AppWrapper>
    );
};

export default App;
