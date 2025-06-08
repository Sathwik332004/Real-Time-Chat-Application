import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading,setLoading] = useState(false);
  const {setAuthUser}=useAuthContext();
  
  const signup= async({fullName,username,email,password,confirmPassword,gender}) => {
    const success = handleInputErrors({fullName,username,email,password,confirmPassword,gender})
    if(!success) return;

    setLoading(true);
    try{
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName,
                username,
                email,
                password,
                confirmPassword,
                gender
            }),
        });
        
        const data = await res.json();
        
        //Error Handling
        if (res.status === 800) {
          // Username already exists
          throw new Error("User or Email already exists");
        }
        
        if(data.error){
          throw new Error(data.error);
        }
        
        //console.log(data);
        
        //Local Storage
        localStorage.setItem("user-info",JSON.stringify(data));
        setAuthUser(data);


    }catch(error){
        toast.error(error.message)

    }finally{
        setLoading(false);
    }
  };
  return {loading,signup}
}

export default useSignup;

function handleInputErrors({fullName,username,email,password,confirmPassword,gender}) {
  if(!fullName || !username || !email || !password || !confirmPassword || !gender){
    toast.error("Please fill all the fields");
    return false;
  } 
  if(password !== confirmPassword){
    toast.error("Passwords do not match");
    return false;
  }
  if(password.length < 6){
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;

}
  
  