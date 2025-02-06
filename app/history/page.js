/* eslint-disable @next/next/no-img-element */

"use client";

import { Input, Pagination } from "antd";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Search } from "lucide-react";
import Link from "next/link";
import { useAllHistoryQuery } from "../redux/features/quesationSlice";
import { HiMenu } from "react-icons/hi";
import { useUserProfileQuery } from "../redux/features/userSlice";

const MainMessagePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const { data: allHistory } = useAllHistoryQuery();
  const { data: userProfile, isLoading, error } = useUserProfileQuery();
  const [filteredChats, setFilteredChats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 7; // Items to show per page

  useEffect(() => {
    if (allHistory?.data?.result) {
      setFilteredChats(allHistory.data.result); // Initialize chats
    }
  }, [allHistory]);

  // Search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allHistory?.data?.result.filter((chat) =>
      chat.question.toLowerCase().includes(query)
    );
    setFilteredChats(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Pagination logic: Get items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedChats = filteredChats.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
  
    

      {/* Main Content */}
      <div className="flex-grow lg:p-4 lg:pl-8">
        {/* Header Section */}
        <div className=" lg:p-6">
          <div className="lg:flex justify-between mb-6 max-w-3xl   mx-auto">
            <h1 className="text-xl text-center md:text-2xl font-bold">
              What is the main message of the Bible?
            </h1>
            <div>
              <Link href={"/chat"}>
                <div className="flex items-center justify-center gap-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 19H11V15H18V11H22V19H19.5L18 20.5L16.5 19Z"
                      stroke="#FB9B24"
                      strokeWidth="2"
                    />
                    <path
                      d="M2 3H18V15H8.5L6.5 17L4.5 15H2V3Z"
                      stroke="#FB9B24"
                      strokeWidth="2"
                    />
                    <path d="M7.5 9H12" stroke="#FB9B24" strokeWidth="2" />
                    <path d="M10 6L10 12" stroke="#FB9B24" strokeWidth="2" />
                  </svg>
                  <h2 className="text-[18px] font-bold text-[#fb9b24]">
                    Start new chat
                  </h2>
                </div>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="mb-8">
              <Input
                className="py-2 rounded-2xl w-full"
                size="large"
                placeholder="Search your chats..."
                prefix={<Search className="text-gray-400" />}
                onChange={handleSearch}
              />
            </div>

            {/* Chat List */}
            <div className="space-y-4">
              {paginatedChats.length > 0 ? (
                paginatedChats.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-base font-semibold text-gray-800">
                      {/* {item.question} */}
                      {item.path ? item.path : item.fileQuestion}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(item.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No chats found</p>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={filteredChats.length}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMessagePage;
