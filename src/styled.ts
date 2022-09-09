import styled, {createGlobalStyle} from "styled-components";
import {motion} from "framer-motion";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    margin: 0;
  }
`;

export const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 30px;
  gap: 20px;
  background: linear-gradient(#2e3a6a, #2f0b45);
  border-radius: 10px;
  width: 100%;
  max-width: 350px;
`;

export const FormFetching = styled.div<{ active?: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: ${props => props.active ? "block" : "none"};
`;

export const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  border: none;
  outline: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  ::placeholder {
    color: #9a9a9a;
  }
  
  &[type='submit']{
    margin-top: 10px;
    padding: 10px 5px;
    background: rgb(246, 185, 26, 0.85);
    :hover {
      cursor: pointer;
    }
  }
`;

export const ErrorNull = styled.div`
  margin: -20px 0 -15px;
  height: 20px;
`;

export const InputError = styled(ErrorNull)`
  color: #FF3700FF;
  font-size: 14px;
  ::before {
    display: inline;
    content: "⚠ ";
  }
`;

export const Spinner = styled.img`
  width: 30%;
  height: 30%;
`;

export const NavigationContainer = styled.div`
  font-size: 20px;
  display: flex;
  margin-bottom: 10px;
`;

export const NavigationButton = styled.button<{ active?: boolean, disabled?: boolean }>`
  font-size: 16px;
  transition: all 250ms ease 0s;
  border: none;
  padding: 0 0 5px;
  margin-right: 20px;
  border-radius: 0;
  background: none;
  color: white;
  opacity: ${props => props.active ? "1" : "0.5"};
  display: ${props => props.disabled ? "none" : "block"};
  border-bottom: 2px solid ${props => props.active ? "#eec111" : "rgba(0,0,0,0)"};
  font-family: 'Montserrat', sans-serif;
  :hover {
    cursor: pointer;
  }
`;

export const NotifyContainer = styled(motion.div)<{ type?: string|null }>`
  position: absolute;
  right: 20px;
  margin-left: 20px;
  top: 20px;
  border-radius: 20px;
  padding: 30px;
  background: ${props => props.type==="success" ? 
          "linear-gradient(to bottom right, #B0DB7D 40%, #99DBB4 100%)" 
          : 
          "linear-gradient(to bottom left, #EF8D9C 40%, #FFC39E 100%);"};
`;

export const NotifyClose = styled.button`
  background: none;
  border: none;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 30px;
  height: 30px;
  opacity: 0.7;
  :hover {
    cursor: pointer;
    opacity: 1;
  }
`;