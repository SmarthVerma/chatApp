import { useDispatch, useSelector } from "react-redux";
import { fetchInfo } from "../../store/slices/userSlice";

const useGetInfo = () => {
    const dispatch = useDispatch()
    const loading = useSelector(status => status.user.isLoading)

    const getInfo = async () => {
        try {
            const response = dispatch(fetchInfo())
            // console.log('testing at useGetInfo', response) // little different result from where it is comming from
        } catch (error) {
            console.log('error in app Api', error)
        }
    }

    return { loading, getInfo }
}

export { useGetInfo }