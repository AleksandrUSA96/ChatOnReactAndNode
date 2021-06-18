import React from "react";
import socket from "../../SocketIo/socketIo";
import Style from "./Chat.module.css";
import moment from "moment";

const Message = ({message}) => {
    const styleForMyMessage = {
        alignSelf: 'flex-end',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        textAlign: 'right'
    }

    return (
        <div style={socket.id === message[1] ? styleForMyMessage : {}} className={Style.message}>
            <p className={Style.text__message}>{message[0].text}</p>
            <div className={Style.message__info}>
                <span className={Style.message__sender}>{message[0].user}</span>
                <span
                    //For more easily displaying I used MomentJs, but I'm not sure that i did it correct.
                    //I work first time with date between server and client. Don't hate me. :D
                    className={Style.message__sent}>{moment(message[0].date).format('DD.MMM HH:mm')}</span>
            </div>
        </div>
    )
}

export default Message;