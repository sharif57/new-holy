/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/no-unescaped-entities */
// "use client";
// import React from "react";
// import {
//   EyeInvisibleOutlined,
//   EyeTwoTone,
// } from "@ant-design/icons";
// import { Button, Checkbox, Input } from "antd";
// import Link from "next/link";

// const onChange = (e) => {
//   console.log(`checked = ${e.target.checked}`);
// };
// export default function login() {
//   return (
//     <div className="lg:flex items-center justify-center font-lora  h-screen">
//       {/* Input Fields Section */}
//       <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
// <div className="text-center space-y-4">
//   <h1 className="text-[30px] font-semibold text-primaryText text-center ">
//     Sign In Now
//   </h1>
//   <p className="text-center pb-4">Welcome back! Select method log in</p>
// </div>
//         <div className="mb-4">
//         <label
//             htmlFor="email"
//             className="block text-[18px] font-normal  text-gray-700 mb-2"
//           >
//             Email
//           </label>
//           <Input
//             size="large"
//             placeholder="Enter Your Email"

//           />
//         </div>
//         <div className="mb-4">
//         <label
//             htmlFor="Password"
//             className="block text-[18px] font-normal  text-gray-700 mb-2"
//           >
//             Password
//           </label>
//           <Input.Password
//             size="large"

//             placeholder="Enter Password"
//             iconRender={(visible) =>
//               visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//             }
//           />
//         </div>
//         <div className="flex justify-between items-center text-[15px] font-normal text-primaryText">
//           <Checkbox
//             onChange={onChange}
//             className="text-[15px] font-normal text-primaryText font-lora"
//           >
//             Remember me
//           </Checkbox>
// <Link href="auth/forgotPass">
//   <p className="text-primaryText hover:underline cursor-pointer text-yellow-500">
//     Forgot password?
//   </p>
// </Link>
//         </div>
//         <div className="pt-6">
//           <button className="w-full py-4 text-lg font-normal font-lora text-white bg-[#dd800c] rounded-lg shadow-md hover:bg-[#c4710b] hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-[#dd800c] focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed">
//             Sign In Now
//           </button>
//         </div>
//         <div>
// <div className="flex justify-center items-center gap-2 mt-3">
//   <p>Don't have an account?</p>
//   <Link href="auth/register" passHref>
//     <Button
//       className="text-[15px] font-normal text-primaryText font-lora"
//       type="link"
//     >
//       Sign Up
//     </Button>
//   </Link>
// </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { Button, Checkbox, Input, Form, message } from "antd";
// import { useRouter } from "next/navigation";
// import { useLoginMutation } from "../redux/features/authSlice";
// import Link from "next/link";

// const SignIn = () => {
//   const router = useRouter();
//   const [login, { isLoading }] = useLoginMutation();
//   console.log(login, 'login');

//   const onFinish = async (values) => {
//     try {
//       const response = await login({
//         email: values.email,
//         password: values.password,
//       }).unwrap();

//       // Handle the response data
//       if (response.success) {
//         // Save tokens and user data in localStorage or cookies
//         localStorage.setItem("accessToken", response.data.accessToken);
//         localStorage.setItem("refreshToken", response.data.refreshToken);
//         localStorage.setItem("user", JSON.stringify(response.data.user));

//         message.success("Login successful!");
//         router.push("/chat");
//       } else {
//         message.error(response.message || "Login failed!");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       message.error(error.data?.message || "An error occurred during login.");
//     }
//   };

