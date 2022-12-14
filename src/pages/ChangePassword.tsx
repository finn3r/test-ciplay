import React from 'react';
import * as ST from '../styled';
import {FieldValues, useForm} from "react-hook-form";
import {IUserChange} from "../models/IUser";
import {userAPI} from "../services/UserService";
import NavBar from "../components/NavBar";
import Spinner from "../components/Spinner";

const ChangePassword: React.FC = () => {
    const {register, handleSubmit, formState: {errors}, reset, watch} = useForm();
    const [userChangePassword, {isLoading}] = userAPI.useChangePasswordMutation();

    const handleChangePassword = (fields: FieldValues) => {
        delete fields['password_repeat'];
        const user = {...fields} as IUserChange;
        userChangePassword(user);
        reset();
    };

    return (
        <ST.FlexContainer>
            <ST.Form onSubmit={handleSubmit(handleChangePassword)}>
                <NavBar/>
                <ST.Input
                    type="password" placeholder="Old password"
                    {...register("oldPassword", {
                        required: "You must specify a old password",
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
                {errors.oldPassword ? <ST.InputError>{errors.oldPassword.message?.toString()}</ST.InputError> :
                    <ST.ErrorNull/>}
                <ST.Input
                    type="password" placeholder="New password"
                    {...register("newPassword", {
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
                {errors.newPassword ? <ST.InputError>{errors.newPassword.message?.toString()}</ST.InputError> :
                    <ST.ErrorNull/>}
                <ST.Input type="password" placeholder="Repeat password"
                          {...register("password_repeat", {validate: value => value === watch("newPassword")})}/>
                {errors.password_repeat ? <ST.InputError>Passwords don't match</ST.InputError> : <ST.ErrorNull/>}
                <ST.Input type="submit" value={"SIGN IN"}/>
                <ST.FormFetching active={isLoading}>
                    <Spinner/>
                </ST.FormFetching>
            </ST.Form>
        </ST.FlexContainer>
    );
};

export default ChangePassword;