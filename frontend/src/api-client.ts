import { RegisterFormData } from "./pages/Register"
import { SigninFormData } from "./pages/SignIn";
import {HotelType} from "../../backend/src/shared/types"


//fetch requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
//apiClient.register
export const register = async (formData:RegisterFormData) =>{
    const response =  await fetch(`${API_BASE_URL}/api/users/register`,{            // fetch from users/register[backend]
        method:'POST',
        credentials: "include",
        headers:{
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(formData),
    });
    const responseBody= await response.json();

    if(!response.ok){
        throw new Error(responseBody.message)
    }
}

// apliClient.signIn
export const signIn =async(formData: SigninFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,{         //fetch from auth/login[backend]
        method:'POST',
        credentials: "include",
        headers:{
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(formData),
    });
    const body = await response.json();
    if(!response.ok){
        throw new Error(body.message)
    };
    return body;
}
//apiClient.validateToken
export const validateToken = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{        //fetch from /auth/validate-token
        credentials: "include",
    })
    if(!response.ok){
        throw new Error('Invalid Token');
    }
    return response.json();
}

// apiClient.signout
export const signout = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{            //fetch from /auth/logout
        credentials: "include",
        method:'POST',
    });

    if(!response.ok){
        throw new Error('Error during Sign out');
}
};
//apiClient.addMyHotel
export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {         // fetch from /my-hotels
      method: "POST",
      credentials: "include",
      body: hotelFormData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to add hotel");
    }
  
    return response.json();
  };
  //apiClient.fetchMyHotels 

  export const fetchMyHotels = async ():Promise<HotelType[]>=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
        credentials: "include", // send http cookie along with fetch req
    })
    if (!response.ok) {
        throw new Error("Error Fetching Hotels");
      }
    
      return response.json();
  };


  export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching Hotels");
    }
  
    return response.json();
  };

  export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
      {
        method: "PUT",
        body: hotelFormData,
        credentials: "include",
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to update Hotel");
    }
  
    return response.json();
  };