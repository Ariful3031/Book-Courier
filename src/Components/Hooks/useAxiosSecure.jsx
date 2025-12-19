import axios from 'axios'

import React, { useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: 'https://book-courier-server-black.vercel.app'
})

export default function useAxiosSecure() {
  const { user, logout } = useAuth();
  const navigate = useNavigate()
  // console.log(user)
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`
      return config;
    })
    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use((response) => {
      return response;
    },
      (error) => {
        // console.log(error);
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logout()
            .then(() => {
              navigate('/login')
            })
        }


        
        return Promise.reject(error);
      })

    // interceptor request 
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor)
    }
  }, [user,logout,navigate])

  return axiosSecure;
}
