// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from './token'

export const {REACT_APP_BACKEND_SERVER} = process.env
// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${REACT_APP_BACKEND_SERVER}/api/` }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
        query: (user)=>{
            return  {
                url: "auth/register",
                method: "POST",
                body: user,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
    }),
    loginUser: builder.mutation({
        query: (user)=>{
            return  {
                url: "auth/login",
                method: "POST",
                body: user,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
    }),
    getEpisodesList: builder.mutation({
        query: ()=>{
            return  {
                url: "episodes",
                method: "GET",
                // body: user,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken().access_token}`
                }
            }
        }
    }),
    getEpisodeChaptersList: builder.mutation({
        query: (episode)=>{
            return  {
                url: `chapters/${episode}`,
                method: "GET",
                // body: user,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken().access_token}`
                }
            }
        }
    }),
    getEpisodesDetail: builder.mutation({
        query: (episode)=>{
            return  {
                url: `episodes/${episode}`,
                method: "GET",
                // body: user,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken().access_token}`
                }
            }
        }
    }),
    saveEpisodesSheet: builder.mutation({
        query: (body)=>{
            return  {
                url: `episodes/add`,
                method: "POST",
                body: body,
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken().access_token}`
                }
            }
        }
    }),
  }),
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation, useLoginUserMutation, useGetEpisodesListMutation, useGetEpisodeChaptersListMutation, useGetEpisodesDetailMutation, useSaveEpisodesSheetMutation } = userAuthApi