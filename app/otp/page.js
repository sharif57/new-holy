// "use client";
// import React, { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// import toast from "react-hot-toast";
// import OtpInput from "react-otp-input";
// import { useVerifyEmailMutation } from "@/app/redux/features/authSlice";


//   function VerifyEmail() {
//   const router = useRouter();
//   const [otp, setOtp] = useState("");
//   const searchParams = useSearchParams();
//   const [verifyEmail] = useVerifyEmailMutation(); // Correct destructuring

//   const email = searchParams.get("email");

//   console.log(email, 'email');

//   const handleSubmit = async () => {
//     const optNumber = parseInt(otp);

//     if (isNaN(optNumber)) {
//       toast.error("Please enter a valid OTP.");
//       return;
//     }

//     try {
//       const result = await verifyEmail({ email, oneTimeCode: optNumber }); // Use verifyEmail
//       console.log(result, 'asdadasd');
//       router.push("/login");
//       console.log(result, 'asdadasd');
//     } catch (error) {
//       toast.error("Failed to verify email. Please try again.");
//       console.error("Error verifying email:", error);
//     }
//   };


//   return (
//     <div className="lg:flex items-center justify-center font-lora gap-10 h-screen">
//       {/* Input Fields Section */}
//       <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
//         <h1 className="text-[32px] font-bold text-primaryText text-center pb-2">
//           Verify with OTP
//         </h1>
//         <p className="mx-auto text-center">
//           Please enter the OTP we have sent you in your email.
//         </p>
//         <div className="mb-6 mt-6 ml-6 ">
//           <OtpInput
//             value={otp}
//             onChange={setOtp}
//             numInputs={6}
//             separator={<span className="mx-2 text-lg text-gray-500">-</span>}
//             renderSeparator={
//               <span className=" text-lg text-gray-500">-</span>
//             }
//             renderInput={(props) => (
//               <input
//                 {...props}
//                 className=" text-center  mx-2  text-5xl text-black font-medium border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               />
//             )}
//           />
//         </div>

//         <div onClick={handleSubmit} className="pt-6">
//           <button className="w-full py-2 text-lg font-normal font-lora text-white bg-[#dd800c] rounded-lg shadow-md hover:bg-[#c4710b] hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-[#dd800c] focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import { useVerifyEmailMutation } from "@/app/redux/features/authSlice";

function VerifyEmailContent() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const searchParams = useSearchParams();
  const [verifyEmail] = useVerifyEmailMutation();
  
  const email = searchParams.get("email");

  console.log(email, "email");

  const handleSubmit = async () => {
    const optNumber = parseInt(otp);

    if (isNaN(optNumber)) {
      toast.error("Please enter a valid OTP.");
      return;
    }

    try {
      const result = await verifyEmail({ email, oneTimeCode: optNumber });
      console.log(result, "Verification response");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to verify email. Please try again.");
      console.error("Error verifying email:", error);
    }
  };

  return (
    <div className="lg:flex items-center justify-center font-lora gap-10 h-screen">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-[32px] font-bold text-primaryText text-center pb-2">
          Verify with OTP
        </h1>
        <p className="mx-auto text-center">
          Please enter the OTP we have sent you in your email.
        </p>
        <div className="mb-6 mt-6 ml-6">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            separator={<span className="mx-2 text-lg text-gray-500">-</span>}
            renderSeparator={<span className="text-lg text-gray-500">-</span>}
            renderInput={(props) => (
              <input
                {...props}
                className="text-center mx-2 text-5xl text-black font-medium border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            )}
          />
        </div>
        <div onClick={handleSubmit} className="pt-6">
          <button className="w-full py-2 text-lg font-normal font-lora text-white bg-[#dd800c] rounded-lg shadow-md hover:bg-[#c4710b] hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-[#dd800c] focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
