
"use client";
import React from "react";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useForgotPasswordMutation } from "@/app/redux/features/authSlice";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      // Call the forgotPassword API with user input values
      const response = await forgotPassword(values).unwrap();

      // Handle API response
      if (response.success) {
        message.success(response.message || "OTP has been sent to your email!");
        // Navigate to the OTP verification page and pass the email as a query param
        router.push(`/resetOtp?email=${values.email}`);
      } else {
        message.error(response.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      // Show error message from the API or fallback to a generic message
      message.error(error.data?.message || "An error occurred. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Validation Failed:", errorInfo);
    message.error("Please check the form and try again.");
  };

  return (
    <div className="lg:flex items-center justify-center font-lora h-screen">
      {/* Input Fields Section */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-[32px] font-bold text-primaryText text-center pb-2">
          Forgot Your Password?
        </h1>
        <p className="mx-auto text-center">
          Please enter your email to receive an OTP for password reset.
        </p>

        <Form
          name="forgotPassword"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="w-full space-y-[24px] mt-6"
        >
          {/* Email Input */}
          <Form.Item
            className="text-start"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email address!",
              },
            ]}
          >
            <Input
              placeholder="Email"
              name="email"
              style={{
                border: "1px solid #033f4d",
                height: "56px",
                background: "#ffffff",
                outline: "none",
                color: "#646262",
                padding: "16px 12px",
              }}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              style={{
                backgroundColor: "#dd800c",
                height: "56px",
                color: "#ffffff",
              }}
              htmlType="submit"
              loading={isLoading} // Show loading spinner during API call
              className="w-full h-[56px] px-2 font-medium rounded-lg mt-[10px]"
            >
              Send OTP
            </Button>
          </Form.Item>
        </Form>

        {/* Link to Login Page */}
        <div className="pt-4 text-center">
          <p>
            Remember your password?{" "}
            <Link href="/login">
              <span className="text-[#dd800c] hover:underline cursor-pointer">
                Log In
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
