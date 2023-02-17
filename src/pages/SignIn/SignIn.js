import {
    Button, Card, CardBody,
    CardFooter, CardHeader, Input, Typography
} from "@material-tailwind/react";
import { FcGoogle } from 'react-icons/fc';
import { Link } from "react-router-dom";

const SignIn = () => {
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
            <CardBody className="flex flex-col gap-4">
                <Input label="Email" size="lg" />
                <Input label="Password" size="lg" />
            </CardBody>
            <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth className="capitalize">
                    Log me in
                </Button>
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
                    <Button className="flex justify-start items-center gap-4 capitalize" fullWidth variant="outlined"><FcGoogle className="text-xl"/> Try with Google</Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default SignIn;