//   return (
//     <div className="w-full h-screen px-5 flex justify-center items-center">
//       {/* Sign-In Form */}
//       <div className="bg-white py-10 px-8 rounded-lg shadow-md w-[500px] mx-1">
//         <div className="text-center space-y-4">
//           <h1 className="text-[30px] font-semibold text-primaryText text-center ">
//             Log In Now
//           </h1>
//           <p className="text-center pb-4">Welcome back! Select method log in</p>
//         </div>
//         <Form
//           name="sign_in"
//           layout="vertical"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           className="space-y-6"
//         >
//           {/* Email Input */}
//           <Form.Item
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your email!",
//                 type: "email",
//               },
//             ]}
//           >
//             <Input
//               placeholder="Email"
//               className="rounded-lg"
//               style={{
//                 border: "1px solid #",
//                 height: "56px",
//                 backgroundColor: "#ffffff",
//                 padding: "16px 12px",
//                 color: "#646262",
//                 // borderRadius: "30px",
//               }}
//             />
//           </Form.Item>

//           {/* Password Input */}
//           <Form.Item
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your password!",
//               },
//             ]}
//           >
//             <Input.Password
//               placeholder="Password"
//               className="rounded-lg"
//               style={{
//                 border: "1px solid #033f4d",
//                 height: "56px",
//                 backgroundColor: "#ffffff",
//                 padding: "16px 12px",
//                 color: "#646262",
//                 // borderRadius: "30px",
//               }}
//             />
//           </Form.Item>

//           {/* Remember Me and Forgot Password */}
//           <div className="flex justify-end items-center">
//             {/* <Form.Item name="remember" valuePropName="checked" noStyle>
//               <Checkbox className="text-[#1F8D84]">Remember me</Checkbox>
//             </Form.Item> */}
//             <Link href="auth/forgotPass">
//               <p className="text-primaryText hover:underline cursor-pointer text-yellow-500">
//                 Forgot password?
//               </p>
//             </Link>
//           </div>

//           {/* Sign-In Button */}
//           <Form.Item>
//             <Button
//               htmlType="submit"
//               className="w-full py-7 text-lg font-normal text-white bg-[#dd800c] rounded-lg shadow-md"
//               style={{
//                 backgroundColor: "#dd800c",
//               }}
//               loading={isLoading} // Show loading while API request is in progress
//             >
//               Sign In Now
//             </Button>
//           </Form.Item>
//         </Form>

//         {/* Additional Links */}
//         <div className="flex justify-center items-center gap-2 mt-3">
//           <p>Don't have an account?</p>
//           <Link href="auth/register" passHref>
//             <Button
//               className="text-[15px] font-normal text-primaryText font-lora"
//               type="link"
//             >
//               Sign Up
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;


// "use client";
// import { Button, Input, Form, message, Alert } from "antd";
// import { useRouter } from "next/navigation";
// import { useLoginMutation } from "../redux/features/authSlice";
// import Link from "next/link";
// import Cookies from "js-cookie";


// const SignIn = () => {
//   const router = useRouter();
//   const [login, { isLoading }] = useLoginMutation();

//   const onFinish = async (values) => {
//     try {
//       const response = await login({
//         email: values.email,
//         password: values.password,
//       }).unwrap(); // Unwrap the promise to handle errors explicitly

//       // Check if login is successful
//       if (response.success) {
//         // Save tokens and user data in localStorage
//         localStorage.setItem("accessToken", response.data.accessToken);
//         Cookies.set("accessToken", response.data.accessToken, { expires: 1, path: "/", sameSite: "Strict", secure: true });
//         localStorage.setItem("refreshToken", response.data.refreshToken);
//         localStorage.setItem("user", JSON.stringify(response.data.user));

//         message.success("Login successful!");
//         // alert('Login successful!');
//         <Alert message="Success Tips" type="success" showIcon />

        
//         router.push("/chat"); // Navigate to the desired page
        
//       } else {
//         message.error(response.message || "Login failed!");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       message.error(
//         error?.data?.message || "An error occurred during login."
//       );
//     }
//   };

