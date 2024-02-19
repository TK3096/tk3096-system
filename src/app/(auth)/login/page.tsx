import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/auth/LoginForm'

import { isUserAuthenticated } from '@/lib/firebase/server/auth'

export const dynamic = 'force-dynamic'

const LoginPage = async () => {
  const isAuth = await isUserAuthenticated()

  if (isAuth) {
    redirect('/')
  }

  return (
    <div className='h-full flex justify-center items-center'>
      <LoginForm />
    </div>
  )
}

export default LoginPage
