


import { NextResponse } from 'next/server'
import { getCurrentUser } from './app/service/authService'
 
// This function can be marked `async` if using `await` inside
export async function middleware (request) {

  const token=await getCurrentUser()


  if (!token) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    )
  }  // Check if user is authenticated before serving the page

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
       '/chat',
   "/chat/:page",
   "/payment",
   "/history",
  ]
}
