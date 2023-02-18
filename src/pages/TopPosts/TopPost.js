import { Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Post from '../Media/Post';

const TopPost = () => {
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ["topPosts"],
        queryFn: async () => {
            const res = await fetch("https://backend-silk-kappa.vercel.app/topComments")
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return "Loading...."
    }
    return (
        <div className='max-w-screen-xl mx-auto'>
            <Typography variant="h2" className="text-center">
                Popular Posts
            </Typography>
            <div className="grid grid-cols-1 gap-16 my-10">
                {
                    posts.map(post => <Post post={post} key={post._id} />)
                }
            </div>
        </div>
    );
};

export default TopPost;