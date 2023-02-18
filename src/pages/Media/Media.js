import React from 'react';
import { useFetchPosts } from '../../context/fetchPosts';
import Post from './Post';

const Media = () => {
    // const {data: posts=[], isLoading, refetch} = useQuery({
    //     queryKey: ["posts"],
    //     queryFn: async () => {
    //         const res = await fetch("https://backend-silk-kappa.vercel.app/posts");
    //         const data = await res.json();
    //         return data;
    //     }
    // })

    const [posts, isLoading, refetch] = useFetchPosts();

    if (isLoading) {
        return "Loading....."
    }

    return (
        <div>
            <div className='grid grid-cols-1 gap-10 py-10'>
                {
                    posts.map(post => <Post key={post._id} post={post} />)
                }
            </div>
        </div>
    );
};

export default Media;