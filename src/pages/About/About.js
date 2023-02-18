import { Button, Input, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AUTH_CONTEXT } from '../../context/AuthProvider';
import Modal from './Modal';

const About = () => {
    const { user } = useContext(AUTH_CONTEXT);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);


    const { data: about } = useQuery({
        queryKey: ["about"],
        queryFn: async () => {
            const res = await fetch(`https://backend-silk-kappa.vercel.app/about?email=${user?.email}`)
            const data = await res.json();
            return data;
        }
    })

    console.log(about)

    return (
        <div className="max-w-screen-xl mx-auto">
            <Typography variant="h2" className="text-center my-3">
                About Me
            </Typography>
            <div className='lg:max-w-lg md:max-w-md sm:max-w-sm max-w-xs mx-auto grid grid-cols-1 gap-6 place-items-center mt-10'>
                <Input value={about ? about.name : user?.displayName} readOnly size="lg" label="Name" placeholder='Name' />
                <Input value={about ? about.email : user?.email} readOnly size="lg" label="Email" placeholder='Email' />
                <Input size="lg" value={about && about.university} readOnly={about} label="University" placeholder='University' />
                <Input size="lg" label="Address" value={about && about.address} readOnly={about} placeholder='Address' />
                <Button onClick={handleOpen}>Edit</Button>
            </div>

            <Modal open={open} handleOpen={handleOpen} about={about} setOpen={setOpen}/>
        </div>
    );
};

export default About;