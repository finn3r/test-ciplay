import React from 'react';
import spinner from "../assets/Spinner.svg";
import * as ST from '../styled';

const Spinner: React.FC = () => {
    return (
        <ST.FlexContainer>
            <ST.Spinner src={spinner} alt={"Loading..."}/>
        </ST.FlexContainer>
    );
};

export default Spinner;