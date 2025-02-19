import { XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PaymentErrorPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden animate-fade-in-up">
        <div className="bg-red-500 text-white p-8 flex flex-col items-center justify-center">
          <XCircle size={64} className="mb-4 animate-shake animate-bounce" />
          <h1 className="text-3xl font-bold text-center">Payment Failed!</h1>
        </div>
        <div className="p-6 text-center">
          <p className="text-xl text-gray-700 mb-6">
            Oops! Something went wrong with your transaction. Please try again.
          </p>
          <Link
            href="/payment"
            className="inline-block w-full bg-[#D9534F] text-white text-center py-3 px-6 rounded-lg hover:bg-[#C9302C] transition duration-300 ease-in-out transform hover:scale-105"
          >
            Retry Payment
          </Link>
       
        </div>
      </div>
    </div>
  );
}
