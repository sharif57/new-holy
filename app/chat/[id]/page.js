// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { PiLinkSimpleBold } from "react-icons/pi";
// import { HiMenu } from "react-icons/hi";
// import {
//   ArrowRightFromLine,
//   FileText,
//   LogOut,
//   MessageSquareDiff,
//   MessagesSquare,
//   User,
// } from "lucide-react";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import CryptoJS from "crypto-js";
// import {
//   useAnswerPostMutation,
//   useGetAllAnsQuery,
// } from "@/app/redux/features/answerSlice";
// import {
//   usePreviousQuery,
//   useQuestionGetAllQuery,
//   useQuestionPostMutation,
//   useRequestAllRoomDataQuery,
//   useRequestQuery,
// } from "@/app/redux/features/quesationSlice";
// import { useUserProfileQuery } from "@/app/redux/features/userSlice";
// import {
//   useAllRoomQuery,
//   useRecentRoomQuery,
// } from "@/app/redux/features/roomSlice";
// import Image from "next/image";
// import Swal from "sweetalert2";
// import { MdPayment } from "react-icons/md";
// import Cookies from "js-cookie";
// import { Typewriter } from "react-simple-typewriter";

// const RoomPage = ({ params, searchParams }) => {
//   const [id, setId] = useState(null);

//   // const { data } = useGetAllAnsQuery(id);
//   // const { data } = useRequestQuery(id);
//   const { data } = useRequestAllRoomDataQuery(id);
//   // console.log(typeof(data),'=====================> query')

//   console.log(data, "=======================");

//   useEffect(() => {
//     const getId = async () => {
//       const resolvedParams = await params;
//       setId(resolvedParams.id);
//     };
//     getId();
//   }, [params]);

//   const results = data?.data?.result || [];

//   const answerData = data?.data?.[0];
//   const answer = answerData?.answer;
//   const questions = answerData?.questionId?.question;

//   const { data: recentRoom } = useRecentRoomQuery();

//   // const { data: questionGetAll } = useQuestionGetAllQuery();
//   const { data: allRoom } = useAllRoomQuery();

//   const [postAnswer] = useAnswerPostMutation();
//   const [postQuestion] = useQuestionPostMutation();

//   const [question, setQuestion] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [generatingAnswer, setGeneratingAnswer] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [fileContent, setFileContent] = useState("");
//   const [fileName, setFileName] = useState("");
//   const { data: userProfile, isLoading, error } = useUserProfileQuery();

//   const { data: questionGetAll } = useQuestionGetAllQuery();
//   // const { data: previous } = useQuestionPostMutation();

//   const router = useRouter();

//   if (questionGetAll?.data?.result) {
//     questionGetAll.data.result.forEach((item) => {
//       // console.log(item.question);
//     });
//   }

//   const ApiKey = process.env.NEXT_PUBLIC_API_KEY;
//   // console.log(ApiKey);

//   const chatContainerRef = useRef(null); // Reference for chat container

//   useEffect(() => {
//     // Scroll to the bottom whenever chatHistory is updated
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory]);
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFileName(file.name);
//       const reader = new FileReader();
//       reader.onload = (e) => setFileContent(e.target.result);
//       reader.onerror = () => {
//         console.error("Error reading file");
//         setFileContent("");
//       };
//       reader.readAsText(file);
//     }
//   };

//   console.log(id, "asdasdasdasdasdasdasdasd");

//   const SECRET_KEY = process.env.NEXT_PUBLIC_HELLO; // Replace with a strong secret key

//   // Encrypt data
//   const encryptData = (data) => {
//     return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
//   };

//   // Decrypt data
//   const decryptData = (encryptedData) => {
//     try {
//       const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
//       return bytes.toString(CryptoJS.enc.Utf8);
//     } catch (error) {
//       console.error("Error decrypting data:", error);
//       return null;
//     }
//   };

//   // const generateAnswer = async (e) => {
//   //   e.preventDefault();

//   //   let encryptedZetaSession = sessionStorage.getItem("zetaSession");
//   //   let zetaSession = encryptedZetaSession
//   //     ? parseInt(decryptData(encryptedZetaSession) || "0", 10)
//   //     : 0;

//   //   if (!userProfile?.data?.subscription && zetaSession >= 3) {
//   //     alert(
//   //       "You have reached the free chat limit. Please subscribe to continue."
//   //     );
//   //     router.push("/payment");
//   //     return;
//   //   }

//   //   if (!question.trim() && !fileContent.trim()) {
//   //     alert("Please provide a question or upload a file.");
//   //     return;
//   //   }

//   //   setGeneratingAnswer(true);

//   //   const currentQuestion = fileContent
//   //     ? `Based on the following text file content, provide a Bible-related answer: ${fileContent}`
//   //     : question;

//   //   console.log(currentQuestion, "question");

//   //   setChatHistory((prev) => [
//   //     ...prev,
//   //     { type: "question", content: currentQuestion },
//   //   ]);

//   //   try {
//   //     if (!currentQuestion) throw new Error("Question cannot be empty");

//   //     const response = await axios.post(
//   //       "https://api.openai.com/v1/chat/completions",
//   //       {
//   //         model: "gpt-4",
//   //         messages: [
//   //           {
//   //             role: "system",
//   //             content:
//   //               "You are a helpful assistant that only answers Bible-related questions.",
//   //           },
//   //           { role: "user", content: currentQuestion },
//   //         ],
//   //         max_tokens: 150,
//   //       },
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: `Bearer ${ApiKey}`,
//   //         },
//   //       }
//   //     );

//   //     console.log(response, "res iiojlkjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

//   //     if (!response?.data?.choices?.[0]?.message?.content) {
//   //       throw new Error("Invalid response from OpenAI.");
//   //     }

//   //     const aiResponse = response.data.choices[0].message.content.trim();
//   //     const results = data?.data?.result?.roomName;

//   //     const questionData = {
//   //       question: currentQuestion,
//   //       answer: aiResponse,
//   //       room: results,
//   //     };

//   //     console.log(questionData, "new quesation ksdlfjlk");

//   //     console.log(questionData, "question data");

//   //     const answerResponse = await postQuestion(questionData);

//   //     if (!answerResponse) {
//   //       throw new Error("Error saving answer to the database.");
//   //     }

//   //     setChatHistory((prev) => [
//   //       ...prev,
//   //       { type: "answer", content: aiResponse },
//   //     ]);

//   //     if (!userProfile?.data?.subscription) {
//   //       zetaSession += 1;
//   //       sessionStorage.setItem(
//   //         "zetaSession",
//   //         encryptData(zetaSession.toString())
//   //       );

//   //       if (zetaSession > 3) {
//   //         alert(
//   //           "You have reached your free chat limit. Redirecting to payment..."
//   //         );
//   //         router.push("/payment");
//   //         return;
//   //       }
//   //     } else {
//   //       router.replace(router.asPath);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching response:", error.message);
//   //     setChatHistory((prev) => [
//   //       ...prev,
//   //       {
//   //         type: "answer",
//   //         content: "Sorry - Something went wrong. Please try again!",
//   //       },
//   //     ]);
//   //   }

//   //   setGeneratingAnswer(false);
//   //   setFileContent("");
//   //   setFileName("");
//   //   setQuestion("");
//   // };

//   const generateAnswer = async (e) => {
//     e.preventDefault();
//     setQuestion("");

//     let encryptedZetaSession = sessionStorage.getItem("zetaSession");
//     let zetaSession = encryptedZetaSession
//       ? parseInt(decryptData(encryptedZetaSession) || "0", 10)
//       : 0;

//     if (!userProfile?.data?.subscription && zetaSession >= 3) {
//       alert(
//         "You have reached the free chat limit. Please subscribe to continue."
//       );
//       router.push("/payment");
//       return;
//     }

//     if (!question.trim() && !fileContent.trim()) {
//       alert("Please provide a question or upload a file.");
//       return;
//     }

//     setGeneratingAnswer(true);

//     const currentQuestion = fileContent
//       ? `Based on the following text file content, provide a Bible-related answer: ${fileContent}`
//       : question;

//     console.log(currentQuestion, "question");

//     setChatHistory((prev) => [
//       ...prev,
//       { type: "question", content: currentQuestion },
//     ]);

//     try {
//       // **Validate request before sending**
//       if (!currentQuestion) throw new Error("Question cannot be empty");

//       // **2. Send the question to OpenAI**
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-4",
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are a helpful assistant that only answers Bible-related questions.",
//             },
//             { role: "user", content: currentQuestion },
//           ],
//           max_tokens: 150,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${ApiKey}`,
//           },
//         }
//       );

//       console.log(response, "res");

//       if (!response?.data?.choices?.[0]?.message?.content) {
//         throw new Error("Invalid response from OpenAI.");
//       }

//       const aiResponse = response.data.choices[0].message.content.trim();

//       // **3. Save the question and answer in the database**
//       const questionData = {
//         question: currentQuestion,
//         answer: aiResponse,
//       };

//       console.log(
//         questionData,
//         "hjksd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;f"
//       );

//       const answerResponse = await postQuestion(questionData);

//       if (!answerResponse) {
//         throw new Error("Error saving answer to the database.");
//       }

//       // **4. Update chat history**
//       setChatHistory((prev) => [
//         ...prev,
//         { type: "answer", content: aiResponse },
//       ]);

//       // **5. Update session tracking**
//       if (!userProfile?.data?.subscription) {
//         zetaSession += 1;
//         sessionStorage.setItem(
//           "zetaSession",
//           encryptData(zetaSession.toString())
//         );

//         if (zetaSession > 3) {
//           alert(
//             "You have reached your free chat limit. Redirecting to payment..."
//           );
//           router.push("/payment");
//           return;
//         }
//       } else {
//         router.replace(router.asPath);
//       }
//     } catch (error) {
//       console.error("Error fetching response:", error.message);
//       setChatHistory((prev) => [
//         ...prev,
//         {
//           type: "answer",
//           content: "Sorry - Something went wrong. Please try again!",
//         },
//       ]);
//     }

//     setGeneratingAnswer(false);
//     setFileContent("");
//     setFileName("");
//     setQuestion("");
//   };

//   const [isOpen, setIsOpen] = useState(false);

