export default (state, action) => {
    switch (action.type) {
        case 'IS_AUTH':
            return {
                ...state,
                isAuth: true,
                name: action.payload.name,
                roomId: action.payload.roomId
            };
        case 'SET_ROOM_ID_FROM_URL':
            return {
                ...state,
                roomIdFromURL: action.payload,
            };
        case 'SWITCH_TO_FALSE':
            return {
                ...state,
                isAuth: false,
            };
        case 'SET_ROOMS':
            return {
                ...state,
                roomsList: action.payload
            };
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.payload
            };
        case 'SET_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        default:
            return state;
    }
};