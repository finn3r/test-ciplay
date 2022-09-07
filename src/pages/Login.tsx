import React, { useState} from 'react';
import {FieldValues, useForm} from "react-hook-form";
import * as ST from "../styled";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {loginSlice} from "../store/reducers/LoginSlice";
import {IUserLogin} from "../models/IUser";
import {userAPI} from "../services/UserService";
import Spinner from "../components/Spinner";
import NavBar from "../components/NavBar";

const Login: React.FC = () => {
    const [loginValues, setLoginValues] = useState<IUserLogin>({
        email: "",
        password: ""
    });
    const {email, password} = useAppSelector(state => state.login);
    const {changeEmail, changePassword} = loginSlice.actions;
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} =
        useForm({
            mode: "all"
        });
    const {isLoading, refetch} = userAPI.useLoginQuery({...loginValues}, {
        skip: loginValues.email===""&&loginValues.password===""
    });

    const handleLogin = (fields: FieldValues) => {
        const user = {...fields} as IUserLogin;
        setLoginValues(user);
        refetch();
    };

    return (
        <ST.FlexContainer>
            <ST.Form onSubmit={handleSubmit(handleLogin)}>
                <NavBar/>
                <ST.Input
                    type="text" placeholder="Email"
                    {...register("email", {
                        required: "You must specify a email",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address"
                        }
                    })}
                    value={email}
                    onChange={(e) => dispatch(changeEmail(e.target.value))}/>
                {errors.email ? <ST.InputError>{errors.email.message?.toString()}</ST.InputError> : null}
                <ST.Input
                    type="password" placeholder="Password"
                    {...register("password", {
                        required: "You must specify a password",
                        minLength: {
                            value: 4,
                            message: "Password must have at least 4 characters"
                        },
                        maxLength: {
                            value: 10,
                            message: "Password must have no more than 10 characters"
                        },
                        pattern: {
                            value: /[A-Z]/,
                            message: "Password must have capital letter"
                        }
                    })}
                    value={password}
                    onChange={(e) => dispatch(changePassword(e.target.value))}/>
                {errors.password ? <ST.InputError>{errors.password.message?.toString()}</ST.InputError> : null}
                <ST.Input type="submit" value={"SIGN IN"}/>
                <ST.FormFetching active={isLoading}>
                    <Spinner/>
                </ST.FormFetching>
            </ST.Form>
        </ST.FlexContainer>
    );
};

export default Login;