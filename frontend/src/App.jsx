import React, { useCallback, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup, Login, AuthLayout, Container, Home } from "./pages/index";
import { useGetInfo } from "./api/app.api/useGetInfo";
import { SocketContextProvider } from "./context//SocketContext";
import { VisibleContextProvider } from "./context/VisibleContext";


function App() {

  const { loading, getInfo } = useGetInfo()

  useEffect(() => {
    getInfo()
  }, [])



  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthLayout authentication={true}>
          <Home />
        </AuthLayout>
      )
    },
    {
      path: "/login",
      element: (
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      )
    },
    {
      path: "/signup",
      element: (
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      )
    }
  ])

  return (
    <Container>
      <VisibleContextProvider>
        <SocketContextProvider> {/* only way for serializedContext */}
          <RouterProvider router={router} />
        </SocketContextProvider>
      </VisibleContextProvider>
    </Container>

  )
}

export default App
