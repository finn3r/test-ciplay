import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {ReactComponent as CloseButton} from "../assets/CloseIcon.svg";
import * as ST from "../styled";
import {notifySlice} from "../store/reducers/NotifySlice";
import {AnimatePresence} from "framer-motion";

const Notify: React.FC = () => {
    const {text, type} = useAppSelector(state => state.notify);
    const {hideNotify} = notifySlice.actions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(text){
            setTimeout(() => {
                dispatch(hideNotify());
            }, 2000);
        }
    }, [dispatch, hideNotify, text]);

    return (
        <AnimatePresence>
            {text ? <ST.NotifyContainer
                type={type}
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                exit={{scale: 0.8, opacity: 0}}
                transition={{type: "spring"}}
            >
                <ST.NotifyClose onClick={() => dispatch(hideNotify())}>
                    <CloseButton/>
                </ST.NotifyClose>
                {text}
            </ST.NotifyContainer> : null}
        </AnimatePresence>
    );
};

export default Notify;