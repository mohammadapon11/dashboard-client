import { useQuery } from "@tanstack/react-query";
import axios from 'axios'
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ["isAdmin", user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://dashboard-server-ruby.vercel.app/users/admin/${user?.email}`);
            console.log("from axios isAdmin", res);
            return res.data;
        }
    })
    return [isAdmin, isAdminLoading]
}

export default useAdmin;