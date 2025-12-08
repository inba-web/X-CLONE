import React, { useEffect } from 'react'
import Post from '../common/Post'
import PostSkeleton from '../skeletons/PostSkeleton'
import { POSTS } from '../../utils/db/dummy'
import { baseURL } from '../../constant/url'
import { useQuery } from '@tanstack/react-query'

const Posts = ({ feedType,username,userId }) => {

  const getPostEndPoint = () => {
    switch(feedType){
      case "forYou" :
        return `${baseURL}/api/posts/all`;
      case "following":
        return `${baseURL}/api/posts/following`;
      case "posts":
        return `${baseURL}/api/posts/user/${username}`;
      case "likes":
        return `${baseURL}/api/posts/likes/${userId}`;
      default:
        return `${baseURL}/api/posts/all`; 
    }
  }

  const POST_ENDPOINT = getPostEndPoint();
  
  const {data : posts,isLoading, refetch, isrefetching} = useQuery({
    queryKey : ["posts"],
    queryFn : async () => {
      try {
        const res = await fetch(POST_ENDPOINT,{
          method : "GET",
          credentials : "include",
          headers : {
            "Content-Type" : "application/json" 
          }
        })
        const data = await res.json();
        if(!res.ok){
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw error
      }
    }
  });

  useEffect(() => {
    refetch();
  },[feedType,refetch])

  
  return (
    <>
      {
        (isLoading || isrefetching) && (
          <div className='flex flex-col justify-center'>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )
      }
      {!isLoading && posts.length === 0 && <p className='my-4 text-center'>No posts in this tab</p>}
      {!isLoading && posts && (
        <div>
          {
            posts.map((post) => <Post key={post._id} post={post} />)
          }
        </div>
      )}
    </>
  )
}

export default Posts