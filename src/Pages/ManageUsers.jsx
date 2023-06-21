import { useEffect, useState } from "react";
import axios from 'axios'

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(false);

    // get all users
    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [refresh])

    //  Role make
    const handleRole = (id, role) => {

        axios.put(`http://localhost:5000/usersRole/${id}`, { role })
            .then(res => {
                setRefresh(!refresh)
                console.log("from admin", res.data)
            })
    }

    // users table
    return (
        <div>
            <div>
                <h1 className="mt-20 mb-10 text-4xl text-center font-semibold">All Users Here</h1>
            </div>
            <div className="overflow-x-auto lg:w-4/5 mx-auto border-2">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>User Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* here users array map */}
                        {
                            users?.map((user, index) => <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.email}</td>
                                <td className={`font-semibold ${user?.role === "admin" ? "text-teal-500" : user?.role === "instructor" ? "text-green-500" : "text-fuchsia-500"}`}>{user?.role ? user?.role : "student"}</td>
                                <td className="flex gap-4">
                                    <button
                                        onClick={() => handleRole(user?._id, "admin")}
                                        disabled={user?.role === "admin" && true} className="btn btn-primary btn-xs">Make Admin</button>
                                    <button onClick={() => handleRole(user?._id, "instructor")}
                                        disabled={user?.role === "instructor" && true} className="btn btn-secondary btn-xs">Make Instructor</button>
                                    <button onClick={() => handleRole(user?._id, "general")}
                                        disabled={user?.role === "general" && true} className="btn btn-accent btn-xs">Make general user</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;