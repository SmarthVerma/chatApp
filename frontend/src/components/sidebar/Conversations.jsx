import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import { useGetUsers } from "../../api/homePage.api/sidebar.api/conversations.api/useGetUsers.js";
import { useSelector } from 'react-redux';


function Conversations() {

  const authStatus = useSelector((status) => status.user.authStatus, [])
  const otherUsers = useSelector((status) => status.otherUsers.data, [])

  const [isSelected, setIsSelected] = useState(null)

  const { loading, getUsers } = useGetUsers()

  useEffect(() => {
    if (authStatus) getUsers()
  }, [])

  const handleChange = (data) => {
    // console.log('Id is changed to', data._id)
    setIsSelected(data._id)
  }

  return (
    <>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          <span className="loading loading-spinner loading-lg" ></span>
        </div>
      ) : (

        <div className='py-2 mb-4 flex flex-col overflow-auto'>
          {otherUsers.map((convo, idx) => (
            <div key={convo._id}>
              <Conversation
              data ={ convo}
              selected= {isSelected === convo._id}
              onChange = {handleChange}
              lastIdx={idx === otherUsers.length -1}
              />
            </div>

          ))}

        </div>
      )
      }

    </>
  )
}

export default Conversations
