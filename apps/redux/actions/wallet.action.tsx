import { useWalletConnect } from '@walletconnect/react-native-dapp';
import React from 'react'
import { INCREMENT, DECREMENT, CONNECT, ERROR } from '../../constants';

export const WalletAction = (props: any) => {
    const connector = useWalletConnect();

    const incrementAction = () => ({
        type: INCREMENT,
    });
    
    const decrementAction = () => ({
        type: DECREMENT,
    });

    const connectWallet = React.useCallback(async () => {
        try{
            console.log("connecting wallet");
            props.dispatch({
                type: CONNECT,
                connected: true,
            });
            /*connector.connect().then((success) => {
                console.log("success: ", success)
               
            }).catch((error) => {
                console.log("error: ", error)
                props.dispatch({
                    type: ERROR,
                    connected: false,
                });
            });*/
        }catch(error: any){
            console.log("error connecting wallet");
            props.dispatch({
                type: ERROR,
                connected: false,
            });
        }
    },[]);

    const useIncrement = () => {
        props.dispatch(incrementAction());
    };
    
    const useDecrement = () => {
        props.dispatch(decrementAction());
    };

    return {
        useIncrement,
        useDecrement,
        connectWallet,
    }
}
  
export default WalletAction;

/*

import { CONNECT, ERROR, DISCONNECT } from "../../constants";
import { walletReducer, initailState } from '../reducer/reducer'
import { useSelector } from 'react-redux';

export const wallet = () => {
    const [state, dispatch] = React.useReducer(walletReducer, initailState);
    const { address, chainId, connected, totalAmount } = useSelector((state: any) => state.walletConnectReducer);
    const connector = useWalletConnect();

    const connect = React.useCallback(async () => {
        try{
            console.log("connecting wallet");
            connector.connect().then((success) => {
                console.log("success: ", success)
                dispatch({
                    type: CONNECT,
                    connected: true,
                    address: success.accounts[0],
                    chainId: success.chainId,
                });
            }).catch((error) => {
                console.log("error: ", error)
            });
        }catch(error: any){
            console.log("error connecting wallet");
            dispatch({
                type: ERROR,
                connected: true,
            });
        }
    },[]);

    const disconnect = React.useCallback(async () => {
        try{
            console.log("disconnecting wallet");
            connector.connect().then((success) => {
                console.log("success: ", success)
                dispatch({
                    type: DISCONNECT,
                    connected: false,
                    address: null,
                    chainId: null,
                });
            }).catch((error) => {
                console.log("error: ", error)
            });
        }catch(error: any){
            console.log("error connecting wallet");
            dispatch({
                type: ERROR,
                connected: true,
            });
        }
    },[]);
    
    return{
        connect,
        disconnect,
        connected,
        address,
        totalAmount
    }
};*/