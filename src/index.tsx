import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ST from './styled';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import {BrowserRouter} from "react-router-dom";

const store = setupStore();

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ST.GlobalStyle/>
            <App/>
        </Provider>
    </BrowserRouter>
);