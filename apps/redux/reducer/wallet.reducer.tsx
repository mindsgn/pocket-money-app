import {CONNECT, DISCONNECT, INCREMENT, DECREMENT} from '../../constants';

interface walletState{
    counter?: any,
    connected?: boolean;
    chainId?: number | null;
    network?: string | null;
    address?: string | null;
    totalAmount?: number | null;
    disabled?: boolean;
};

const initialState: walletState = {
    counter: { amount: 0 },
    connected: false,
    address: '',
}

export default (state = initialState, action: any) => {
    switch (action.type) {
        case CONNECT:
            return { 
                connected: action.connected
            };
        case DISCONNECT:
            return {
                connected: action.connected
            };
        case INCREMENT:
            return { 
                counter: { amount: state.counter.amount + 1 }
            };
        case DECREMENT:
            return {
                counter: { amount: state.counter.amount - 1 }
            };
        default:
            return state;
    }
}