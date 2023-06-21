import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { saveUser } from "../api/auth";
import { AuthContext } from "../Providers/AuthProviders";
import { toast } from "react-hot-toast";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { googleLogin, signIn,} = useContext(AuthContext)
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const [error, setError] = useState("")

    // password hide un hide
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }

    // login 
    const onSubmit = data => {
        setError("")
        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log("from login", loggedUser)
                navigate("/dashboard")
            })
            .catch(error => {
                setError(error.message)
                console.log("from login error", error.message)
            })
    };

    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)
                // // save user to db
                // saveUser(result.user)
                navigate("/dashboard")
            })
            .catch(err => {
                console.log(err.message)
                toast.error(err.message)
            })
    }

    return (
        <div className="mt-10 mb-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="lg:w-2/5 mx-auto min-h-screen">
                    <div className="">
                        <div className="card shadow-2xl bg-base-100">
                            <div className="card-body">
                                <h1 className="text-3xl text-center font-2xl">Please Login</h1>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="flex">
                                        <input {...register("password", { required: true })} type={type}
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="current-password" className="input input-bordered w-full" />
                                        <span className="flex justify-around cursor-pointer items-center" onClick={handleToggle}>
                                            <Icon className="absolute mr-10" icon={icon} size={20} />
                                        </span>
                                    </div>
                                    {error && <p className="text-red-600">{error}</p>}
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary" value="Login">
                                        Login
                                    </button>
                                </div>
                                <p>Do not Have an account? Please <Link className="text-primary hover:underline" to="/register">Register</Link></p>
                                <div className="divider">OR</div>
                                <div
                                    onClick={handleGoogleSignIn}
                                    className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
                                >
                                    <FcGoogle size={32} />

                                    <p>Continue with Google</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
