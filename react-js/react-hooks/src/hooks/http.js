import { useReducer, useCallback } from "react";

const httpReducer = (currentHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null, data: null, extra: null, indentifier: action.identifier }
        case 'RESPONSE':
            return { ...currentHttpState, loading: false, data: action.responseData, extra: action.extra }
        case 'ERROR':
            return { loading: false, error: action.errorMessage }
        case 'CLEAR':
            return { ...currentHttpState, error: null }
        default:
            throw new Error('Should not get there!!');
    }
}

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(
        httpReducer,
        { loading: false, error: null, data: null, extra: null, identifier: null }
    );

    const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
        dispatchHttp({ type: 'SEND', identifier: reqIdentifier });
        fetch(url, {
            method: method,
            body: body
        })
            .then(response => response.json())
            .then(responseData => {
                dispatchHttp({ type: 'RESPONSE', responseData: responseData, extra: reqExtra });
            }).catch(error => {
                console.error(error);
                dispatchHttp({ type: 'ERROR', errorMessage: error.message })
            });
    }, [])

    // NOTE : return something from custom hook!!
    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        reqIdentifier: httpState.indentifier
    };
};

export default useHttp;