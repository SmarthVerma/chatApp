import React, { useCallback, useEffect, useRef } from 'react'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '../../store/slices/otherUsersSlice'
import { useListenMessages } from '../../api/homePage.api/messageContainer.api/messages.api/useListenMessages'

function Messages() {
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.messageContainer.messages)
  const otherUserId = useSelector(state => state.messageContainer.sendingTo)
  useListenMessages()
  const containerRef = useRef(null);

  const getOtherInfo = useCallback(
    () => {
      console.log('is there errir?')
      console.log(otherUserId)
      dispatch(getUserInfo(otherUserId))
    },
    [otherUserId],
  )
  // getOtherInfo() // this is the reason why m getting that render error

  // above error is fixed by this
  useEffect(() => {
    
    console.log('is there errir?')
    console.log(otherUserId)
    dispatch(getUserInfo(otherUserId))
  }, [otherUserId])
  

  // scroll feature
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages]) // jab bhi messages state change hoga this will run which then will auto scroll



  // console.log(`msg`, messages)


  return (
    <div className='p-4 flex-1 overflow-auto' // scrollbar appears if more msgses
      ref={containerRef}
    >
      {messages.map((msg) => (
        <div key={msg._id}>
          <Message from={msg.senderId} msg={msg} />
        </div>
      ))}
    </div>
  )
}

export default Messages
