import { CheckCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 animate-">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden animate-fade-in-up">
          <div className="bg-green-500 text-white p-8 flex flex-col items-center justify-center">
            <CheckCircle size={64} className="mb-4 animate-bounce" />
            <h1 className="text-3xl font-bold text-center">
              Payment Successful!
            </h1>
          </div>
          <div className="p-6 text-center">
            <p className="text-xl text-gray-700 mb-6">
              Thank you for your purchase. Your transaction has been completed
              successfully.
            </p>
            <Link
              href="/chat"
              className="inline-block w-full bg-[#345C8C] text-white text-center py-3 px-6 rounded-lg hover:bg-[#345C8C] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Continue chatting
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
