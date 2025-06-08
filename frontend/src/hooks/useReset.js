import { useState } from "react"
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const useReset = () => {
    const [loading, setLoading] = useState(false);
    const {token} = useParams();

    const reset = async (password,confirmPassword) => {
        const success = handleInputErrors(password,confirmPassword);
        if (!success) return;

        setLoading(true);


        try {
            const res = await fetch('/api/auth/reset/'+token, {
                method:'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password,confirmPassword }),
            });

            const data = await res.json();

            

            if (data.error) {
                throw new Error(data.error)
            }
            if(data){
                toast.success("Password reset successful");
            }
            //localStorage.setItem("user-info", JSON.stringify(data));
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, reset };
};

export default useReset;

function handleInputErrors(password,confirmPassword) {
    if (!password || !confirmPassword) {
        toast.error("Please fill all the fields")
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return false;
    }
    return true;
}