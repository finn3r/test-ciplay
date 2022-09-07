import React, {Fragment} from 'react';
import * as ST from '../styled';
import {useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";

const NavBar: React.FC = () => {
    const {isAuth} = useAppSelector(state => state.user);
    const location = useLocation();
    const navigate = useNavigate();

    const handleChange = (redirect: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate(redirect);
    };

    return (
        <ST.NavigationContainer>
            {isAuth ?
                <ST.NavigationButton active={location.pathname==="/change_password"} onClick={handleChange("/change_password")}>
                    Change password
                </ST.NavigationButton>
                :
                <Fragment>
                    <ST.NavigationButton active={location.pathname==="/login"} onClick={handleChange("/login")}>
                        SIGN IN
                    </ST.NavigationButton>
                    <ST.NavigationButton active={location.pathname==="/register"} onClick={handleChange("/register")}>
                        SIGN UP
                    </ST.NavigationButton>
                </Fragment>}
        </ST.NavigationContainer>
    );
};

export default NavBar;