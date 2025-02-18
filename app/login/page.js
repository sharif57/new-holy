"use client";
import { Button, Input, Form } from "antd";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "../redux/features/authSlice";
import Link from "next/link";
import Cookies from "js-cookie";
import Swal from "sweetalert2"; 
import { saveTokens } from "../service/authService";

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
      
        await saveTokens(response.data.accessToken)
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
            <Input placeholder="Email" className="rounded-lg py-3" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" className="rounded-lg py-3" />
          </Form.Item>

          <div className="flex justify-end">
            <Link href="/forgotPass">
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
          <Link href="/register" passHref>
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
