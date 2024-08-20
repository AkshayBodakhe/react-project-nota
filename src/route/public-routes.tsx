import { JSXElementConstructor, ReactElement } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import LoginPage from '../pages/auth/login'
import ForgotPasswordPage from '../pages/auth/forgot-password';
import LogoutPage from '../pages/auth/logout';
import EnterOTP from '../pages/auth/enter-otp';
import ResetPasswordPage from '../pages/auth/reset-password'
import SignUp from '../pages/auth/sign-up'

const PublicRoutes = () => {

    const publicRoutes: ReactElement<any, string | JSXElementConstructor<any>> | null = useRoutes([
        {
            path: '',
            element: <Navigate to="/auth/login" />
        },
        {
            path: '/auth',
            children: [
                {
                    path: 'login',
                    element: <LoginPage />
                },
                {
                    path: 'forgot-password',
                    element: <ForgotPasswordPage />
                },
                {
                    path: 'logout',
                    element: <LogoutPage openLogoutModal={false} />
                },
                {
                    path: 'enter-otp/:email',
                    element: <EnterOTP />
                },
                {
                    path: 'reset-password/:email',
                    element: <ResetPasswordPage />
                },
                {
                    path: 'signup',
                    element: <SignUp />
                }
            ]
        }
    ])

    return publicRoutes;
}

export default PublicRoutes;
