import { useState } from "react"
import toast from "react-hot-toast";

const useForgot = () => {
    const [loading, setLoading] = useState(false);

    const reset = async (email) => {
        const success = handleInputErrors(email);
        if (!success) return;

        setLoading(true);


        try {
            const res = await fetch('/api/auth/forgot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            

            if (data.error) {
                throw new Error(data.error)
            }
            toast.success("Check your email for the reset link");

            //localStorage.setItem("user-info", JSON.stringify(data));
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, reset };
};

export default useForgot;

function handleInputErrors(email) {
    if (!email) {
        toast.error("Please fill all the fields")
        return false;
    }
    return true;
}