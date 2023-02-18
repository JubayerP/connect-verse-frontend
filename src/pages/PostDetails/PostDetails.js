import { Card, CardBody, CardHeader, IconButton, Input, Typography } from '@material-tailwind/react';
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
        axios.post(`http://localhost:5000/posts/${_id}/like`, { userId: user?.uid })
            .then((response) => {
                setLiked(!liked);
                refetch();
            })
            .catch((error) => {
                console.log(error);
            });
    };


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

                <Input className={`${open ? "block" : 'hidden'}`} label={open && "comment"} icon={open && <BiSend size={20} className="cursor-pointer" />} />


                <div>
                    <Typography className="text-lg font-medium mt-6">
                        Comments
                    </Typography>
                    <div className='w-full h-px bg-gray-600'></div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;