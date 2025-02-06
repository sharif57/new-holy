/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useUserProfileQuery } from "../redux/features/userSlice";
import { usePreviousQuery, useQuestionGetAllQuery } from "../redux/features/quesationSlice";
import { ArrowRightFromLine, MessageSquareDiff, MessagesSquare } from "lucide-react";
import Link from "next/link";


export default function Sidebar() {
   const { data: userProfile, isLoading, error } = useUserProfileQuery();
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   
  
    const { data: questionGetAll } = useQuestionGetAllQuery();
    const { data: previous } = usePreviousQuery();
  
  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 lg:w-80 w-64 bg-[#dedcd1] h-full z-40 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <aside className="h-full flex flex-col justify-between">
          <div className="p-4 text-[#535136] text-center font-bold text-4xl border-b">
            Holybot
          </div>
          <div className="mt-3 text-center text-2xl font-semibold text-[#fb9b24] mb-3 flex items-center justify-center gap-2 cursor-pointer">
            <MessageSquareDiff />
            <h1>Start new chat </h1>
          </div>

          <div>
            <div className="mb-5">
              {/* Section Header */}
              <h1 className="pl-5 font-semibold text-lg mb-3">Recent</h1>

              <div className="space-y-3">
                {questionGetAll?.data?.result &&
                  questionGetAll.data.result.slice(0, 5).map((item) => (
                    <Link href={`/chat/${item._id}`} key={item._id}>
                      <div className="flex items-center gap-4 bg-[#ecebe5] hover:bg-gray-100 cursor-pointer px-3 py-3 mx-4 rounded-full shadow-sm transition-all duration-150">
                        <MessagesSquare className="text-gray-700" />
                        <p className="text-sm font-medium text-gray-700">
                          {item.question.length > 28
                            ? `${item.question.slice(0, 28)}...`
                            : item.question}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-6">
            <div className="mb-5">
              <h1 className="pl-5 font-semibold text-lg mb-3">Previous</h1>

              {/* Dynamic List */}
              <div className="space-y-3">
                {previous?.data?.result &&
                  previous.data.result.slice(0, 6).map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 bg-[#ecebe5] hover:bg-gray-100 cursor-pointer px-3 py-3 mx-4 rounded-full shadow-sm transition-all duration-150"
                    >
                      <MessagesSquare className="text-gray-700" />
                      <p className="text-sm font-medium text-gray-700">
                        {item.question.slice(0, 10)}...
                      </p>
                    </div>
                  ))}
              </div>
              <div className="flex justify-center mt-6">
                <Link
                  href="/history"
                  className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-600 font-medium text-sm rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md hover:text-blue-700 transition-all duration-300"
                >
                  View All Previous Chats
                  <ArrowRightFromLine className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-auto p-4">
            <div className="text-black bg-gray-200 px-4 py-2 rounded-full font-medium flex justify-center items-center gap-2">
              <img
                src={userProfile?.data?.image}
                className="w-8 h-8 object-cover rounded-full"
                alt="User Avatar"
              />
              <span className="text-sm">{userProfile?.data?.email}</span>
              {/* <div>
                <span className="text-sm font-medium text-gray-700">
                  Subscription:{" "}
                  {userProfile?.data?.subscription ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Inactive</span>
                  )}
                </span>
              </div> */}
            </div>
          </div>
        </aside>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
