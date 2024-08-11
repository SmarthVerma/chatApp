import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from "../../../../store/slices/messageContainerSlice";

const useSendMsg = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const sendingTo = useSelector(state => state.messageContainer.sendingTo)

    const sendMsg = async (data) => {
        console.log('data in useSendmsg', data)
        const url = `api/v1/messages/send/${sendingTo}`
        setLoading(true)

        try {
            const response = await axios.post(url, data)
            console.log(`useSendMsg response`, response.data.data)
            dispatch(setMessages(response.data.data))
        } catch (error) {
            console.log('error in useSendMsg', error)
            throw error
        }
    }

    return { loading, sendMsg }
}

export { useSendMsg }