//   // Toggle dropdown visibility
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogOut = () => {
//     Swal.fire({
//       text: "Are you sure you want to logout?",
//       showCancelButton: true,
//       confirmButtonText: "Sure",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#DC2626",
//       reverseButtons: true,
//     }).then((res) => {
//       if (res.isConfirmed) {
//         // Remove tokens from localStorage
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");

//         // Remove cookies with path
//         Cookies.remove("accessToken", { path: "/" });

//         // Redirect to auth page
//         router.push("/auth");
//       }
//     });
//   };

//   // Reset chat count when the user subscribes
//   useEffect(() => {
//     if (userProfile?.data?.subscription) {
//       sessionStorage.removeItem("zetaSession"); // Reset the count for subscribed users
//     }
//   }, [userProfile]);

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 lg:w-80 w-64 bg-[#dedcd1] h-full z-40 transition-transform transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0`}
//       >
//         <aside className="h-full flex flex-col justify-between">
//           <div className="p-4 text-[#535136] text-center font-bold text-4xl border-b">
//             Holybot
//           </div>

//           <Link href={"/chat"}>
//             <div className="mt-3 text-center text-2xl font-semibold text-[#fb9b24] mb-3 flex items-center justify-center gap-2 cursor-pointer">
//               <MessageSquareDiff />
//               <h1>Start new chat </h1>
//             </div>
//           </Link>

//           <div>
//             <div className="mb-5">
//               {/* Section Header */}
//               <h1 className="pl-5 font-semibold text-lg mb-3">Recent</h1>

//               <div className="flex flex-col gap-3">
//                 {recentRoom?.data?.result?.slice(0, 4).map((item) => (
//                   <Link key={item._id} href={`/chat/${item._id}`} passHref>
//                     <div className="flex items-center gap-4 bg-[#ecebe5] hover:bg-gray-100 cursor-pointer px-3 py-3 mx-4 rounded-full shadow-sm transition-all duration-150">
//                       <MessagesSquare className="text-gray-700" />
//                       <p className="text-sm font-medium text-gray-700">
//                         {item.roomName.length > 9
//                           ? item.roomName.slice(0, -9).slice(0, 25)
//                           : item.roomName}
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mt-6 space-y-3">
//             <div className="mb-5">
//               <h1 className="pl-5 font-semibold text-lg mb-3">Previous</h1>
//               <div className="flex flex-col gap-3">
//                 {allRoom?.data?.result?.slice(0, 4).map((item) => (
//                   <Link key={item._id} href={`/chat/${item._id}`} passHref>
//                     <div className="flex items-center gap-4 bg-[#ecebe5] hover:bg-gray-100 cursor-pointer px-3 py-3 mx-4 rounded-full shadow-sm transition-all duration-150">
//                       <MessagesSquare className="text-gray-700" />
//                       <p className="text-sm font-medium text-gray-700">
//                         {item.roomName.length > 9
//                           ? item.roomName.slice(0, -9).slice(0, 20)
//                           : item.roomName}
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//               <div className="flex justify-center mt-6">
//                 <Link
//                   href="/history"
//                   className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-600 font-medium text-sm rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md hover:text-blue-700 transition-all duration-300"
//                 >
//                   View All Previous Chats
//                   <ArrowRightFromLine className="w-4 h-4" />
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* User Profile */}
//           <div className="mt-auto p-4">
//             <div className=" px-4 py-2 rounded-lg w-full font-medium flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2">
//               <div className="flex justify-center sm:justify-start">
//                 <img
//                   // src={userProfile?.data?.image || "/placeholder-avatar.png"}
//                   src={"/image/users.jpg"}
//                   className="w-10 h-10 object-cover rounded-full"
//                   alt="User Avatar"
//                 />
//               </div>
//               <div className="text-center sm:text-left">
//                 <span className="text-sm font-semibold block text-gray-800">
//                   {userProfile?.data?.name || "User Name"}
//                 </span>
//                 <span className="text-xs text-gray-600">
//                   {userProfile?.data?.email || "Guest"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </aside>
//       </div>

//       {/* Sidebar Overlay for Mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-grow lg:pl-64 lg:p-4">
//         {/* Hamburger Menu for Mobile */}
//         <div className="lg:hidden flex justify-between items-center mb-4 p-4">
//           <h1 className="text-2xl font-bold">Holybot</h1>
//           <button
//             className="text-2xl p-2 bg-gray-200 rounded-md"
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           >
//             <HiMenu />
//           </button>
//         </div>
//         <div className="flex items-center justify-center">
//           <div className="max-w-6xl w-full lg:px-4">
//             {/* Header Section */}
//             <div className="max-w-3xl mx-auto   p-4">
//               <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">
//                 Ask a Bible-related question or upload a text file.
//               </h1>

//               <div className="pb-10">
//                 <div
//                   className="lg:p-4 overflow-y-auto scrollbar-hide mx-auto w-full"
//                   ref={chatContainerRef}
//                   style={{ maxHeight: "80vh" }}
//                 >
//                   <div className="space-y-">
//                     {results.map((item) => (
//                       <div
//                         key={item._id}
//                         className="lg:p-4 space-y-3 rounded-md"
//                       >
//                         <div className="p-4 flex items-center gap-2 rounded-md text-sm md:text-base bg-[#dedcd1]">
//                           <Image
//                             src={"/image/logo.png"}
//                             className="size-6 rounded-full bg-cover"
//                             alt="logo"
//                             height={400}
//                             width={400}
//                           ></Image>
//                           <p> {item.question}</p>
//                         </div>
//                         <p className="p-4 rounded-md text-sm md:text-base bg-white">
//                           {/* {item.answer}{" "} */}
//                           <Typewriter words={[item.answer]} typeSpeed={5} />
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   {generatingAnswer && (
//                     <div className="p-4 mb-4 rounded-md text-sm md:text-base flex justify-center items-center text-blue-500 text-center">
//                       <div className="flex flex-row gap-2 items-center">
//                         <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce"></div>
//                         <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.3s]"></div>
//                         <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.5s]"></div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//             </div>
//             {/* Footer Input Section */}
//             <div className="mt-4 lg:ml-[80px] ml-0 flex flex-col md:flex-row items-center justify-center gap-4 fixed bottom-2 left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
//               <form onSubmit={generateAnswer} className="w-full relative">
//                 {/* Text Input */}
//                 <div className="relative flex-grow w-full">
//                   <div className="h-4 mb-7 lg:w-1/3">
//                     {/* Fixed height for file name */}
//                     {fileName && (
//                       <div className="text-sm flex items-center rounded-lg gap-2 bg-gray-300 px-2 py-2 text-gray-600 truncate">
//                         <FileText className="text-pink-500" />
//                         {fileName}
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setFileName(null);
//                             setSelectedFile(null);
//                           }}
//                           className="ml-2 text-red-500 hover:text-red-700"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <input
//                     type="text"
//                     value={question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                     className="w-full bg-gray-50 p-2 py-4 md:py-6 pl-4 pr-14 rounded-3xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
//                     placeholder="Ask a Bible-related question..."
//                     required
//                   />
//                   {/* File Upload */}
//                   <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex  items-center gap-2">
//                     <input
//                       type="file"
//                       accept=".txt"
//                       onChange={handleFileUpload}
//                       className="hidden"
//                       id="file-upload"
//                     />
//                     <label
//                       htmlFor="file-upload"
//                       className="cursor-pointer bg-gray-200 mt-10 p-2 rounded-md hover:bg-gray-300"
//                     >
//                       <PiLinkSimpleBold size={20} />
//                     </label>
//                   </div>

//                   {/* <div className="hidden sm:block">
//                     <button
//                       type="submit"
//                       disabled={generatingAnswer}
//                       className={`px-4 py-2 rounded-md text-white ${
//                         generatingAnswer
//                           ? "bg-gray-500 cursor-not-allowed"
//                           : "bg-black hover:bg-black focus:ring-2 focus:ring-blue-300"
//                       }`}
//                     >
//                       {generatingAnswer ? "Loading..." : "Send"}
//                     </button>
//                   </div> */}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="relative inline-block pr-7 pt-4 hidden sm:block">
//         {/* Clickable Image */}
//         <img
//           src="/image/users.jpg" // Replace with your image path
//           alt="Dropdown Trigger"
//           className="w-12 h-12 rounded-full cursor-pointer"
//           onClick={toggleDropdown}
//         />

//         {/* Dropdown Menu */}
//         {isOpen && (
//           <div className="absolute right-0 mt-2 w-48 mr-8 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
//             <div className="py-1">
//               <button className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-black hover:bg-red-50">
//                 <User className="w-4 h-4" />{" "}
//                 {userProfile?.data?.name || "User Name"}
//               </button>

//               <Link
//                 href={"/payment"}
//                 className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-black hover:bg-red-50"
//               >
//                 <MdPayment className="w-4 h-4" /> Payment
//               </Link>

//               <button
//                 onClick={handleLogOut}
//                 className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//               >
//                 <LogOut className="w-4 h-4" /> Logout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RoomPage;

/* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { PiLinkSimpleBold } from "react-icons/pi";
// import { HiMenu } from "react-icons/hi";
// import {
//   ArrowRightFromLine,
//   FileText,
//   LogOut,
//   MessageSquareDiff,
//   MessagesSquare,
//   User,
// } from "lucide-react";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import CryptoJS from "crypto-js";
// import {
//   useAnswerPostMutation,
//   useGetAllAnsQuery,
// } from "@/app/redux/features/answerSlice";
// import {
//   usePreviousQuery,
//   useQuestionGetAllQuery,
//   useQuestionPostMutation,
//   useRequestAllRoomDataQuery,
//   useRequestQuery,
// } from "@/app/redux/features/quesationSlice";
// import { useUserProfileQuery } from "@/app/redux/features/userSlice";
// import {
//   useAllRoomQuery,
//   useRecentRoomQuery,
// } from "@/app/redux/features/roomSlice";
// import Image from "next/image";
// import Swal from "sweetalert2";
// import { MdPayment } from "react-icons/md";
// import Cookies from "js-cookie";
// import { Typewriter } from "react-simple-typewriter";

// const RoomPage = ({ params, searchParams }) => {
//   const [id, setId] = useState(null);

//   // const { data } = useGetAllAnsQuery(id);
//   // const { data } = useRequestQuery(id);
//   const { data } = useRequestAllRoomDataQuery(id);
//   // console.log(typeof(data),'=====================> query')

//   console.log(data, "=======================");

//   useEffect(() => {
//     const getId = async () => {
//       const resolvedParams = await params;
//       setId(resolvedParams.id);
//     };
//     getId();
//   }, [params]);

//   const results = data?.data?.result || [];

//   const answerData = data?.data?.[0];
//   const answer = answerData?.answer;
//   const questions = answerData?.questionId?.question;

//   const { data: recentRoom } = useRecentRoomQuery();

//   // const { data: questionGetAll } = useQuestionGetAllQuery();
//   const { data: allRoom } = useAllRoomQuery();

//   const [postAnswer] = useAnswerPostMutation();
//   const [postQuestion] = useQuestionPostMutation();

//   const [question, setQuestion] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [generatingAnswer, setGeneratingAnswer] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [fileContent, setFileContent] = useState("");
//   const [fileName, setFileName] = useState("");
//   const { data: userProfile, isLoading, error } = useUserProfileQuery();

//   const { data: questionGetAll } = useQuestionGetAllQuery();
//   // const { data: previous } = useQuestionPostMutation();

//   const router = useRouter();

//   if (questionGetAll?.data?.result) {
//     questionGetAll.data.result.forEach((item) => {
//       // console.log(item.question);
//     });
//   }

//   const ApiKey = process.env.NEXT_PUBLIC_API_KEY;
//   // console.log(ApiKey);

//   const chatContainerRef = useRef(null); // Reference for chat container

//   useEffect(() => {
//     // Scroll to the bottom whenever chatHistory is updated
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory]);
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFileName(file.name);
//       const reader = new FileReader();
//       reader.onload = (e) => setFileContent(e.target.result);
//       reader.onerror = () => {
//         console.error("Error reading file");
//         setFileContent("");
//       };
//       reader.readAsText(file);
//     }
//   };

//   console.log(id, "asdasdasdasdasdasdasdasd");

//   const SECRET_KEY = process.env.NEXT_PUBLIC_HELLO; // Replace with a strong secret key

//   // Encrypt data
//   const encryptData = (data) => {
//     return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
//   };

//   // Decrypt data
//   const decryptData = (encryptedData) => {
//     try {
//       const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
//       return bytes.toString(CryptoJS.enc.Utf8);
//     } catch (error) {
//       console.error("Error decrypting data:", error);
//       return null;
//     }
//   };

//   const generateAnswer = async (e) => {
//     e.preventDefault();
//     setQuestion("");

//     let encryptedZetaSession = sessionStorage.getItem("zetaSession");
//     let zetaSession = encryptedZetaSession
//       ? parseInt(decryptData(encryptedZetaSession) || "0", 10)
//       : 0;

//     if (!userProfile?.data?.subscription && zetaSession >= 3) {
//       alert(
//         "You have reached the free chat limit. Please subscribe to continue."
//       );
//       router.push("/payment");
//       return;
//     }

//     if (!question.trim() && !fileContent.trim()) {
//       alert("Please provide a question or upload a file.");
//       return;
//     }

//     setGeneratingAnswer(true);

//     const currentQuestion = fileContent
//       ? `Based on the following text file content, provide a Bible-related answer: ${fileContent}`
//       : question;

//     console.log(currentQuestion, "question");

//     setChatHistory((prev) => [
//       ...prev,
//       { type: "question", content: currentQuestion },
//     ]);

//     try {
//       // **Validate request before sending**
//       if (!currentQuestion) throw new Error("Question cannot be empty");

//       // **2. Send the question to OpenAI**
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-4",
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are a helpful assistant that only answers Bible-related questions.",
//             },
//             { role: "user", content: currentQuestion },
//           ],
//           max_tokens: 150,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${ApiKey}`,
//           },
//         }
//       );

//       console.log(response, "res");

//       if (!response?.data?.choices?.[0]?.message?.content) {
//         throw new Error("Invalid response from OpenAI.");
//       }

//       const aiResponse = response.data.choices[0].message.content.trim();

//       // **3. Save the question and answer in the database**
//       const questionData = {
//         question: currentQuestion,
//         answer: aiResponse,
//       };

//       console.log(
//         questionData,
//         "hjksd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;f"
//       );

//       const answerResponse = await postQuestion(questionData);

//       if (!answerResponse) {
//         throw new Error("Error saving answer to the database.");
//       }

//       // **4. Update chat history**
//       setChatHistory((prev) => [
//         ...prev,
//         { type: "answer", content: aiResponse },
//       ]);

//       // **5. Update session tracking**
//       if (!userProfile?.data?.subscription) {
//         zetaSession += 1;
//         sessionStorage.setItem(
//           "zetaSession",
//           encryptData(zetaSession.toString())
//         );

//         if (zetaSession > 3) {
//           alert(
//             "You have reached your free chat limit. Redirecting to payment..."
//           );
//           router.push("/payment");
//           return;
//         }
//       } else {
//         router.replace(router.asPath);
//       }
//     } catch (error) {
//       console.error("Error fetching response:", error.message);
//       setChatHistory((prev) => [
//         ...prev,
//         {
//           type: "answer",
//           content: "Sorry - Something went wrong. Please try again!",
//         },
//       ]);
//     }

//     setGeneratingAnswer(false);
//     setFileContent("");
//     setFileName("");
//     setQuestion("");
//   };

//   const [isOpen, setIsOpen] = useState(false);

//   // Toggle dropdown visibility
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogOut = () => {
//     Swal.fire({
//       text: "Are you sure you want to logout?",
//       showCancelButton: true,
//       confirmButtonText: "Sure",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#DC2626",
//       reverseButtons: true,
//     }).then((res) => {
//       if (res.isConfirmed) {
//         // Remove tokens from localStorage
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");

//         // Remove cookies with path
//         Cookies.remove("accessToken", { path: "/" });

//         // Redirect to auth page
//         router.push("/auth");
//       }
//     });
//   };

//   // Reset chat count when the user subscribes
//   useEffect(() => {
//     if (userProfile?.data?.subscription) {
//       sessionStorage.removeItem("zetaSession"); // Reset the count for subscribed users
//     }
//   }, [userProfile]);

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 lg:w-80 w-64 bg-[#dedcd1] h-full z-40 transition-transform transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0`}
//       >
//         <aside className="h-full flex flex-col justify-between">
//           <div className="p-4 text-[#535136] text-center font-bold text-4xl border-b">
//             Holybot
//           </div>

//           <Link href={"/chat"}>
//             <div className="mt-3 text-center text-2xl font-semibold text-[#fb9b24] mb-3 flex items-center justify-center gap-2 cursor-pointer">
//               <MessageSquareDiff />
//               <h1>Start new chat </h1>
//             </div>
//           </Link>

//           <div>
//             <div className="mb-5">
//               {/* Section Header */}
//               <h1 className="pl-5 font-semibold text-lg mb-3">Recent</h1>

//               <div className="flex flex-col gap-3">
//                 {recentRoom?.data?.result?.slice(0, 4).map((item) => (
//                   <Link key={item._id} href={`/chat/${item._id}`} passHref>
//                     <div className="flex items-center gap-4 bg-[#ecebe5] hover:bg-gray-100 cursor-pointer px-3 py-3 mx-4 rounded-full shadow-sm transition-all duration-150">
//                       <MessagesSquare className="text-gray-700" />
//                       <p className="text-sm font-medium text-gray-700">
//                         {item.roomName.length > 9
//                           ? item.roomName.slice(0, -9).slice(0, 25)
//                           : item.roomName}
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mt-6 space-y-3">
//             <div className="mb-5">
//               <h1 className="pl-5 font-semibold text-lg mb-3">Previous</h1>
//               <div className="flex flex-col gap-3">
//                 {allRoom?.data?.result?.slice(0, 4).map((item) => (
//                   <Link key={item._id} href={`/chat/${item._id}`} passHref>
//                     <div className="flex items-center gap-4 bg-[#ecebe5] hover:bg-gray-100 cursor-pointer px-3 py-3 mx-4 rounded-full shadow-sm transition-all duration-150">
//                       <MessagesSquare className="text-gray-700" />
//                       <p className="text-sm font-medium text-gray-700">
//                         {item.roomName.length > 9
//                           ? item.roomName.slice(0, -9).slice(0, 20)
//                           : item.roomName}
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//               <div className="flex justify-start pl-4 pt-28">
//                   <Link
//                     href="/history"
//                     className="inline-flex items-center gap-3 px-4 py-2 bg-[#ecebe5]  font-medium text-sm rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md hover:text-blue-700 transition-all duration-300"
//                   >
//                    Chat History
//                     <ArrowRightFromLine className="w-4 h-4" />
//                   </Link>
//                 </div>
//             </div>
//           </div>

//           {/* User Profile */}
//           <div className="mt-auto p-4">
//             <div className=" px-4 py-2 rounded-lg w-full font-medium flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2">
//               <div className="flex justify-center sm:justify-start">
//                 <img
//                   // src={userProfile?.data?.image || "/placeholder-avatar.png"}
//                   src={"/image/users.jpg"}
//                   className="w-10 h-10 object-cover rounded-full"
//                   alt="User Avatar"
//                 />
//               </div>
//               <div className="text-center sm:text-left">
//                 <span className="text-sm font-semibold block text-gray-800">
//                   {userProfile?.data?.name || "User Name"}
//                 </span>
//                 <span className="text-xs text-gray-600">
//                   {userProfile?.data?.email || "Guest"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </aside>
//       </div>

//       {/* Sidebar Overlay for Mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-grow lg:pl-64 lg:p-4">
//         {/* Hamburger Menu for Mobile */}
//         <div className="lg:hidden flex justify-between items-center mb-4 p-4">
//           <h1 className="text-2xl font-bold">Holybot</h1>
//           <button
//             className="text-2xl p-2 bg-gray-200 rounded-md"
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           >
//             <HiMenu />
//           </button>
//         </div>
//         <div className="flex items-center justify-center">
//           <div className="max-w-6xl w-full lg:px-4">
//             {/* Header Section */}
//             <div className="max-w-3xl mx-auto   p-4">
//               <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">
//                 Ask a Bible-related question or upload a text file.
//               </h1>

//               <div className="pb-10">
//                 <div
//                   className="lg:p-4 overflow-y-auto scrollbar-hide mx-auto w-full"
//                   ref={chatContainerRef}
//                   style={{ maxHeight: "80vh" }}
//                 >
//                   <div className="space-y-3">
//                     {results.map((item) => (
//                       <div
//                         key={item._id}
//                         className="lg:p-4 space-y-3 rounded-md"
//                       >
//                         <div className="p-4 flex items-center gap-2 rounded-md text-sm md:text-base bg-[#dedcd1]">
//                           <Image
//                             src={"/image/logo.png"}
//                             className="size-6 rounded-full bg-cover"
//                             alt="logo"
//                             height={40} // Adjusted the size to a reasonable value
//                             width={40}
//                           />
//                           <p>{item.question}</p>
//                         </div>

//                         {/* Answer section with Typewriter effect */}
//                         <p className="p-4 rounded-md text-sm md:text-base bg-white">
//                           {/* <Typewriter words={[item.answer]} typeSpeed={5} /> */}
//                           {item.answer}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Loading animation */}
//                   {generatingAnswer && (
//                     <div className="p-4 mb-4 rounded-md text-sm md:text-base flex justify-center items-center text-blue-500 text-center">
//                       <div className="flex flex-row gap-2 items-center">
//                         <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce"></div>
//                         <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.3s]"></div>
//                         <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.5s]"></div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             {/* Footer Input Section */}
//             <div className="mt-4 lg:ml-[80px] ml-0 flex flex-col md:flex-row items-center justify-center gap-4 fixed bottom-2 left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
//               <form onSubmit={generateAnswer} className="w-full relative">
//                 {/* Text Input */}
//                 <div className="relative flex-grow w-full">
//                   <div className="h-4 mb-7 lg:w-1/3">
//                     {/* Fixed height for file name */}
//                     {fileName && (
//                       <div className="text-sm flex items-center rounded-lg gap-2 bg-gray-300 px-2 py-2 text-gray-600 truncate">
//                         <FileText className="text-pink-500" />
//                         {fileName}
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setFileName(null);
//                             setSelectedFile(null);
//                           }}
//                           className="ml-2 text-red-500 hover:text-red-700"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <input
//                     type="text"
//                     value={question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                     className="w-full bg-gray-50 p-2 py-4 md:py-6 pl-4 pr-14 rounded-3xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
//                     placeholder="Ask a Bible-related question..."
//                     required
//                   />
//                   {/* File Upload */}
//                   <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex  items-center gap-2">
//                     <input
//                       type="file"
//                       accept=".txt"
//                       onChange={handleFileUpload}
//                       className="hidden"
//                       id="file-upload"
//                     />
//                     <label
//                       htmlFor="file-upload"
//                       className="cursor-pointer bg-gray-200 mt-10 p-2 rounded-md hover:bg-gray-300"
//                     >
//                       <PiLinkSimpleBold size={20} />
//                     </label>
//                   </div>

//                   {/* <div className="hidden sm:block">
//                     <button
//                       type="submit"
//                       disabled={generatingAnswer}
//                       className={`px-4 py-2 rounded-md text-white ${
//                         generatingAnswer
//                           ? "bg-gray-500 cursor-not-allowed"
//                           : "bg-black hover:bg-black focus:ring-2 focus:ring-blue-300"
//                       }`}
//                     >
//                       {generatingAnswer ? "Loading..." : "Send"}
//                     </button>
//                   </div> */}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="relative inline-block pr-7 pt-4 hidden sm:block">
//         {/* Clickable Image */}
//         <img
//           src="/image/users.jpg" // Replace with your image path
//           alt="Dropdown Trigger"
//           className="w-12 h-12 rounded-full cursor-pointer"
//           onClick={toggleDropdown}
//         />

//         {/* Dropdown Menu */}
//         {isOpen && (
//           <div className="absolute right-0 mt-2 w-48 mr-8 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
//             <div className="py-1">
//               <button className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-black hover:bg-red-50">
//                 <User className="w-4 h-4" />{" "}
//                 {userProfile?.data?.name || "User Name"}
//               </button>

//               <Link
//                 href={"/payment"}
//                 className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-black hover:bg-red-50"
//               >
//                 <MdPayment className="w-4 h-4" /> Payment
//               </Link>

//               <button
//                 onClick={handleLogOut}
//                 className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//               >
//                 <LogOut className="w-4 h-4" /> Logout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RoomPage;

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { PiLinkSimpleBold } from "react-icons/pi";
// import { HiMenu } from "react-icons/hi";
// import {
//   ArrowRightFromLine,
//   FileText,
//   LogOut,
//   MessageSquareDiff,
//   MessagesSquare,
//   User,
// } from "lucide-react";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import CryptoJS from "crypto-js";
// import {
//   useAnswerPostMutation,
//   useGetAllAnsQuery,
// } from "@/app/redux/features/answerSlice";
// import {
//   usePreviousQuery,
//   useQuestionGetAllQuery,
//   useQuestionPostMutation,
//   useRequestAllRoomDataQuery,
//   useRequestQuery,
// } from "@/app/redux/features/quesationSlice";
// import { useUserProfileQuery } from "@/app/redux/features/userSlice";
// import {
//   useAllRoomQuery,
//   useRecentRoomQuery,
// } from "@/app/redux/features/roomSlice";
// import Image from "next/image";
// import Swal from "sweetalert2";
// import { MdPayment } from "react-icons/md";
// import Cookies from "js-cookie";
// import { Typewriter } from "react-simple-typewriter";

// const RoomPage = ({ params, searchParams }) => {
//   const [id, setId] = useState(null);

//   // const { data } = useGetAllAnsQuery(id);
//   // const { data } = useRequestQuery(id);
//   const { data } = useRequestAllRoomDataQuery(id);
//   // console.log(typeof(data),'=====================> query')

//   console.log(data, "=======================");

//   useEffect(() => {
//     const getId = async () => {
//       const resolvedParams = await params;
//       setId(resolvedParams.id);
//     };
//     getId();
//   }, [params]);

//   const results = data?.data?.result || [];

//   const answerData = data?.data?.[0];
//   const answer = answerData?.answer;
//   const questions = answerData?.questionId?.question;

//   const { data: recentRoom } = useRecentRoomQuery();

//   // const { data: questionGetAll } = useQuestionGetAllQuery();
//   const { data: allRoom } = useAllRoomQuery();

//   const [postAnswer] = useAnswerPostMutation();
//   const [postQuestion] = useQuestionPostMutation();

//   const [question, setQuestion] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [generatingAnswer, setGeneratingAnswer] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [fileContent, setFileContent] = useState("");
//   const [fileName, setFileName] = useState("");
//   const { data: userProfile, isLoading, error } = useUserProfileQuery();

//   const { data: questionGetAll } = useQuestionGetAllQuery();
//   // const { data: previous } = useQuestionPostMutation();

//   const router = useRouter();

//   if (questionGetAll?.data?.result) {
//     questionGetAll.data.result.forEach((item) => {
//       // console.log(item.question);
//     });
//   }

//   const ApiKey = process.env.NEXT_PUBLIC_API_KEY;
//   // console.log(ApiKey);

//   const chatContainerRef = useRef(null); // Reference for chat container

//   useEffect(() => {
//     // Scroll to the bottom whenever chatHistory is updated
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory]);
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFileName(file.name);
//       const reader = new FileReader();
//       reader.onload = (e) => setFileContent(e.target.result);
//       reader.onerror = () => {
//         console.error("Error reading file");
//         setFileContent("");
//       };
//       reader.readAsText(file);
//     }
//   };

