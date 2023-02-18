import {
    Button, Card, CardBody,
    CardFooter, CardHeader, Input, Typography
} from "@material-tailwind/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import Loader from "../Shared/Loader/Loader";

export const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const { signUp, loading, setLoading, updateUsersProfile } = useContext(AUTH_CONTEXT)

    const handleSignUp = data => {
        const profile = data.profile[0];
        const formData = new FormData();
        formData.append("image", profile);
        const key = process.env.REACT_APP_IMGBB_KEY;

        fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const name = data.name
                    const profile = imgData.data.display_url;
                    signUp(data.email, data.password)
                        .then(result => {
                            console.log(result.user);
                            updateUsersProfile(name, profile).then(r => {}).catch(err => {})
                        })
                        .catch(err => {
                            setLoading(false)
                        })
                }
            })
    }

    return (
        <Card className="w-96 mx-auto mt-16">
            <CardHeader
                variant="gradient"
                color="blue"
                className="mb-4 grid h-28 place-items-center"
            >
                <Typography variant="h3" color="white">
                    Sign up
                </Typography>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-4">
                    <Input type="text" {...register("name")} label="Name" size="lg" required />
                    <Input type="email" {...register("email")} label="Email" size="lg" required />
                    <Input type="password" {...register("password")} label="Password" size="lg" required />
                    <Input type="file" {...register("profile")} label="Profile image" size="lg" required />
                    <Button type="submit" variant="gradient" fullWidth className="capitalize mt-5">
                        {loading ? <Loader /> : "Let's Goo!"}
                    </Button>
                </form>
            </CardBody>
            <CardFooter className="pt-0">
                <Typography variant="small" className="mt-4 flex justify-center">
                    Already have an account?
                    <Link to="/signin">
                        <Typography
                            variant="small"
                            color="blue"
                            className="ml-1 font-sm"
                        >
                            Sign in
                        </Typography>
                    </Link>
                </Typography>
            </CardFooter>
        </Card>
    );
}