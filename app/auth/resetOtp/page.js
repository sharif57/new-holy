

"use client";
import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import { useVerifyEmailMutation } from "@/app/redux/features/authSlice";

function RVerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const email = searchParams.get("email");

  const handleSubmit = async () => {
    if (!otp || otp.length !== 6 || isNaN(otp)) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await verifyEmail({
        email,
        oneTimeCode: parseInt(otp),
      }).unwrap();

      if (response.success) {
        toast.success(response.message || "Verification successful!");
        // Store the token in session storage for further use
        localStorage.setItem("Authorization", response.data);
        // Redirect to create a new password
        router.push("/auth/createPass");
      } else {
        toast.error(response.message || "Verification failed.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error(
        error?.data?.message || "An error occurred. Please try again."
      );
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
        <div className="flex justify-center items-center mb-6 mt-6">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            separator={<span className="text-lg text-gray-500">-</span>}
            renderInput={(props) => (
              <input
                {...props}
                className="text-center  mx-2  text-5xl text-black font-medium border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            )}
          />
        </div>

        <div className="pt-6">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-2 text-lg font-normal font-lora text-white bg-[#dd800c] rounded-lg shadow-md hover:bg-[#c4710b] hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-[#dd800c] focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}


export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RVerifyEmail />
    </Suspense>
  );
}