import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AuthRoute from '../pages/AuthRoute';
import LoginProtect from '../pages/LoginProtect';

const Login = lazy(() => import('../pages/Login'));
const JobsList = lazy(() => import('../pages/JobsList'));
const JobsPost = lazy(() => import('../pages/JobsPost'));


const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <LoginProtect>
                <Suspense fallback={<div>Loading...</div>}>
                    <Login />
                </Suspense>
            </LoginProtect>
        )
    },
    {
        path: '/freelancer/jobboard',
        element: (
            <AuthRoute requiredRole='freelancer'>
                <Suspense fallback={<div>Loading...</div>}>
                    <JobsList />
                </Suspense>
            </AuthRoute>
        )
    },
    {
        path: '/employer/myjobs',
        element: (
            <AuthRoute requiredRole='employer'>
                <Suspense fallback={<div>Loading...</div>}>
                    <JobsPost />
                </Suspense>
            </AuthRoute>

        )
    }
]);

export default router;
