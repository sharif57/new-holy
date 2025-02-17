"use client";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { TbMessage2Down } from "react-icons/tb";
import SearchBar from "./components/SearchBar";
import { useRouter } from "next/navigation";
import { useUserProfileQuery } from "./redux/features/userSlice";

export default function HomeFirstPage() {

  const {data} =useUserProfileQuery()

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const router = useRouter(); // Router instance for navigation

  const handleViewAll = () => {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve accessToken from localStorage
    if (accessToken) {
      // Navigate to the history page if token exists
      router.push("/history");
    } else {
      // Navigate to the auth page if token does not exist
      router.push("/login");
    }
  };

  return (
    <div>
      <div className="max-w-4xl  mx-auto p-6">
        {/* Header Section */}
        <header className="text-center mb-6">
          <div className="flex justify-center items-center lg:w-2/5 mx-auto bg-secondary-dark text-white py-2 px-4 rounded-full mb-3">
            <span className="lg:text-[16px] font-normal ">
              Using limited free plan
            </span>
            <button className=" text-[#ffad36] lg:px-3 py-1 ml-2 font-bold lg:text-[20px]">
              Upgrade
            </button>
          </div>
          <div className="lg:flex justify-center items-center gap-5">
            <div className="text-center">
              <Image
                width={100}
                height={100}
                className="w-[40px] h-[60px] md:w-[80px] md:h-[120px] bg-center mx-auto"
                src="/image/logo.png"
                alt="logo"  
              />
            </div>
            <h1 className="lg:text-[52px] text-3xl font-normal font-sans leading-normal">
              {getGreeting()},  {data?.data?.name ? `${data.data.name}` : "HolyBot"}
            </h1>
          </div>
        </header>

        {/* Search Bar Section */}
        <SearchBar />

        {/* Main Content */}
        <main className="rounded-lg lg:p-6 lg:-mt-12">
          {/* Chat Input Section */}
          <div className="">
            <div className="lg:px-2">
              <div className="bg-[#edeae2] p-4 -mt-4 rounded-b-xl lg:px-8">
                <div className="pb-5 lg:flex justify-between items-center">
                  <h1>
                    Upload documents, images, and more to collaborate with
                    father
                  </h1>
                  <div className="flex gap-4 text-center items-center justify-center cursor-pointer">
                    <div className="flex gap-4 text-center items-center justify-center  cursor-pointer">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 6L9 3H15L16.5 6H7.5Z"
                          stroke="#5B5A4E"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20.5 6H3.5C2.67157 6 2 6.67157 2 7.5V19.5C2 20.3284 2.67157 21 3.5 21H20.5C21.3284 21 22 20.3284 22 19.5V7.5C22 6.67157 21.3284 6 20.5 6Z"
                          stroke="#5B5A4E"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 17.5C14.2092 17.5 16 15.7092 16 13.5C16 11.2908 14.2092 9.5 12 9.5C9.79085 9.5 8 11.2908 8 13.5C8 15.7092 9.79085 17.5 12 17.5Z"
                          stroke="#5B5A4E"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.3537 4.7826L4.9291 12.2072C3.17174 13.9646 3.17174 16.8138 4.9291 18.5712C6.68645 20.3285 9.5357 20.3285 11.293 18.5712L20.1319 9.73234C21.3034 8.56079 21.3034 6.66129 20.1319 5.48969C18.9603 4.31813 17.0608 4.31813 15.8892 5.48969L7.05045 14.3285C6.46465 14.9143 6.46465 15.8641 7.05045 16.4498C7.6362 17.0356 8.58595 17.0356 9.17175 16.4498L16.5963 9.02524"
                          stroke="#5B5A4E"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="lg:flex gap-3 mt-4 lg:space-y-0 space-y-4">
                  <button className="bg-[#e9e6dd] border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200">
                    What is the main message of the Bible?
                  </button>
                  <button className="bg-[#e9e6dd] border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200">
                    What is the shortest verse in the Bible?
                  </button>
                  <button className="bg-[#e9e6dd] border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200">
                    What did Jesus do at the Last Supper?
                  </button>
                </div>
              </div>
            </div>
          </div>

          <section className="pt-8">
            <div className="flex justify-between items-center pb-4">
              <div className="flex items-center gap-3 ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.5 5H6.5V22H20.5V5Z" stroke="#2C6CAE" />
                  <path
                    d="M17.5 5V2H4C3.72386 2 3.5 2.22386 3.5 2.5V19H6.5"
                    stroke="#2C6CAE"
                  />
                  <path d="M10.5 11H16.5" stroke="#2C6CAE" />
                  <path d="M10.5 15H16.5" stroke="#2C6CAE" />
                </svg>
                <h1 className="lg:text-xl font-medium"> Your recent chats</h1>
              </div>
              <div>
                <button
                  onClick={handleViewAll}
                  className="rounded-lg flex items-center gap-1 font-medium"
                >
                  View all <BsArrowRight />
                </button>
              </div>
            </div>
            <div className="lg:flex gap-4 lg:space-y-0 space-y-4">
              <div className="bg-white p-4 rounded-md shadow-md space-y-2">
                <TbMessage2Down className="size-7 text-gray-400" />
                <h1>Debating about some Bible questions.</h1>
                <p className="text-gray-400">2 days</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-md space-y-2">
                <TbMessage2Down className="size-7 text-gray-400" />
                <h1>How should Christians handle suffering and trials?</h1>
                <p className="text-gray-400">2 days</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-md space-y-2">
                <TbMessage2Down className="size-7 text-gray-400" />
                <h1>What are the signs of Jesus second coming?</h1>
                <p className="text-gray-400">2 days</p>
              </div>
            </div>
          </section>

          {/* Recent Chats Section */}
          {/* <RecentChats /> */}
          {/* <MainMessage></MainMessage> */}
        </main>
      </div>
    </div>
  );
}