//   console.log(id, "asdasdasdasdasdasdasdasd");

//   const SECRET_KEY = process.env.NEXT_PUBLIC_HELLO; // Replace with a strong secret key

//   // Encrypt data
//   const encryptData = (data) => {
//     return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
//   };

//   // Decrypt data
//   const decryptData = (encryptedData) => {
//     try {
//       const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
//       return bytes.toString(CryptoJS.enc.Utf8);
//     } catch (error) {
//       console.error("Error decrypting data:", error);
//       return null;
//     }
//   };

//   const generateAnswer = async (e) => {
//     e.preventDefault();
//     setQuestion("");

//     let encryptedZetaSession = sessionStorage.getItem("zetaSession");
//     let zetaSession = encryptedZetaSession
//       ? parseInt(decryptData(encryptedZetaSession) || "0", 10)
//       : 0;

//     if (!userProfile?.data?.subscription && zetaSession >= 3) {
//       alert(
//         "You have reached the free chat limit. Please subscribe to continue."
//       );
//       router.push("/payment");
//       return;
//     }

//     if (!question.trim() && !fileContent.trim()) {
//       alert("Please provide a question or upload a file.");
//       return;
//     }

//     setGeneratingAnswer(true);

//     const currentQuestion = fileContent
//       ? `Based on the following text file content, provide a Bible-related answer: ${fileContent}`
//       : question;

