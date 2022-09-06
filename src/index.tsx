import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ST from './styled';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

const store = setupStore();

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <ST.GlobalStyle/>
        <App/>
    </Provider>
);