import './App.module.css';
import Entrance from "./components/Entrance/Entrance";
import {useEffect, useMemo, useReducer} from "react";
import reducer from "./reducer";
import RoomList from "./components/RoomList/RoomList";
import Style from "./App.module.css";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {socketAPI} from "./components/API/api";

function App() {
    const [state, dispatch] = useReducer(reducer, {
        isAuth: false,
        name: null,
        roomId: null,
        roomIdFromURL: null,
        messages: [],
        roomsList: []
    });

    //It's necessary for save input room name value for the link to work
    useMemo(() => {
        const pathsName = document.location.pathname.split('/');
        if (pathsName.length === 3) {
            dispatch({
                type: 'SET_ROOM_ID_FROM_URL',
                payload: pathsName[2]
            })
        }
    }, [])

    //Function call from Entrance component when user filled in form and click button.
    //Set field in the state: name (user name), roomId(id room/name room).
    const onEntrance = (info) => {
        dispatch({
            type: 'IS_AUTH',
            payload: info
        })
    }

    //Set own message/incoming message in the state.
    const setMessageHandler = (message) => {
        dispatch({
            type: 'SET_MESSAGE',
            payload: message
        })
    };

    //Set all information about room (room name, array of users).
    const setRoomInfoHandler = (rooms) => {
        dispatch({
            type: 'SET_ROOMS',
            payload: rooms
        })
    }

    //Set all messages for current room in the state. Function call every time when user change room.
    const setMessagesHandler = (messages) => {
        dispatch({
            type: 'SET_MESSAGES',
            payload: messages
        })
    }


    useEffect(() => {
        //Send socket on server for create user
        if (state.isAuth) socketAPI.setAuth([state.name, state.roomId]);
        //Toggle state.isAuth on false. It's necessary for join a any room in a room list
        dispatch({
            type: 'SWITCH_TO_FALSE',
        })
    }, [state.isAuth]);

    useEffect(() => {
        socketAPI.setRooms(setRoomInfoHandler);
        socketAPI.setMessages(setMessagesHandler);
        socketAPI.setMessage(setMessageHandler);
    }, []);

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className={Style.App}>
                {state.name === null && <Redirect exact from='/' to='/entrance'/>}
                {state.name !== null ? <Route path={'/roomlist'}
                                              render={() => <RoomList onEntrance={onEntrance} setMessageHandler={setMessageHandler}
                                                                      state={state}/>}/> :
                    <Route path='/entrance'
                           render={() => <Entrance onEntrance={onEntrance} roomIdFromURL={state.roomIdFromURL}/>}/>}
            </div>
        </BrowserRouter>
    );
}

export default App;