//     console.log(currentQuestion, "question");

//     setChatHistory((prev) => [
//       ...prev,
//       { type: "question", content: currentQuestion },
//     ]);

//     try {
//       // **Validate request before sending**
//       if (!currentQuestion) throw new Error("Question cannot be empty");

//       // **2. Send the question to OpenAI**
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-4",
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are a helpful assistant that only answers Bible-related questions.",
//             },
//             { role: "user", content: currentQuestion },
//           ],
//           max_tokens: 150,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${ApiKey}`,
//           },
//         }
//       );

//       console.log(response, "res");

//       if (!response?.data?.choices?.[0]?.message?.content) {
//         throw new Error("Invalid response from OpenAI.");
//       }

//       const aiResponse = response.data.choices[0].message.content.trim();

//       // **3. Save the question and answer in the database**
//       const questionData = {
//         question: currentQuestion,
//         answer: aiResponse,
//       };

//       console.log(
//         questionData,
//         "hjksd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;f"
//       );

//       const answerResponse = await postQuestion(questionData);

//       if (!answerResponse) {
//         throw new Error("Error saving answer to the database.");
//       }

//       // **4. Update chat history**
//       setChatHistory((prev) => [
//         ...prev,
//         { type: "answer", content: aiResponse },
//       ]);

//       // **5. Update session tracking**
//       if (!userProfile?.data?.subscription) {
//         zetaSession += 1;
//         sessionStorage.setItem(
//           "zetaSession",
//           encryptData(zetaSession.toString())
//         );

//         if (zetaSession > 3) {
//           alert(
//             "You have reached your free chat limit. Redirecting to payment..."
//           );
//           router.push("/payment");
//           return;
//         }
//       } else {
//         router.replace(router.asPath);
//       }
//     } catch (error) {
//       console.error("Error fetching response:", error.message);
//       setChatHistory((prev) => [
//         ...prev,
//         {
//           type: "answer",
//           content: "Sorry - Something went wrong. Please try again!",
//         },
//       ]);
//     }

//     setGeneratingAnswer(false);
//     setFileContent("");
//     setFileName("");
//     setQuestion("");
//   };

//   const [isOpen, setIsOpen] = useState(false);

