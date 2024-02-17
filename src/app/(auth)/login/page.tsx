import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/auth/LoginForm'

import { getCurrentUser } from '@/lib/firebase/server/auth'

const LoginPage = async () => {
  const user = await getCurrentUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className='h-full flex justify-center items-center'>
      <LoginForm />
    </div>
  )
}

export default LoginPage
