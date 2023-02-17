import {
    Button, Card, CardBody,
    CardFooter, CardHeader, Input, Typography
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const SignUp = () => {
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
            <CardBody className="flex flex-col gap-4">
                <Input label="Name" size="lg" />
                <Input label="Email" size="lg" />
                <Input label="Password" size="lg" />
            </CardBody>
            <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth className="capitalize">
                    Let's Goo!
                </Button>
                <Typography variant="small" className="mt-6 flex justify-center">
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