//   // Toggle dropdown visibility
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogOut = () => {
//     Swal.fire({
//       text: "Are you sure you want to logout?",
//       showCancelButton: true,
//       confirmButtonText: "Sure",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#DC2626",
//       reverseButtons: true,
//     }).then((res) => {
//       if (res.isConfirmed) {
//         // Remove tokens from localStorage
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");

//         // Remove cookies with path
//         Cookies.remove("accessToken", { path: "/" });

//         // Redirect to auth page
//         router.push("/auth");
//       }
//     });
//   };

//   // Reset chat count when the user subscribes
//   useEffect(() => {
//     if (userProfile?.data?.subscription) {
//       sessionStorage.removeItem("zetaSession"); // Reset the count for subscribed users
//     }
//   }, [userProfile]);

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 lg:w-80 w-64 bg-[#dedcd1] h-full z-40 transition-transform transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0`}
//       >
//         <aside className="h-full flex flex-col justify-between">
//           <div className="p-4 text-[#535136] text-center font-bold text-4xl border-b">
//             Holybot
//           </div>

//           <Link href={"/chat"}>
//             <div className="mt-3 text-center text-2xl font-semibold text-[#fb9b24] mb-3 flex items-center justify-center gap-2 cursor-pointer">
//               <MessageSquareDiff />
//               <h1>Start new chat </h1>
//             </div>
//           </Link>

//           <div>
//             <div className="mb-5">
//               {/* Section Header */}
//               <h1 className="pl-5 font-semibold text-lg mb-3">Recent</h1>

//               <div className="flex flex-col gap-3">
//                 {recentRoom?.data?.result?.slice(0, 4).map((item) => (
//                   <Link key={item._id} href={`/chat/${item._id}`} passHref>
//                     <div className="flex items-center gap-4 bg-[#ecebe5] hover:bg-gray-100 cursor-pointer px-3 py-3 mx-4 rounded-full shadow-sm transition-all duration-150">
//                       <MessagesSquare className="text-gray-700" />
//                       <p className="text-sm font-medium text-gray-700">
//                         {item.roomName.length > 9
//                           ? item.roomName.slice(0, -9).slice(0, 25)
//                           : item.roomName}
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mt-6 space-y-3">
//             <div className="mb-5">
//               <h1 className="pl-5 font-semibold text-lg mb-3">Previous</h1>
//               <div className="flex flex-col gap-3">
//                 {allRoom?.data?.result?.slice(0, 4).map((item) => (
//                   <Link key={item._id} href={`/chat/${item._id}`} passHref>
//                     <div className="flex items-center gap-4 bg-[#ecebe5] hover:bg-gray-100 cursor-pointer px-3 py-3 mx-4 rounded-full shadow-sm transition-all duration-150">
//                       <MessagesSquare className="text-gray-700" />
//                       <p className="text-sm font-medium text-gray-700">
//                         {item.roomName.length > 9
//                           ? item.roomName.slice(0, -9).slice(0, 20)
//                           : item.roomName}
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//               <div className="flex justify-start pl-4 pt-28">
//                   <Link
//                     href="/history"
//                     className="inline-flex items-center gap-3 px-4 py-2 bg-[#ecebe5]  font-medium text-sm rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md hover:text-blue-700 transition-all duration-300"
//                   >
//                    Chat History
//                     <ArrowRightFromLine className="w-4 h-4" />
//                   </Link>
//                 </div>
//             </div>
//           </div>

//           {/* User Profile */}
//           <div className="mt-auto p-4">
//             <div className=" px-4 py-2 rounded-lg w-full font-medium flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2">
//               <div className="flex justify-center sm:justify-start">
//                 <img
//                   // src={userProfile?.data?.image || "/placeholder-avatar.png"}
//                   src={"/image/users.jpg"}
//                   className="w-10 h-10 object-cover rounded-full"
//                   alt="User Avatar"
//                 />
//               </div>
//               <div className="text-center sm:text-left">
//                 <span className="text-sm font-semibold block text-gray-800">
//                   {userProfile?.data?.name || "User Name"}
//                 </span>
//                 <span className="text-xs text-gray-600">
//                   {userProfile?.data?.email || "Guest"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </aside>
//       </div>

//       {/* Sidebar Overlay for Mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-grow lg:pl-64 lg:p-4">
//         {/* Hamburger Menu for Mobile */}
//         <div className="lg:hidden flex justify-between items-center mb-4 p-4">
//           <h1 className="text-2xl font-bold">Holybot</h1>
//           <button
//             className="text-2xl p-2 bg-gray-200 rounded-md"
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           >
//             <HiMenu />
//           </button>
//         </div>
//         <div className="flex items-center justify-center">
//           <div className="max-w-6xl w-full lg:px-4">
//             {/* Header Section */}
//             <div className="max-w-3xl mx-auto   p-4">
//               <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">
//                 Ask a Bible-related question or upload a text file.
//               </h1>

//               <div className="pb-10">
//                 <div
//                   className="lg:p-4 overflow-y-auto scrollbar-hide mx-auto w-full"
//                   ref={chatContainerRef}
//                   style={{ maxHeight: "80vh" }}
//                 >
//                   <div className="space-y-3">
//                     {results.map((item) => (
//                       <div
//                         key={item._id}
//                         className="lg:p-4 space-y-3 rounded-md"
//                       >
//                         <div className="p-4 flex items-center gap-2 rounded-md text-sm md:text-base bg-[#dedcd1]">
//                           <Image
//                             src={"/image/logo.png"}
//                             className="size-6 rounded-full bg-cover"
//                             alt="logo"
//                             height={40} // Adjusted the size to a reasonable value
//                             width={40}
//                           />
//                           <p>{item.question}</p>
//                         </div>

//                         {/* Answer section with Typewriter effect */}
//                         <p className="p-4 rounded-md text-sm md:text-base bg-white">
//                           {/* <Typewriter words={[item.answer]} typeSpeed={5} /> */}
//                           {item.answer}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Loading animation */}
//                   {generatingAnswer && (
//                     <div className="p-4 mb-4 rounded-md text-sm md:text-base flex justify-center items-center text-blue-500 text-center">
//                       <div className="flex flex-row gap-2 items-center">
//                         <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce"></div>
//                         <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.3s]"></div>
//                         <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.5s]"></div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             {/* Footer Input Section */}
//             <div className="mt-4 lg:ml-[80px] ml-0 flex flex-col md:flex-row items-center justify-center gap-4 fixed bottom-2 left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
//               <form onSubmit={generateAnswer} className="w-full relative">
//                 {/* Text Input */}
//                 <div className="relative flex-grow w-full">
//                   <div className="h-4 mb-7 lg:w-1/3">
//                     {/* Fixed height for file name */}
//                     {fileName && (
//                       <div className="text-sm flex items-center rounded-lg gap-2 bg-gray-300 px-2 py-2 text-gray-600 truncate">
//                         <FileText className="text-pink-500" />
//                         {fileName}
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setFileName(null);
//                             setSelectedFile(null);
//                           }}
//                           className="ml-2 text-red-500 hover:text-red-700"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <input
//                     type="text"
//                     value={question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                     className="w-full bg-gray-50 p-2 py-4 md:py-6 pl-4 pr-14 rounded-3xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
//                     placeholder="Ask a Bible-related question..."
//                     required
//                   />
//                   {/* File Upload */}
//                   <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex  items-center gap-2">
//                     <input
//                       type="file"
//                       accept=".txt"
//                       onChange={handleFileUpload}
//                       className="hidden"
//                       id="file-upload"
//                     />
//                     <label
//                       htmlFor="file-upload"
//                       className="cursor-pointer bg-gray-200 mt-10 p-2 rounded-md hover:bg-gray-300"
//                     >
//                       <PiLinkSimpleBold size={20} />
//                     </label>
//                   </div>

//                   {/* <div className="hidden sm:block">
//                     <button
//                       type="submit"
//                       disabled={generatingAnswer}
//                       className={`px-4 py-2 rounded-md text-white ${
//                         generatingAnswer
//                           ? "bg-gray-500 cursor-not-allowed"
//                           : "bg-black hover:bg-black focus:ring-2 focus:ring-blue-300"
//                       }`}
//                     >
//                       {generatingAnswer ? "Loading..." : "Send"}
//                     </button>
//                   </div> */}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="relative inline-block pr-7 pt-4 hidden sm:block">
//         {/* Clickable Image */}
//         <img
//           src="/image/users.jpg" // Replace with your image path
//           alt="Dropdown Trigger"
//           className="w-12 h-12 rounded-full cursor-pointer"
//           onClick={toggleDropdown}
//         />

//         {/* Dropdown Menu */}
//         {isOpen && (
//           <div className="absolute right-0 mt-2 w-48 mr-8 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
//             <div className="py-1">
//               <button className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-black hover:bg-red-50">
//                 <User className="w-4 h-4" />{" "}
//                 {userProfile?.data?.name || "User Name"}
//               </button>

//               <Link
//                 href={"/payment"}
//                 className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-black hover:bg-red-50"
//               >
//                 <MdPayment className="w-4 h-4" /> Payment
//               </Link>

//               <button
//                 onClick={handleLogOut}
//                 className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//               >
//                 <LogOut className="w-4 h-4" /> Logout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RoomPage;

// "use client"

// import { useRequestQuery } from "@/app/redux/features/quesationSlice"
// import { useEffect, useState } from "react"

// function Page({ params }) {
//   const [id, setId] = useState(null)

//   // Fetch answer data based on the id from params
// const { data, isLoading, isError, error } = useRequestQuery(id)

//   // Set the id when params resolve
//   useEffect(() => {
//     if (params?.id) {
//       setId(params.id)
//     }
//   }, [params])

//   // Handle loading and error states
//   if (isLoading) return <div>Loading...</div>
//   if (isError) return <div>Error: {error.message}</div>

//   // Extract the answer and question information
// const results = data?.data?.result || []

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Question & Answers</h2>
//       {results.length > 0 ? (
//         results.map((item) => (
//           <div key={item._id} className="p-4 mb-4 border rounded-md">
//             <h3 className="text-lg font-semibold">Question: {item.question}</h3>
//             <p className="text-gray-700">Answer: {item.answer}</p>
//             <p className="text-sm text-gray-500">Question ID: {item._id}</p>
//           </div>
//         ))
//       ) : (
//         <p>No results found.</p>
//       )}
//     </div>
//   )
// }

// export default Page

/* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { PiLinkSimpleBold } from "react-icons/pi";
// import { HiMenu } from "react-icons/hi";
// import {
//   ArrowRightFromLine,
//   FileText,
//   LogOut,
//   MessageSquareDiff,
//   MessagesSquare,
//   User,
// } from "lucide-react";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import CryptoJS from "crypto-js";
// import {
//   useAnswerPostMutation,
// } from "@/app/redux/features/answerSlice";
// import {
//   useQuestionGetAllQuery,
//   useQuestionPostMutation,
//   useRequestAllRoomDataQuery,
// } from "@/app/redux/features/quesationSlice";
// import { useUserProfileQuery } from "@/app/redux/features/userSlice";
// import {
//   useAllRoomQuery,
//   useRecentRoomQuery,
// } from "@/app/redux/features/roomSlice";
// import Image from "next/image";
// import Swal from "sweetalert2";
// import { MdPayment } from "react-icons/md";

// const RoomPage = ({ params, searchParams }) => {
//   const [id, setId] = useState(null);

//   // const { data } = useGetAllAnsQuery(id);
//   // const { data } = useRequestQuery(id);
//   const { data } = useRequestAllRoomDataQuery(id);
//   // console.log(typeof(data),'=====================> query')

//   console.log(data, "=======================");

//   useEffect(() => {
//     const getId = async () => {
//       const resolvedParams = await params;
//       setId(resolvedParams.id);
//     };
//     getId();
//   }, [params]);

//   const results = data?.data?.result || [];

//   const answerData = data?.data?.[0];
//   const answer = answerData?.answer;
//   const questions = answerData?.questionId?.question;

//   const { data: recentRoom } = useRecentRoomQuery();

//   // const { data: questionGetAll } = useQuestionGetAllQuery();
//   const { data: allRoom } = useAllRoomQuery();

//   const [postAnswer] = useAnswerPostMutation();
//   const [postQuestion] = useQuestionPostMutation();

//   const [question, setQuestion] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [generatingAnswer, setGeneratingAnswer] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [fileContent, setFileContent] = useState("");
//   const [fileName, setFileName] = useState("");
//   const { data: userProfile, isLoading, error } = useUserProfileQuery();

//   const { data: questionGetAll } = useQuestionGetAllQuery();
//   // const { data: previous } = useQuestionPostMutation();

//   const router = useRouter();

//   if (questionGetAll?.data?.result) {
//     questionGetAll.data.result.forEach((item) => {
//       // console.log(item.question);
//     });
//   }

//   const ApiKey = process.env.NEXT_PUBLIC_API_KEY;
//   // console.log(ApiKey);

//   const chatContainerRef = useRef(null); // Reference for chat container

//   useEffect(() => {
//     // Scroll to the bottom whenever chatHistory is updated
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory]);
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFileName(file.name);
//       const reader = new FileReader();
//       reader.onload = (e) => setFileContent(e.target.result);
//       reader.onerror = () => {
//         console.error("Error reading file");
//         setFileContent("");
//       };
//       reader.readAsText(file);
//     }
//   };

//   console.log(id, "asdasdasdasdasdasdasdasd");

//   const SECRET_KEY = process.env.NEXT_PUBLIC_HELLO; // Replace with a strong secret key

//   // Encrypt data
//   const encryptData = (data) => {
//     return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
//   };

//   // Decrypt data
//   const decryptData = (encryptedData) => {
//     try {
//       const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
//       return bytes.toString(CryptoJS.enc.Utf8);
//     } catch (error) {
//       console.error("Error decrypting data:", error);
//       return null;
//     }
//   };

//   // const generateAnswer = async (e) => {
//   //   e.preventDefault();

//   //   let encryptedZetaSession = sessionStorage.getItem("zetaSession");
//   //   let zetaSession = encryptedZetaSession
//   //     ? parseInt(decryptData(encryptedZetaSession) || "0", 10)
//   //     : 0;

//   //   if (!userProfile?.data?.subscription && zetaSession >= 3) {
//   //     alert(
//   //       "You have reached the free chat limit. Please subscribe to continue."
//   //     );
//   //     router.push("/payment");
//   //     return;
//   //   }

//   //   if (!question.trim() && !fileContent.trim()) {
//   //     alert("Please provide a question or upload a file.");
//   //     return;
//   //   }

//   //   setGeneratingAnswer(true);

//   //   const currentQuestion = fileContent
//   //     ? `Based on the following text file content, provide a Bible-related answer: ${fileContent}`
//   //     : question;

//   //   console.log(currentQuestion, "question");

//   //   setChatHistory((prev) => [
//   //     ...prev,
//   //     { type: "question", content: currentQuestion },
//   //   ]);

//   //   try {
//   //     if (!currentQuestion) throw new Error("Question cannot be empty");

//   //     const response = await axios.post(
//   //       "https://api.openai.com/v1/chat/completions",
//   //       {
//   //         model: "gpt-4",
//   //         messages: [
//   //           {
//   //             role: "system",
//   //             content:
//   //               "You are a helpful assistant that only answers Bible-related questions.",
//   //           },
//   //           { role: "user", content: currentQuestion },
//   //         ],
//   //         max_tokens: 150,
//   //       },
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: `Bearer ${ApiKey}`,
//   //         },
//   //       }
//   //     );

//   //     console.log(response, "res iiojlkjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

//   //     if (!response?.data?.choices?.[0]?.message?.content) {
//   //       throw new Error("Invalid response from OpenAI.");
//   //     }

//   //     const aiResponse = response.data.choices[0].message.content.trim();
//   //     const results = data?.data?.result?.roomName;

//   //     const questionData = {
//   //       question: currentQuestion,
//   //       answer: aiResponse,
//   //       room: results,
//   //     };

//   //     console.log(questionData, "new quesation ksdlfjlk");

//   //     console.log(questionData, "question data");

//   //     const answerResponse = await postQuestion(questionData);

//   //     if (!answerResponse) {
//   //       throw new Error("Error saving answer to the database.");
//   //     }

//   //     setChatHistory((prev) => [
//   //       ...prev,
//   //       { type: "answer", content: aiResponse },
//   //     ]);

//   //     if (!userProfile?.data?.subscription) {
//   //       zetaSession += 1;
//   //       sessionStorage.setItem(
//   //         "zetaSession",
//   //         encryptData(zetaSession.toString())
//   //       );

//   //       if (zetaSession > 3) {
//   //         alert(
//   //           "You have reached your free chat limit. Redirecting to payment..."
//   //         );
//   //         router.push("/payment");
//   //         return;
//   //       }
//   //     } else {
//   //       router.replace(router.asPath);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching response:", error.message);
//   //     setChatHistory((prev) => [
//   //       ...prev,
//   //       {
//   //         type: "answer",
//   //         content: "Sorry - Something went wrong. Please try again!",
//   //       },
//   //     ]);
//   //   }

//   //   setGeneratingAnswer(false);
//   //   setFileContent("");
//   //   setFileName("");
//   //   setQuestion("");
//   // };

//   const generateAnswer = async (e) => {
//     e.preventDefault();
//     setQuestion("");

//     let encryptedZetaSession = sessionStorage.getItem("zetaSession");
//     let zetaSession = encryptedZetaSession
//       ? parseInt(decryptData(encryptedZetaSession) || "0", 10)
//       : 0;

//     if (!userProfile?.data?.subscription && zetaSession >= 3) {
//       alert(
//         "You have reached the free chat limit. Please subscribe to continue."
//       );
//       router.push("/payment");
//       return;
//     }

//     if (!question.trim() && !fileContent.trim()) {
//       alert("Please provide a question or upload a file.");
//       return;
//     }

//     setGeneratingAnswer(true);

//     const currentQuestion = fileContent
//       ? `Based on the following text file content, provide a Bible-related answer: ${fileContent}`
//       : question;

//     console.log(currentQuestion, "question");

//     setChatHistory((prev) => [
//       ...prev,
//       { type: "question", content: currentQuestion },
//     ]);

//     try {
//       // **Validate request before sending**
//       if (!currentQuestion) throw new Error("Question cannot be empty");

//       // **2. Send the question to OpenAI**
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-4",
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are a helpful assistant that only answers Bible-related questions.",
//             },
//             { role: "user", content: currentQuestion },
//           ],
//           max_tokens: 150,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${ApiKey}`,
//           },
//         }
//       );

//       console.log(response, "res");

//       if (!response?.data?.choices?.[0]?.message?.content) {
//         throw new Error("Invalid response from OpenAI.");
//       }

//       const aiResponse = response.data.choices[0].message.content.trim();

//       // **3. Save the question and answer in the database**
//       const questionData = {
//         question: currentQuestion,
//         answer: aiResponse,
//       };

//       console.log(
//         questionData,
//         "hjksd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;f"
//       );

//       const answerResponse = await postQuestion(questionData);

//       if (!answerResponse) {
//         throw new Error("Error saving answer to the database.");
//       }

//       // **4. Update chat history**
//       setChatHistory((prev) => [
//         ...prev,
//         { type: "answer", content: aiResponse },
//       ]);

//       // **5. Update session tracking**
//       if (!userProfile?.data?.subscription) {
//         zetaSession += 1;
//         sessionStorage.setItem(
//           "zetaSession",
//           encryptData(zetaSession.toString())
//         );

//         if (zetaSession > 3) {
//           alert(
//             "You have reached your free chat limit. Redirecting to payment..."
//           );
//           router.push("/payment");
//           return;
//         }
//       } else {
//         router.replace(router.asPath);
//       }
//     } catch (error) {
//       console.error("Error fetching response:", error.message);
//       setChatHistory((prev) => [
//         ...prev,
//         {
//           type: "answer",
//           content: "Sorry - Something went wrong. Please try again!",
//         },
//       ]);
//     }

//     setGeneratingAnswer(false);
//     setFileContent("");
//     setFileName("");
//     setQuestion("");
//   };

//   const [isOpen, setIsOpen] = useState(false);

//   // Toggle dropdown visibility
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogOut = () => {
//     Swal.fire({
//       text: "Are you sure you want to logout?",
//       showCancelButton: true,
//       confirmButtonText: "Sure",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#DC2626",
//       reverseButtons: true,
//     }).then((res) => {
//       if (res.isConfirmed) {
//         // Remove tokens from localStorage
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");

//         // Remove cookies with path
//         Cookies.remove("accessToken", { path: "/" });

//         // Redirect to auth page
//         router.push("/auth");
//       }
//     });
//   };

//   // Reset chat count when the user subscribes
//   useEffect(() => {
//     if (userProfile?.data?.subscription) {
//       sessionStorage.removeItem("zetaSession"); // Reset the count for subscribed users
//     }
//   }, [userProfile]);

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 lg:w-80 w-64 bg-[#dedcd1] h-full z-40 transition-transform transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0`}
//       >
//         <aside className="h-full flex flex-col justify-between">
//           <div className="p-4 text-[#535136] text-center font-bold text-4xl border-b">
//             Holybot
//           </div>

//           <Link href={"/chat"}>
//             <div className="mt-3 text-center text-2xl font-semibold text-[#fb9b24] mb-3 flex items-center justify-center gap-2 cursor-pointer">
//               <MessageSquareDiff />
//               <h1>Start new chat </h1>
//             </div>
//           </Link>

//           <div>
//             <div className="mb-5">
//               {/* Section Header */}
//               <h1 className="pl-5 font-semibold text-lg mb-3">Recent</h1>

//               <div className="flex flex-col gap-3">
//                 {recentRoom?.data?.result?.slice(0, 4).map((item) => (
//                   <Link key={item._id} href={`/chat/${item._id}`} passHref>
//                     <div className="flex items-center gap-4 bg-[#ecebe5] hover:bg-gray-100 cursor-pointer px-3 py-3 mx-4 rounded-full shadow-sm transition-all duration-150">
//                       <MessagesSquare className="text-gray-700" />
//                       <p className="text-sm font-medium text-gray-700">
//                         {item.roomName.length > 9
//                           ? item.roomName.slice(0, -9).slice(0, 25)
//                           : item.roomName}
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mt-6 space-y-3">
//             <div className="mb-5">
//               <h1 className="pl-5 font-semibold text-lg mb-3">Previous</h1>
//               <div className="flex flex-col gap-3">
//                 {allRoom?.data?.result?.slice(0, 4).map((item) => (
//                   <Link key={item._id} href={`/chat/${item._id}`} passHref>
//                     <div className="flex items-center gap-4 bg-[#ecebe5] hover:bg-gray-100 cursor-pointer px-3 py-3 mx-4 rounded-full shadow-sm transition-all duration-150">
//                       <MessagesSquare className="text-gray-700" />
//                       <p className="text-sm font-medium text-gray-700">
//                         {item.roomName.length > 9
//                           ? item.roomName.slice(0, -9).slice(0, 20)
//                           : item.roomName}
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//               <div className="flex justify-center mt-6">
//                 <Link
//                   href="/history"
//                   className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-600 font-medium text-sm rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md hover:text-blue-700 transition-all duration-300"
//                 >
//                   View All Previous Chats
//                   <ArrowRightFromLine className="w-4 h-4" />
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* User Profile */}
//           <div className="mt-auto p-4">
//             <div className=" px-4 py-2 rounded-lg w-full font-medium flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2">
//               <div className="flex justify-center sm:justify-start">
//                 <img
//                   src={userProfile?.data?.image || "/placeholder-avatar.png"}
//                   className="w-12 h-12 object-cover rounded-full"
//                   alt="User Avatar"
//                 />
//               </div>
//               <div className="text-center sm:text-left">
//                 <span className="text-sm font-semibold block text-gray-800">
//                   {userProfile?.data?.name || "User Name"}
//                 </span>
//                 <span className="text-xs text-gray-600">
//                   {userProfile?.data?.email || "Guest"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </aside>
//       </div>

