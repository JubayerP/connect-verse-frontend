import {
    Card, CardBody,
    CardFooter, CardHeader, IconButton, Typography
} from "@material-tailwind/react";
import React from "react";
import { FcLike } from 'react-icons/fc';
import { FaComment } from 'react-icons/fa';

const Post = ({ post }) => {
    const { text, img, _id } = post;
    return (
        <Card className="lg:max-w-lg md:max-w-md sm:max-w-sm max-w-xs mx-auto">
            <CardHeader className="">
                <img className="object-cover" src={img} alt="post-pic" />
            </CardHeader>
            <CardBody className="text-center">
                <Typography className="text-lg font-sm text-left" variant="p" color="blue-gray">
                    {text}
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
                <div className="flex gap-4">
                    {/* <IconButton>
                        <i className="fas fa-heart" />
                    </IconButton>
                    <IconButton variant="gradient">
                        <i className="fas fa-heart" />
                    </IconButton> */}
                    <IconButton variant="outlined">
                        <FcLike size={22}/>
                    </IconButton>
                    <IconButton>
                        <FaComment />
                    </IconButton>
                </div>
            </CardFooter>
        </Card>
    );
}

export default Post;