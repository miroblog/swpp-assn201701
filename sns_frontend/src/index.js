import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer';
import App from './App';
import rootSaga from './sagas/sagas'
import {persistStore, autoRehydrate} from 'redux-persist'


const sagaMiddleware = createSagaMiddleware();

// rootReducers combine reducers in ./reducers/...
const store = createStore(
		rootReducer,
		undefined,
		compose(
			applyMiddleware(sagaMiddleware),
			autoRehydrate()
			)
		);

sagaMiddleware.run(rootSaga)
persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