//       {/* Sidebar Overlay for Mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-grow lg:pl-64 lg:p-4">
//         {/* Hamburger Menu for Mobile */}
//         <div className="lg:hidden flex justify-between items-center mb-4 p-4">
//           <h1 className="text-2xl font-bold">Holybot</h1>
//           <button
//             className="text-2xl p-2 bg-gray-200 rounded-md"
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           >
//             <HiMenu />
//           </button>
//         </div>
//         <div className="flex items-center justify-center">
//           <div className="max-w-6xl w-full lg:px-4">
//             {/* Header Section */}
//             <div className="max-w-3xl mx-auto   p-4">
//               <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">
//                 Ask a Bible-related question or upload a text file.
//               </h1>

//               <div className="pb-10">
//                 <div
//                   className="lg:p-4 overflow-y-auto scrollbar-hide mx-auto w-full"
//                   ref={chatContainerRef}
//                   style={{ maxHeight: "80vh" }}
//                 >
//                   <div className="space-y-4">
//                     {results.map((item) => (
//                       <div
//                         key={item._id}
//                         className="lg:p-4 space-y-3 rounded-md"
//                       >
//                         <div className="p-4 flex items-center gap-2 rounded-md text-sm md:text-base bg-[#dedcd1]">
//                           <Image
//                             src={"/image/logo.png"}
//                             className="size-6 rounded-full bg-cover"
//                             alt="logo"
//                             height={400}
//                             width={400}
//                           ></Image>
//                           <p> {item.question}</p>
//                         </div>
//                         <p className="p-4 rounded-md text-sm md:text-base bg-white">
//                           {item.answer}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   {/* <div className="space-y-4">
//                     {chatHistory.map((chat, index) => (
//                       <div
//                         key={index}
//                         className={`p-4 rounded-md text-sm md:text-base mx-4 flex items-center gap-2 ${
//                           chat.type === "question" ? "bg-[#dedcd1]" : "bg-white"
//                         }`}
//                       >
//                         <div>
//                           <div className="flex gap-3">
//                             {chat.type === "question" && (
//                               <Image
//                                 src={"/image/logo.png"}
//                                 className="size-6 rounded-full bg-cover"
//                                 alt="logo"
//                                 height={24}
//                                 width={24}
//                               />
//                             )}
//                             <span>{chat.content}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div> */}

