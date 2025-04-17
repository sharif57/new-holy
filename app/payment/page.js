"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  useGetAllPackageQuery,
  usePackagePostMutation,
  useSubscriptionQuery,
} from "../redux/features/packageSlice";
import Link from "next/link";

function RippleButton({ children, onClick, className = "", disabled = false }) {
  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const ripple = {
      x: event.clientX - rect.left - radius,
      y: event.clientY - rect.top - radius,
      diameter,
      id: Date.now(),
    };

    setRipples((prevRipples) => [...prevRipples, ripple]);
    if (!disabled) onClick?.();

    setTimeout(() => {
      setRipples((prevRipples) =>
        prevRipples.filter((r) => r.id !== ripple.id)
      );
    }, 600);
  };

  return (
    <button
      className={`relative overflow-hidden ${className} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={createRipple}
      disabled={disabled}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.diameter,
            height: ripple.diameter,
          }}
        />
      ))}
      {children}
    </button>
  );
}

function App() {
  const { data: packagesData, isLoading, error } = useGetAllPackageQuery();
  const { data: subscription } = useSubscriptionQuery();

  const [packagePost] = usePackagePostMutation();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const isAlreadySubscribed =
    subscription?.data?.package._id === selectedPackage?._id;

  useEffect(() => {
    if (packagesData?.data) {
      setSelectedPackage(packagesData.data[0]); // Set the first package as default
    }
  }, [packagesData]);

  const handleSubmit = async () => {
    if (!selectedPackage) {
      console.error("No package selected");
      return;
    }

    if (isAlreadySubscribed) {
      return;
    }

    try {
      const result = await packagePost({
        packageId: selectedPackage._id,
      }).unwrap();

      // Save the Stripe payment URL
      if (result?.url) {
        setPaymentUrl(result.url);
        window.location.href = result.url; // Redirect user to the payment page
      }
    } catch (error) {
      console.error("Error subscribing to package:", error);
      alert("Failed to subscribe. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error loading packages</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 px-4 text-[#3d3929] space-y-5">
      {/* Logo and Title */}
      <Link href={"/chat"}>
        <div className="flex gap-3">
          <Image
            className="w-[22px] h-[33px]"
            src="/image/logo.png"
            alt="HolyBot logo"
            width={200}
            height={300}
          />
          <h1 className="text-3xl font-bold text-[#3d3929]">HolyBot</h1>
        </div>
      </Link>

      {/* Package Selector */}
      <div className="text-center mb-12">
        <h1 className="lg:text-5xl text-4xl font-normal text-[#3d3929] mb-8">
          {selectedPackage?.length > 0 ? "Choose your plan" : "Plan not updated yet !"}
        </h1>
        <div className="inline-flex rounded-full bg-[#e8e6dc] p-1">
          {packagesData?.data?.map((pkg) => (
            <RippleButton
              key={pkg._id}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedPackage?._id === pkg._id
                  ? "bg-zinc-700 text-white"
                  : "text-zinc-400"
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              {pkg.interval === "year" ? "Pay Yearly" : "Pay Monthly"}
            </RippleButton>
          ))}
        </div>
      </div>

      {/* Pricing Card */}
      {selectedPackage && (
        <div className="w-full max-w-sm border-2 bg-[#f6f4ef] text-[#3d3929] rounded-2xl p-6">
          <div className="mb-6">
            <Image
              src={"/image/pro.png"}
              height={200}
              width={200}
              alt="pro.png"
            />
            <h2 className="text-3xl font-bold text-black">
              {selectedPackage.name}
            </h2>
          </div>

          {/* Pricing and Description */}
          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">
                ${selectedPackage.unitAmount.toFixed(2)}
              </span>
              <span className="text-zinc-400 ml-1">
                /{selectedPackage.interval}
              </span>
            </div>
          </div>

          {/* Features List */}
          <ul className="space-y-4 mb-8 text-[#3d3929]">
            {selectedPackage.description.map((feature, index) => (
              <li
                key={index}
                className="flex items-center text-[#3d3929] font-medium"
              >
                <svg
                  className="w-5 h-5 mr-3 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <div>
            {/* Subscribe Button */}
            <RippleButton
              onClick={handleSubmit}
              disabled={isAlreadySubscribed}
              className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-colors"
            >
              Subscribe to {selectedPackage?.name || "Package"}
            </RippleButton>

            {/* Dynamic Anchor Tag */}
            {paymentUrl && (
              <a
                href={paymentUrl} // Dynamically set the payment URL
                target="_blank" // Open the link in a new tab
                rel="noopener noreferrer" // Security best practices
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                Proceed to Payment
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
