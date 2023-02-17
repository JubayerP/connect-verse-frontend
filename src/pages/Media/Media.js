import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Post from './Post';

const Media = () => {
    const {data: posts=[], isLoading} = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/posts");
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return "Loading....."
    }

    console.log(posts);

    return (
        <div>
            <div className='grid grid-cols-1 gap-6 py-10'>
                {
                    posts.map(post => <Post key={post._id} post={post} />)
                }
            </div>
        </div>
    );
};

export default Media;