import React from "react";
import Style from "./roomList.module.css";

const User = ({user}) => {
    return (
        <li className={Style.user__block}>
            {user}
        </li>
    )
}

export default User;