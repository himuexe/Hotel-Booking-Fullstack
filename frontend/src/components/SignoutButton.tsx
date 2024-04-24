import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";

const SignoutButton = ()=>{
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();
    const mutation = useMutation(apiClient.signout,{
        onSuccess: async()=>{
            await queryClient.invalidateQueries("validateToken");
            showToast({message:"Signed Out!",type: "SUCCESS"})
        },
        onError:(error:Error)=>{
            showToast({message:error.message, type: "ERROR"})
        }
    });
    const handleClick = ()=>{
        mutation.mutate();
    }
    return(
        <button className="text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white" onClick={handleClick} >Sign Out</button>
    )
}
export default SignoutButton;