//                   {generatingAnswer && (
//                     <div className="p-4 mb-4 rounded-md text-sm md:text-base flex justify-center items-center text-blue-500 text-center">
//                       <div className="flex flex-row gap-2 items-center">
//                         <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce"></div>
//                         <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.3s]"></div>
//                         <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.5s]"></div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             {/* Footer Input Section */}
//             <div className="mt-4 lg:ml-[80px] ml-0 flex flex-col md:flex-row items-center justify-center gap-4 fixed bottom-2 left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
//               <form onSubmit={generateAnswer} className="w-full relative">
//                 {/* Text Input */}
//                 <div className="relative flex-grow w-full">
//                   <div className="h-4 mb-7 lg:w-1/3">
//                     {/* Fixed height for file name */}
//                     {fileName && (
//                       <div className="text-sm flex items-center rounded-lg gap-2 bg-gray-300 px-2 py-2 text-gray-600 truncate">
//                         <FileText className="text-pink-500" />
//                         {fileName}
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setFileName(null);
//                             setSelectedFile(null);
//                           }}
//                           className="ml-2 text-red-500 hover:text-red-700"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <input
//                     type="text"
//                     value={question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                     className="w-full bg-gray-50 p-2 py-4 md:py-6 pl-4 pr-14 rounded-3xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
//                     placeholder="Ask a Bible-related question..."
//                     required
//                   />
//                   {/* File Upload */}
//                   <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex  items-center gap-2">
//                     <input
//                       type="file"
//                       accept=".txt"
//                       onChange={handleFileUpload}
//                       className="hidden"
//                       id="file-upload"
//                     />
//                     <label
//                       htmlFor="file-upload"
//                       className="cursor-pointer bg-gray-200 mt-10 p-2 rounded-md hover:bg-gray-300"
//                     >
//                       <PiLinkSimpleBold size={20} />
//                     </label>
//                   </div>

//                   {/* <div className="hidden sm:block">
//                     <button
//                       type="submit"
//                       disabled={generatingAnswer}
//                       className={`px-4 py-2 rounded-md text-white ${
//                         generatingAnswer
//                           ? "bg-gray-500 cursor-not-allowed"
//                           : "bg-black hover:bg-black focus:ring-2 focus:ring-blue-300"
//                       }`}
//                     >
//                       {generatingAnswer ? "Loading..." : "Send"}
//                     </button>
//                   </div> */}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="relative inline-block pr-7 pt-4 hidden sm:block">
//         {/* Clickable Image */}
//         <img
//           src="/image/users.jpg" // Replace with your image path
//           alt="Dropdown Trigger"
//           className="w-12 h-12 rounded-full cursor-pointer"
//           onClick={toggleDropdown}
//         />

//         {/* Dropdown Menu */}
//         {isOpen && (
//           <div className="absolute right-0 mt-2 w-48 mr-8 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
//             <div className="py-1">
//               <button className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-black hover:bg-red-50">
//                 <User className="w-4 h-4" />{" "}
//                 {userProfile?.data?.name || "User Name"}
//               </button>

//               <Link
//                 href={"/payment"}
//                 className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-black hover:bg-red-50"
//               >
//                 <MdPayment className="w-4 h-4" /> Payment
//               </Link>

//               <button
//                 onClick={handleLogOut}
//                 className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//               >
//                 <LogOut className="w-4 h-4" /> Logout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RoomPage;

