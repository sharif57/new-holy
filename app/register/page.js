"use client";
import { Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useRegisterMutation } from "@/app/redux/features/authSlice";

const Register = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (values) => {
    const { name, email, password } = values;
    const payload = { name, email, password };

    try {
      const res = await register(payload);

      if (res.error) {
        console.error("Error Response:", res.error);
        toast.error(res.error?.data?.message || "Registration failed!");
        return;
      }

      if (res.data) {
        toast.success(res.data?.message || "Account created successfully!");
        form.resetFields();
        router.push(`/otp?email=${email}`); // Pass email to OTP page
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      toast.error(error.message || "An unexpected error occurred!");
    }
  };

  return (
    <div className="w-full h-screen lg:px-5 px-2 flex justify-center items-center">
      <div className="bg-white py-10 lg:px-8 rounded-lg shadow-md w-[500px] mx-1">
        {/* Form Section */}
        <div className={" p-5"}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-5"
          >
            <div className="text-center space-y-3">
              <h1 className="text-[30px] font-semibold text-primaryText">Create an Account</h1>
              <p>Hello there, let’s start your journey with us.</p>
            </div>

            {/* Name Input */}
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input size="large" placeholder="Enter your name" />
            </Form.Item>

            {/* Email Input */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your email address" />
            </Form.Item>

            {/* Password Input */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter your password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 text-lg font-normal text-white bg-[#dd800c] rounded-lg shadow-md ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "hover:bg-[#c4710b] hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-[#dd800c] focus:outline-none"
                }`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            {/* Login Link */}
            {/* <div className="mt-5 text-center">
              <span>Already have an account? </span>
              <Link
                href="/login"
                className="underline text-blue-300 font-medium text-xs"
              >
                Log In
              </Link>
            </div> */}
            <div className="flex justify-center items-center gap-2 mt-6 text-sm text-gray-600">
              <p className="lg:text-lg">Already have an account?</p>
              <Link href="/login" passHref>
                <button
                  className="lg:text-lg text-black  hover:text-primary-dark font-medium p-0 h-auto transition-colors duration-200"
                >
                  Log In
                </button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
