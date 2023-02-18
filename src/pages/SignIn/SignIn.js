import {
    Button, Card, CardBody,
    CardFooter, CardHeader, Input, Typography
} from "@material-tailwind/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from "react-router-dom";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import Loader from "../Shared/Loader/Loader";

const SignIn = () => {
    const { register, handleSubmit } = useForm();

    const { signIn, loading, setLoading, providerLogin } = useContext(AUTH_CONTEXT);
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        providerLogin()
            .then(result => {
                const user = result.user;
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleSignIn = data => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                navigate('/')
            })
            .catch(err => {
                setLoading(false)
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
                    Sign in
                </Typography>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSignIn)}>
                    <Input type="email" {...register("email")} label="Email" size="lg" />
                    <Input type="password" {...register("password")} label="Password" size="lg" />
                    <Button type="submit" variant="gradient" fullWidth className="capitalize mt-4">
                        {loading ? <Loader /> : "Log me in"}
                    </Button>
                </form>
            </CardBody>
            <CardFooter className="pt-0">
                <Typography variant="small" className="my-5 flex justify-center">
                    Don't have an account?
                    <Link to='/signup'>
                        <Typography
                            variant="small"
                            color="blue"
                            className="ml-1 font-bold"
                        >
                            Sign up
                        </Typography>
                    </Link>
                </Typography>

                <div>
                    <Button onClick={handleGoogleLogin} className="flex justify-start items-center gap-4 capitalize" fullWidth variant="outlined"><FcGoogle className="text-xl" /> Try with Google</Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default SignIn;