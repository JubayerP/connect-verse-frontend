import {
    Button,
    Dialog, DialogBody,
    DialogFooter, DialogHeader, Input
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useContext } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";

export default function Modal({ open, handleOpen, about, setOpen }) {

    const { user } = useContext(AUTH_CONTEXT)

    const handlePostDetails = e => {
        e.preventDefault();

        const target = e.target;
        const name = target.name.value
        const email = target.email.value
        const university = target.university.value
        const address = target.address.value

        const about = { name, email, university, address };

        fetch(`https://backend-silk-kappa.vercel.app/about`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(about)
        })
            .then(res => res.json())
        .then(data => {
            alert("Edited")
            setOpen(false)
        })
    }

    return (
        <Fragment>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Edit your info</DialogHeader>
                <form onSubmit={handlePostDetails}>
                    <DialogBody className='lg:max-w-lg md:max-w-md sm:max-w-sm max-w-xs mx-auto grid grid-cols-1 gap-6 place-items-center mt-10'>
                        <Input name="name" value={about ? about.name : user?.displayName} readOnly size="lg" label="Name" placeholder='Name' />
                        <Input name="email" value={about ? about.email : user?.email} readOnly size="lg" label="Email" placeholder='Email' />
                        <Input name="university" value={about && about.university} size="lg" label="University" placeholder='University' />
                        <Input name='address' value={about && about.address} size="lg" label="Address" placeholder='Address' />
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
                            <span>Save</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </Fragment>
    );
}