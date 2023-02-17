import {
    Button,
    Dialog, DialogBody,
    DialogFooter, DialogHeader, Input, Textarea, Typography
} from "@material-tailwind/react";
import React, { Fragment, useState } from 'react';



const PostSection = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);


    const handlePostSubmit = e => {
        e.preventDefault();
        const target = e.target;

        const text = target.text.value;
        const image = target.image.files[0];

        const formData = new FormData();
        formData.append("image", image)

        const key = process.env.REACT_APP_IMGBB_KEY;


        fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    const img = data.data.display_url;

                    const post = {
                        text,
                        img,
                        likes: [],
                    }

                    fetch('http://localhost:5000/posts', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                setOpen(false)
                            }
                        })
                }
            })
    }


    return (
        <div className="mx-auto max-w-screen-xl">
            <div className="flex justify-center py-6" onClick={handleOpen}>
                <input readOnly className="border outline-none pl-2 py-3 w-1/2 border-gray-600 rounded-full cursor-pointer hover:bg-gray-100 text-lg font-sm" type="text" value="write your thoughts!" />
            </div>


            <Fragment>
                <Dialog
                    open={open}
                    handler={handleOpen}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogHeader>Its a simple dialog.</DialogHeader>
                    <form onSubmit={handlePostSubmit}>
                        <DialogBody divider>
                            <Textarea name="text" size="lg" label="Post something" />

                            <div className="w-full border p-4 rounded-md">
                                <Typography className="text-lg font-sm pb-2">
                                    Add to your post
                                </Typography>
                                <Input name="image" type="file" size="md"></Input>
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button type="submit" variant="gradient" color="green">
                                <span>Confirm</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
            </Fragment>
        </div>
    );
};

export default PostSection;