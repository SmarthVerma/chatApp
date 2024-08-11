import React from 'react'
import { Toaster } from 'react-hot-toast'

function Container({children}) {
  return (
    <div className='p-4 min-h-screen flex items-center justify-center'>
      <Toaster /> 
      {children}
    </div>
  )
}

export default Container
