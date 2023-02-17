import {
    Button,
    Card, CardBody,
    CardFooter, CardHeader, Typography
} from "@material-tailwind/react";
import React, { useState } from "react";

const Post = ({ post }) => {
    const { text, img, _id } = post;
    const [open, setOpen] = useState(false);
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
            <CardFooter className="gap-7 pt-2">
                {/* <div className="flex gap-10 justify-center mb-6">
                    <IconButton variant="outlined">
                        <FcLike size={22} />
                    </IconButton>

                    <IconButton onClick={() => setOpen(true)}>
                        <FaComment />
                    </IconButton>
                </div>

                <Input className={`${open ? "block" : 'hidden'}`} label={open && "comment"} icon={open && <BiSend size={20} className="cursor-pointer"/>} /> */}

                <Button variant="gradient">Details</Button>
            </CardFooter>
        </Card>
    );
}

export default Post;