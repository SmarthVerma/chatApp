import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeConversation, fetchMessage } from "../../../../store/slices/messageContainerSlice";

const useGetMessages = () =>{
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.messageContainer.isLoading)

    const getMessages = async (data) => {
        try {
            dispatch(fetchMessage(data._id))
            dispatch(changeConversation(data))

        } catch (error) {
            console.log('error in useGetMessages', error)
        }
    }

    return {loading, getMessages}
}


export {useGetMessages}