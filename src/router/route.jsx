import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const AuthRoute = lazy(() => import('../pages/AuthRoute'));
const LoginProtect = lazy(() => import('../pages/LoginProtect'));
const Login = lazy(() => import('../pages/Login'));
const JobsList = lazy(() => import('../pages/JobsList'));
const JobsPost = lazy(() => import('../pages/JobsPost'));


const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense>
                <LoginProtect>
                    <Login />
                </LoginProtect>
            </Suspense>
        )
    },
    {
        path: '/freelancer/jobboard',
        element: (
            <Suspense>
                <AuthRoute requiredRole='freelancer'>
                    <JobsList />
                </AuthRoute>
            </Suspense>
        )
    },
    {
        path: '/employer/myjobs',
        element: (
            <Suspense>
                <AuthRoute requiredRole='employer'>
                    <JobsPost />
                </AuthRoute>
            </Suspense>
        )
    }
]);

export default router;
