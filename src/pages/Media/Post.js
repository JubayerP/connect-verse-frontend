import {
    Button,
    Card, CardBody,
    CardFooter, CardHeader, Typography
} from "@material-tailwind/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    const { text, img, _id, name, photo } = post;
    return (
        <Card className="lg:max-w-lg md:max-w-md sm:max-w-sm max-w-xs mx-auto">
            <CardHeader className="">
                <img className="object-cover" src={img} alt="post-pic" />
            </CardHeader>
            <CardBody className="">
                <div className='flex justify-start items-center gap-2 mb-2'>
                    <img className='w-9 h-9 rounded-full object-cover' src={photo} alt="" />
                    <span className='text-lg font-sm'>{name}</span>
                </div>
                <Typography className="text-lg font-sm text-left" variant="p" color="blue-gray">
                    {text}
                </Typography>
            </CardBody>
            <CardFooter className="gap-7 pt-2">

                <Link to={`/posts/${_id}`}>
                    <Button variant="gradient">Details</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

export default Post;