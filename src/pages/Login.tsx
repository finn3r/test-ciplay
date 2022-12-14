import React, {useEffect, useState} from 'react';
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
    const {setState} = loginSlice.actions;
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}, watch, setValue} = useForm();
    const {isLoading, refetch} = userAPI.useLoginQuery({...loginValues}, {
        skip: loginValues.email === "" && loginValues.password === ""
    });

    useEffect(() => () => {
        dispatch(setState({
            email: watch("email"),
            password: watch("password")
        }));
    }, [dispatch, setState, watch]);

    const handleLogin = (fields: FieldValues) => {
        const user = {...fields} as IUserLogin;
        setLoginValues(user);
        refetch();
    };

    useEffect(() => {
        setValue("email", email);
        setValue("password", password);
    },[setValue, email, password]);

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
                    })}/>
                {errors.email ? <ST.InputError>{errors.email.message?.toString()}</ST.InputError> : <ST.ErrorNull/>}
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
                    })}/>
                {errors.password ? <ST.InputError>{errors.password.message?.toString()}</ST.InputError> : <ST.ErrorNull/>}
                <ST.Input type="submit" value={"SIGN IN"}/>
                <ST.FormFetching active={isLoading}>
                    <Spinner/>
                </ST.FormFetching>
            </ST.Form>
        </ST.FlexContainer>
    );
};

export default Login;