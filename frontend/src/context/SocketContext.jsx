// serialzed problem could have only be fixed by this useContext      
// useContext could be usefull for layouts i love to create
import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";


export const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    const authStatus = useSelector(state => state.user.authStatus)
    const user = useSelector(state => state.user.data)


    useEffect(() => {
        if (authStatus) {
            const socket = io("http://localhost:7894/", {
                query: { // works similar to postman Query
                    userId: user._id
                }
            }, []);
            setSocket(socket)

            socket.on("getOnlineUsers", (data) => {
                setOnlineUsers(data)
            })

            return () => socket.close() // when unmount
        } else if (socket) {
            socket.disconnect();
            setSocket(null)
        }
    }, [authStatus])


    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}