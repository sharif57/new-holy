'use server'
const { cookies } = require("next/headers");

export const saveTokens =async(token)=>{
    (await cookies()).set('token', token);
 
}


export const getCurrentUser = async () => {
    const token = (await cookies()).get("token")?.value;
    
    return token
  };

  export const logout = async () => {
    (await cookies()).delete("token");
  };