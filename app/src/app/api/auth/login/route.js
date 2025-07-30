import { NextResponse } from 'next/server'
import { authUtils } from '@/lib/auth'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Authenticate user
    const result = await authUtils.authenticateUser(email, password)

    if (result.success) {
      const response = NextResponse.json({
        message: 'Login successful',
        user: result.user,
        token: result.token
      })

      // Set HTTP-only cookie for additional security
      response.cookies.set('userToken', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })

      return response
    } else {
      return NextResponse.json(
        { message: result.message },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}