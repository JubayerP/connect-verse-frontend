import { Card, CardBody, CardHeader, IconButton, Input, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { FaComment } from "react-icons/fa";
import { FcLike } from 'react-icons/fc';
import { useLoaderData } from 'react-router-dom';
import { AUTH_CONTEXT } from '../../context/AuthProvider';
import { useFetchPosts } from '../../context/fetchPosts';


const PostDetails = () => {
    const post = useLoaderData();
    const [open, setOpen] = useState(false);
    const { text, img, _id } = post;
    const { user } = useContext(AUTH_CONTEXT)

    const [liked, setLiked] = useState(false);

    const [_, __, refetch] = useFetchPosts()

    const handleLikeClick = () => {
        axios.post(`https://backend-silk-kappa.vercel.app/posts/${_id}/like`, { userId: user?.uid })
            .then((response) => {
                setLiked(!liked);
                refetch();
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const {data: comments=[], isLoading} = useQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            const res = await fetch("https://backend-silk-kappa.vercel.app/comments")
            const data = await res.json();
            return data;
        }
    })

    const handleComment = e => {
        e.preventDefault();
        const text = e.target.comment.value;

        const comment = {
            comment: text,
            postId: _id,
            userId: user?.uid,
            name: user?.displayName,
            photo: user?.photoURL
        }

        fetch('https://backend-silk-kappa.vercel.app/comments', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch()
                    alert("comment successfully added!")
                    e.target.reset();
                }
            })
    }


    return (
        <div className="flex justify-center max-w-screen-xl gap-6 mx-auto mt-10">
            <Card className="lg:max-w-lg md:max-w-md sm:max-w-sm max-w-xs mx-auto">
                <CardHeader className="">
                    <img className="object-cover" src={img} alt="post-pic" />
                </CardHeader>
                <CardBody className="text-center">
                    <Typography className="text-lg font-sm text-left" variant="p" color="blue-gray">
                        {text}
                    </Typography>
                </CardBody>
            </Card>

            <div>
                <div className="flex gap-10 justify-center mb-6">
                    <div className='flex justify-center items-center gap-3'>
                        <IconButton onClick={handleLikeClick} variant="outlined">
                            <FcLike size={22} />
                        </IconButton>
                        <p>{post.likes.length}</p>
                    </div>

                    <IconButton onClick={() => setOpen(true)}>
                        <FaComment />
                    </IconButton>
                </div>

                <form onSubmit={handleComment}>
                    <Input name='comment' className={`${open ? "block" : 'hidden'}`} label={open && "comment"} icon={open && <BiSend size={20} className="cursor-pointer" />} />
                </form>


                <div>
                    <Typography className="text-lg font-medium mt-6">
                        Comments
                    </Typography>
                    <div className='w-full h-px bg-gray-600'></div>

                    <div>
                        {
                            comments.filter(c => c.postId === _id).map(comment =>
                                <div key={comment._id} className="space-y-6 border-b-2 shadow px-4 py-2 my-4 rounded">
                                    <div className='flex justify-center items-center gap-2'>
                                        <img className='w-9 h-9 rounded-full object-cover' src={comment.photo} alt="" />
                                        <span className='text-lg font-sm'>{comment.name}</span>
                                    </div>

                                    <div className='text-left text-lg font-sm text-[#2196F3]'>
                                        {comment.comment}
                                    </div>
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;