//   return (
//     <div className="w-full h-screen px-5 flex justify-center items-center">
//       {/* Sign-In Form */}
//       <div className="bg-white py-10 px-8 rounded-lg shadow-md w-[500px] mx-1">
//         <div className="text-center space-y-4">
//           <h1 className="text-[30px] font-semibold text-primaryText">
//             Log In Now
//           </h1>
//           <p className="text-center pb-4">Welcome back! Log in to your account</p>
//         </div>
//         <Form
//           name="sign_in"
//           layout="vertical"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           className="space-y-6"
//         >
//           {/* Email Input */}
//           <Form.Item
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your email!",
//                 type: "email",
//               },
//             ]}
//           >
//             <Input
//               placeholder="Email"
//               className="rounded-lg"
//               style={{
//                 height: "56px",
//                 padding: "16px 12px",
//                 color: "#646262",
//               }}
//             />
//           </Form.Item>

//           {/* Password Input */}
//           <Form.Item
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your password!",
//               },
//             ]}
//           >
//             <Input.Password
//               placeholder="Password"
//               className="rounded-lg"
//               style={{
//                 height: "56px",
//                 padding: "16px 12px",
//                 color: "#646262",
//               }}
//             />
//           </Form.Item>

//           {/* Forgot Password */}
//           <div className="flex justify-end">
//             <Link href="auth/forgotPass">
//               <p className="text-yellow-500 hover:underline cursor-pointer">
//                 Forgot password?
//               </p>
//             </Link>
//           </div>

//           {/* Sign-In Button */}
//           <Form.Item>
//             <Button
//               htmlType="submit"
//               className="w-full py-7 text-lg text-white bg-[#dd800c] rounded-lg shadow-md"
//               loading={isLoading} // Show loading spinner during login
//             >
//               Sign In Now
//             </Button>
//           </Form.Item>
//         </Form>

//         {/* Additional Links */}
//         <div className="flex justify-center items-center gap-2 mt-3">
//           <p>Don't have an account?</p>
//           <Link href="auth/register" passHref>
//             <Button className="text-primaryText font-lora" type="link">
//               Sign Up
//             </Button>
//           </Link>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default SignIn;


"use client";
import { Button, Input, Form } from "antd";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "../redux/features/authSlice";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState } from "react";
import Swal from "sweetalert2"; 

const SignIn = () => {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      }).unwrap(); // Unwrap the promise to handle errors explicitly

      if (response.success) {
        localStorage.setItem("accessToken", response.data.accessToken);
        Cookies.set("accessToken", response.data.accessToken, {
          expires: 1,
          path: "/",
          sameSite: "Strict",
          secure: true,
        });
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        Swal.fire({
          title: "Login Successful!",
          text: "You have successfully logged in.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          router.push("/chat"); 
        }, 1500);
      } else {
        Swal.fire({
          title: "Login Failed",
          text: response.message || "Invalid credentials!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Something went wrong. Try again!",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full h-screen px-5 flex justify-center items-center">
      <div className="bg-white py-10 px-8 rounded-lg shadow-md w-[500px] mx-1">
        <div className="text-center space-y-4">
          <h1 className="text-[30px] font-semibold text-primaryText">
            Log In Now
          </h1>
          <p className="text-center pb-4">
            Welcome back! Log in to your account
          </p>
        </div>

        <Form
          name="sign_in"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="space-y-6"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!", type: "email" },
            ]}
          >
            <Input placeholder="Email" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" className="rounded-lg" />
          </Form.Item>

          <div className="flex justify-end">
            <Link href="auth/forgotPass">
              <p className="text-yellow-500 hover:underline cursor-pointer">
                Forgot password?
              </p>
            </Link>
          </div>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full py-7 text-lg text-white bg-[#dd800c] rounded-lg shadow-md"
              loading={isLoading}
            >
              Sign In Now
            </Button>
          </Form.Item>
        </Form>

        <div className="flex justify-center items-center gap-2 mt-3">
          <p>Don't have an account?</p>
          <Link href="auth/register" passHref>
            <Button className="text-primaryText font-lora" type="link">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
