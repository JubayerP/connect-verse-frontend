import React from 'react';
import TopPost from '../TopPosts/TopPost';
import PostSection from './postSection';

const Home = () => {
    return (
        <div>
            <PostSection />
            <TopPost />
        </div>
    );
};

export default Home;