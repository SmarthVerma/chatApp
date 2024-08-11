import React, { useEffect } from 'react'
import { useContext } from 'react'
import { SocketContext } from '../../../../context/SocketContext'
import { setMessages } from '../../../../store/slices/messageContainerSlice'
import { useDispatch } from 'react-redux'
import notificationSound from '../../../../assets/sound/notification.mp3'

function useListenMessages() {
    const dispatch = useDispatch()
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true
            const sound = new Audio(notificationSound)
            sound.play()
            console.log('After modification', newMessage)
            dispatch(setMessages(newMessage))
        })

        // return () => {
        //     socket?.off(newMessage)
        // }
    }, [socket])

}

export { useListenMessages }
