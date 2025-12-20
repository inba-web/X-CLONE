import { React, useState } from 'react';
import Posts from '../../components/common/Posts';
import CreatePost from './CreatePost';

const HomePage = () => {
  const [feedType, setFeedType] = useState('forYou');

  return (
    <>
      <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">   
        
        <div className="relative flex border-b border-gray-700">
          
          <div
            className="relative flex justify-center flex-1 p-3 cursor-pointer "
            onClick={() => setFeedType('forYou')}
          >
            For You
            {feedType === 'forYou' && (
              <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div> 
            )}
          </div>

          <div
            className="relative flex justify-center flex-1 p-3 cursor-pointer "
            onClick={() => setFeedType('following')}
          >
            Following
            {feedType === 'following' && (
              <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
            )}
          </div>
        </div>

        <CreatePost />

        <Posts feedType={feedType} />
      </div>
    </>
  );
};

export default HomePage;
