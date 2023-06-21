import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import { toast } from "react-hot-toast";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { AuthContext } from "../Providers/AuthProviders";
import { saveUser } from "../api/auth";


const Register = () => {
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, googleLogin, } = useContext(AuthContext);
    const navigate = useNavigate();

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

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const createdUser = result.user;
                saveUser(createdUser)
                navigate("/dashboard")
                console.log(createdUser)
            })
            .catch(err => {
                console.log(err.message);
            })
    };

    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)
                // save user to db
                saveUser(result.user)
                navigate("/dashboard")
            })
            .catch(err => {
                console.log(err.message)
                toast.error(err.message)
            })
    }

    return (
        <div className="mt-10 mb-20">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="lg:w-2/5 w-3/4 mx-auto min-h-screen">
                    <div className="">
                        <div className="card shadow-2xl bg-base-100">
                            <div className="card-body">
                                <h1 className="text-3xl text-center font-2xl">Please Register Your Account</h1>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input {...register("name", { required: true })} type="text" placeholder="Name" className="input input-bordered" />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="flex">
                                        <input {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                        })} type={type}
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="current-password" className="input input-bordered w-full" />
                                        <span className="flex justify-around cursor-pointer items-center" onClick={handleToggle}>
                                            <Icon className="absolute mr-10" icon={icon} size={20} />
                                        </span>
                                    </div>
                                    {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary" value="Login">
                                        Register
                                    </button>
                                </div>
                                <p>Already Have an account? Please <Link className="text-primary hover:underline" to="/">Login</Link></p>
                                <div className="divider">OR</div>
                                <div
                                    onClick={handleGoogleSignIn}
                                    className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer rounded-lg hover:bg-slate-100'
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

export default Register;