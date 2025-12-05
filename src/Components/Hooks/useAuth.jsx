import React, { use } from 'react'
import { AuthContext } from '../Contexts/AuthContext'

export default function useAuth() {
    const authInfo= use(AuthContext)
  return authInfo;
}




