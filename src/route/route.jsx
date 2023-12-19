import { Navigate } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, ProfilePage, VerifyPage, CreatePasswordPage, CreateEventPageFirst, CreateEventPageSecond, EditProfilePage, ProfileDetailPage, EventList } from "../pages";
import EventDetailPage from "../pages/event/EventDetailPage";

const routes = (isLoggedIn) => [
    {
        path: '/auth/login',
        element: !isLoggedIn ? <LoginPage /> : <Navigate to='/' />
    },
    {
        path: '/auth/register',
        element: !isLoggedIn ? <RegisterPage /> : <Navigate to='/' />
    },
    {
        path: '/auth/create-password',
        element: !isLoggedIn ? <CreatePasswordPage /> : <Navigate to='/' />
    },
    {
        path: '/auth/verify',
        element: !isLoggedIn ? <VerifyPage /> : <Navigate to='/auth/login' />
    },
    {
        path: '/',
        element: isLoggedIn ? <HomePage /> : <Navigate to='/auth/login' />
    },
    {
        path: '/profile',
        element: isLoggedIn ? <ProfilePage /> : <Navigate to='/auth/login' />
    },
    {
        path: '/profile/edit',
        element: isLoggedIn ? <EditProfilePage /> : <Navigate to='/auth/login' />
    },
    {
        path: '/profile/detail/:id',
        element: isLoggedIn ? <ProfileDetailPage /> : <Navigate to='/auth/login' />
    },
    {
        path: '/event/:id',
        element: <EventDetailPage />
    },
    {
        path: '/event/list',
        element: isLoggedIn ? <EventList /> : <Navigate to='/auth/login' />
    },
    {
        path: '/event/create/first',
        element: isLoggedIn ? <CreateEventPageFirst /> : <Navigate to='/auth/login' />
    },
    {
        path: '/event/create/second',
        element: isLoggedIn ? <CreateEventPageSecond /> : <Navigate to='/auth/login' />
    },
];

export default routes;