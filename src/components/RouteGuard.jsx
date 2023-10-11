import Cookies from 'js-cookie'
import React from 'react'
import { Navigate } from 'react-router-dom'

const RouteGuard = ({children}) => {
    const token = Cookies.get("token")
    const user = Cookies.get("user")
      if(token) return children
      else return <Navigate to="/login"/>
}

export default RouteGuard