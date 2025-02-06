// "use client";
// import React from "react";

// import {  Input } from "antd";
// import { useResetPasswordMutation } from "@/app/redux/features/authSlice";



// export default function ResetPassword() {
//   const [resetPassword] = useResetPasswordMutation()
//   return (
//     <div className="lg:flex items-center justify-center font-lora h-screen">
   

//       {/* Input Fields Section */}
//       <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
//       <h1 className="text-[32px]  font-bold text-primaryText text-center pb-2">
//       Create Password
//         </h1>
//         <p className=" mx-auto text-center">
//         Create your new password for your account
//         </p>
//         <div className="mb-4 mt-4">
//           <Input
//             size="large"
//             placeholder="Enter Password"

//             required
//           />
//         </div>
//         <div className="mb-4 mt-4">
//           <Input
//             size="large"
//             placeholder="Re-enter Password"

//             required
//           />
//         </div>

//         <div className="pt-6">
//         <button className="w-full py-2 text-lg font-normal font-lora text-white bg-[#dd800c] rounded-lg shadow-md hover:bg-[#c4710b] hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-[#dd800c] focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed">
//         Continue
//           </button>
//         </div>
        
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import { Input, message } from "antd";
import { useResetPasswordMutation } from "@/app/redux/features/authSlice";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      message.error("Both password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword({
        newPassword,
        confirmPassword,
      }).unwrap();

      if (response.success) {
        message.success(response.message || "Password reset successfully!");
        router.push("/auth"); // Redirect to login page after success
      } else {
        message.error(response.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      message.error(error?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="lg:flex items-center justify-center font-lora h-screen">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-[32px] font-bold text-primaryText text-center pb-2">
          Create Password
        </h1>
        <p className="mx-auto text-center">
          Create your new password for your account
        </p>
        <div className="mb-4 mt-4">
          <Input
            size="large"
            placeholder="Enter Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 mt-4">
          <Input
            size="large"
            placeholder="Re-enter Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="pt-6">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-2 text-lg font-normal font-lora text-white bg-[#dd800c] rounded-lg shadow-md hover:bg-[#c4710b] hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-[#dd800c] focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