"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { PiLinkSimpleBold } from "react-icons/pi";
import { HiMenu } from "react-icons/hi";
import {
  ArrowRightFromLine,
  FileText,
  FileTextIcon,
  LogOut,
  MessageSquareDiff,
  MessagesSquare,
  User,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import {
  useAnswerPostMutation,
  useGetAllAnsQuery,
} from "@/app/redux/features/answerSlice";
import {
  usePreviousQuery,
  useQuestionGetAllQuery,
  useQuestionPostMutation,
  useRequestAllRoomDataQuery,
  useRequestQuery,
} from "@/app/redux/features/quesationSlice";
import { useUserProfileQuery } from "@/app/redux/features/userSlice";
import {
  useAllRoomQuery,
  useRecentRoomQuery,
} from "@/app/redux/features/roomSlice";
import Image from "next/image";
import Swal from "sweetalert2";
import { MdPayment } from "react-icons/md";
import { Typewriter } from "react-simple-typewriter";
import Cookies from "js-cookie";

const RoomPage = ({ params, searchParams }) => {
  const [id, setId] = useState(null);

  // const { data } = useGetAllAnsQuery(id);
  // const { data } = useRequestQuery(id);
  const { data } = useRequestAllRoomDataQuery(id);
  console.log(data, "====================data ===============");
  // console.log(typeof(data),'=====================> query')

  console.log(data, "=======================");

  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    getId();
  }, [params]);

  const results = data?.data?.result || [];

  const answerData = data?.data;
  const answer = answerData?.answer;
  const questions = answerData?.questionId?.question;

  const { data: recentRoom } = useRecentRoomQuery();

  // const { data: questionGetAll } = useQuestionGetAllQuery();
  const { data: allRoom } = useAllRoomQuery();

  const [postAnswer] = useAnswerPostMutation();
  const [postQuestion] = useQuestionPostMutation();

  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const { data: userProfile, isLoading, error } = useUserProfileQuery();

  const { data: questionGetAll } = useQuestionGetAllQuery();
  // const { data: previous } = useQuestionPostMutation();

  const router = useRouter();

  if (questionGetAll?.data?.result) {
    questionGetAll.data.result.forEach((item) => {
      // console.log(item.question);
    });
  }

  const ApiKey = process.env.NEXT_PUBLIC_API_KEY;
  // console.log(ApiKey);

  const chatContainerRef = useRef(null); // Reference for chat container

  useEffect(() => {
    // Scroll to the bottom whenever chatHistory is updated
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => setFileContent(e.target.result);
      reader.onerror = () => {
        console.error("Error reading file");
        setFileContent("");
      };
      reader.readAsText(file);
    }
  };

  console.log(id, "asdasdasdasdasdasdasdasd");

  const SECRET_KEY = process.env.NEXT_PUBLIC_HELLO; // Replace with a strong secret key

  // Encrypt data
  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  };

  // Decrypt data
  const decryptData = (encryptedData) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Error decrypting data:", error);
      return null;
    }
  };

  // const generateAnswer = async (e) => {
  //   e.preventDefault();

  //   let encryptedZetaSession = sessionStorage.getItem("zetaSession");
  //   let zetaSession = encryptedZetaSession
  //     ? parseInt(decryptData(encryptedZetaSession) || "0", 10)
  //     : 0;

  //   if (!userProfile?.data?.subscription && zetaSession >= 3) {
  //     alert(
  //       "You have reached the free chat limit. Please subscribe to continue."
  //     );
  //     router.push("/payment");
  //     return;
  //   }

  //   if (!question.trim() && !fileContent.trim()) {
  //     alert("Please provide a question or upload a file.");
  //     return;
  //   }

  //   setGeneratingAnswer(true);

  //   const currentQuestion = fileContent
  //     ? `Based on the following text file content, provide a Bible-related answer: ${fileContent}`
  //     : question;

  //   console.log(currentQuestion, "question");

  //   setChatHistory((prev) => [
  //     ...prev,
  //     { type: "question", content: currentQuestion },
  //   ]);

  //   try {
  //     if (!currentQuestion) throw new Error("Question cannot be empty");

  //     const response = await axios.post(
  //       "https://api.openai.com/v1/chat/completions",
  //       {
  //         model: "gpt-4",
  //         messages: [
  //           {
  //             role: "system",
  //             content:
  //               "You are a helpful assistant that only answers Bible-related questions.",
  //           },
  //           { role: "user", content: currentQuestion },
  //         ],
  //         max_tokens: 150,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${ApiKey}`,
  //         },
  //       }
  //     );

  //     console.log(response, "res iiojlkjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

  //     if (!response?.data?.choices?.[0]?.message?.content) {
  //       throw new Error("Invalid response from OpenAI.");
  //     }

  //     const aiResponse = response.data.choices[0].message.content.trim();
  //     const results = data?.data?.result?.roomName;

  //     const questionData = {
  //       question: currentQuestion,
  //       answer: aiResponse,
  //       room: results,
  //     };

  //     console.log(questionData, "new quesation ksdlfjlk");

  //     console.log(questionData, "question data");

  //     const answerResponse = await postQuestion(questionData);

  //     if (!answerResponse) {
  //       throw new Error("Error saving answer to the database.");
  //     }

  //     setChatHistory((prev) => [
  //       ...prev,
  //       { type: "answer", content: aiResponse },
  //     ]);

  //     if (!userProfile?.data?.subscription) {
  //       zetaSession += 1;
  //       sessionStorage.setItem(
  //         "zetaSession",
  //         encryptData(zetaSession.toString())
  //       );

  //       if (zetaSession > 3) {
  //         alert(
  //           "You have reached your free chat limit. Redirecting to payment..."
  //         );
  //         router.push("/payment");
  //         return;
  //       }
  //     } else {
  //       router.replace(router.asPath);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching response:", error.message);
  //     setChatHistory((prev) => [
  //       ...prev,
  //       {
  //         type: "answer",
  //         content: "Sorry - Something went wrong. Please try again!",
  //       },
  //     ]);
  //   }

  //   setGeneratingAnswer(false);
  //   setFileContent("");
  //   setFileName("");
  //   setQuestion("");
  // };

  const generateAnswer = async (e) => {
    e.preventDefault();
    setQuestion("");

    let encryptedZetaSession = sessionStorage.getItem("zetaSession");
    let zetaSession = encryptedZetaSession
      ? parseInt(decryptData(encryptedZetaSession) || "0", 10)
      : 0;

    if (!userProfile?.data?.subscription && zetaSession >= 3) {
      alert(
        "You have reached the free chat limit. Please subscribe to continue."
      );
      router.push("/payment");
      return;
    }

    if (!question.trim() && !fileContent.trim()) {
      alert("Please provide a question or upload a file.");
      return;
    }

    setGeneratingAnswer(true);

    const formattedFileContent = Array.isArray(fileContent)
      ? fileContent.join("\n")
      : fileContent;

    const currentQuestion = formattedFileContent
      ? `${formattedFileContent}===>${question}`
      : question;

    console.log(currentQuestion, "question");

    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: currentQuestion },
    ]);

    try {
      // **Validate request before sending**
      if (!currentQuestion) throw new Error("Question cannot be empty");
      const formatDataForNextJS = (result) => {
        var demoList = [];

        result.map((data) =>
          demoList.push(
            { role: "user", content: data.question },
            { role: "assistant", content: data.answer }
          )
        );

        console.log(
          demoList,
          "================================> Demo Chat History"
        );

        return demoList;
      };

      const previousMessages = formatDataForNextJS(results);

      const messages = [
        {
          role: "system",
          content:
            "You are a helpful assistant that only answers Bible-related questions.",
        },
        ...previousMessages, // Including previous chat context
        { role: "user", content: currentQuestion },
      ];

      // **2. Send the question to OpenAI**
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: messages,
          max_tokens: 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ApiKey}`,
          },
        }
      );

      console.log(response, "res");

      if (!response?.data?.choices?.[0]?.message?.content) {
        throw new Error("Invalid response from OpenAI.");
      }

      const aiResponse = response.data.choices[0].message.content.trim();

      // **3. Save the question and answer in the database**
      const questionData = {
        question: currentQuestion,
        answer: aiResponse,
        fileQuestion: question,
        path: fileName,
        room: results[0].room.roomName,
      };

      console.log(
        questionData,
        "hjksd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;fd;f"
      );

      const answerResponse = await postQuestion(questionData);

      if (!answerResponse) {
        throw new Error("Error saving answer to the database.");
      }

      // **4. Update chat history**
      setChatHistory((prev) => [
        ...prev,
        //   answerResponse?.data
        { type: "answer", content: aiResponse },
      ]);

      /// results.push(answerResponse?.data)
      // **5. Update session tracking**
      if (!userProfile?.data?.subscription) {
        zetaSession += 1;
        sessionStorage.setItem(
          "zetaSession",
          encryptData(zetaSession.toString())
        );

        if (zetaSession > 3) {
          alert(
            "You have reached your free chat limit. Redirecting to payment..."
          );
          router.push("/payment");
          return;
        }
      } else {
        router.replace(router.asPath);
      }
    } catch (error) {
      console.error("Error fetching response:", error.message);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "answer",
          content: "Sorry - Something went wrong. Please try again!",
        },
      ]);
    }

    setGeneratingAnswer(false);
    setFileContent("");
    setFileName("");
    setQuestion("");
  };

  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    Swal.fire({
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Sure",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        // Remove tokens from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Remove cookies with path
        Cookies.remove("accessToken", { path: "/" });

        // Redirect to auth page
        router.push("/auth");
      }
    });
  };

  // Reset chat count when the user subscribes
  useEffect(() => {
    if (userProfile?.data?.subscription) {
      sessionStorage.removeItem("zetaSession"); // Reset the count for subscribed users
    }
  }, [userProfile]);
    // Update scroll when results change
    useEffect(() => {
      if (chatContainerRef.current) {
        // Scroll to bottom with smooth animation
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, [results]);

  return (
    <div className="flex">
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

          <Link href={"/chat"}>
            <div className="mt-3 text-center text-2xl font-semibold text-[#fb9b24] mb-3 flex items-center justify-center gap-2 cursor-pointer">
              <MessageSquareDiff />
              <h1>Start new chat </h1>
            </div>
          </Link>

          <div>
            <div className="mb-5">
              {/* Section Header */}
              <h1 className="pl-5 font-semibold text-lg mb-3">Recent</h1>

              <div className="flex flex-col gap-3">
                {recentRoom?.data?.result?.slice(0, 4).map((item) => (
                  <Link key={item._id} href={`/chat/${item._id}`} passHref>
                    <div className="flex items-center gap-4 bg-[#ecebe5] hover:bg-gray-100 cursor-pointer px-3 py-3 mx-4 rounded-full shadow-sm transition-all duration-150">
                      <MessagesSquare className="text-gray-700" />
                      <p className="text-sm font-medium text-gray-700">
                        {item.roomName.length > 9
                          ? item.roomName.slice(0, -9).slice(0, 25)
                          : item.roomName}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="mb-5">
              <h1 className="pl-5 font-semibold text-lg mb-3">Previous</h1>
              <div className="flex flex-col gap-3">
                {allRoom?.data?.result?.slice(0, 4).map((item) => (
                  <Link key={item._id} href={`/chat/${item._id}`} passHref>
                    <div className="flex items-center gap-4 bg-[#ecebe5] hover:bg-gray-100 cursor-pointer px-3 py-3 mx-4 rounded-full shadow-sm transition-all duration-150">
                      <MessagesSquare className="text-gray-700" />
                      <p className="text-sm font-medium text-gray-700">
                        {item.roomName.length > 9
                          ? item.roomName.slice(0, -9).slice(0, 20)
                          : item.roomName}
                      </p>
                    </div>
                  </Link>
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

          {/* User Profile */}
          <div className="mt-auto p-4">
            <div className=" px-4 py-2 rounded-lg w-full font-medium flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2">
              <div className="flex justify-center sm:justify-start">
                <img
                  src={userProfile?.data?.image || "/placeholder-avatar.png"}
                  className="w-12 h-12 object-cover rounded-full"
                  alt="User Avatar"
                />
              </div>
              <div className="text-center sm:text-left">
                <span className="text-sm font-semibold block text-gray-800">
                  {userProfile?.data?.name || "User Name"}
                </span>
                <span className="text-xs text-gray-600">
                  {userProfile?.data?.email || "Guest"}
                </span>
              </div>
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

      {/* Main Content */}
      <div className="flex-grow lg:pl-64 lg:p-4">
        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden flex justify-between items-center mb-4 p-4">
          <h1 className="text-2xl font-bold">Holybot</h1>
          <button
            className="text-2xl p-2 bg-gray-200 rounded-md"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <HiMenu />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <div className="max-w-6xl w-full lg:px-4">
            {/* Header Section */}
            <div className="max-w-3xl mx-auto   p-4">
              <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">
                Ask a Bible-related question or upload a text file.
              </h1>

              <div className="pb-10">
                <div
                  className="lg:p-4 overflow-y-auto scrollbar-hide mx-auto w-full"
                  ref={chatContainerRef}
                  style={{ maxHeight: "80vh" }}
                >
                  <div className="space-y-4">
                    {results.map((item) => (
                      <div
                        key={item._id}
                        className="lg:p-4 space-y-3 rounded-md"
                      >
                        <div className="p-4 flex items-center gap-2 rounded-md text-sm md:text-base bg-[#dedcd1]">
                          <Image
                            src={"/image/logo.png"}
                            className="size-6 rounded-full bg-cover"
                            alt="logo"
                            height={400}
                            width={400}
                          ></Image>
                          <div className="flex flex-col items-start gap-3    shadow-sm ">
                            {item.path ? (
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                                  <FileTextIcon className="text-pink-500 w-5 h-5" />
                                  <span className="text-gray-700 font-medium">
                                    {item.path}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-lg">
                                  {item.fileQuestion}
                                </p>
                              </div>
                            ) : (
                              <p className="text-gray-600 text-lg">
                                {item.question}
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="p-4 rounded-md text-sm md:text-base bg-white">
                          {results.length - 1 === results.indexOf(item) ? (
                            <Typewriter words={[item.answer]} typeSpeed={3} />
                          ) : (
                            item.answer
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* <div className="space-y-4">
                    {chatHistory.map((chat, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-md text-sm md:text-base mx-4 flex items-center gap-2 ${
                          chat.type === "question" ? "bg-[#dedcd1]" : "bg-white"
                        }`}
                      >
                        <div>
                          <div className="flex gap-3">
                            {chat.type === "question" && (
                              <Image
                                src={"/image/logo.png"}
                                className="size-6 rounded-full bg-cover"
                                alt="logo"
                                height={24}
                                width={24}
                              />
                            )}
                            <span>{chat.content}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div> */}

                  {generatingAnswer && (
                    <div className="p-4 mb-4 rounded-md text-sm md:text-base flex justify-center items-center text-blue-500 text-center">
                      <div className="flex flex-row gap-2 items-center">
                        <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce"></div>
                        <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.5s]"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Footer Input Section */}
            <div className="mt-4 lg:ml-[80px] ml-0 flex flex-col md:flex-row items-center justify-center gap-4 fixed bottom-2 left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
              <form onSubmit={generateAnswer} className="w-full relative">
                {/* Text Input */}
                <div className="relative flex-grow w-full">
                  <div className="h-4 mb-7 lg:w-1/3">
                    {/* Fixed height for file name */}
                    {fileName && (
                      <div className="text-sm flex items-center rounded-lg gap-2 bg-gray-300 px-2 py-2 text-gray-600 truncate">
                        <FileText className="text-pink-500" />
                        {fileName}
                        <button
                          type="button"
                          onClick={() => {
                            setFileName(null);
                            setSelectedFile(null);
                          }}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full bg-gray-50 p-2 py-4 md:py-6 pl-4 pr-14 rounded-3xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                    placeholder="Ask a Bible-related question..."
                    required
                  />
                  {/* File Upload */}
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex  items-center gap-2">
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-gray-200 mt-10 p-2 rounded-md hover:bg-gray-300"
                    >
                      <PiLinkSimpleBold size={20} />
                    </label>
                  </div>

                  {/* <div className="hidden sm:block">
                    <button
                      type="submit"
                      disabled={generatingAnswer}
                      className={`px-4 py-2 rounded-md text-white ${
                        generatingAnswer
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-black hover:bg-black focus:ring-2 focus:ring-blue-300"
                      }`}
                    >
                      {generatingAnswer ? "Loading..." : "Send"}
                    </button>
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="relative inline-block pr-7 pt-4 hidden sm:block">
        {/* Clickable Image */}
        <img
          src="/image/users.jpg" // Replace with your image path
          alt="Dropdown Trigger"
          className="w-12 h-12 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 mr-8 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-black hover:bg-red-50">
                <User className="w-4 h-4" />{" "}
                {userProfile?.data?.name || "User Name"}
              </button>

              <Link
                href={"/payment"}
                className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-black hover:bg-red-50"
              >
                <MdPayment className="w-4 h-4" /> Payment
              </Link>

              <button
                onClick={handleLogOut}
                className="flex w-full text-left items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomPage;
