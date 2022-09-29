import React, { useEffect } from 'react';
import cx from 'classnames';
import { atom, useAtom } from 'jotai';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
    SignUp,
    AdditionalInfo,
    Confirmation,
    Success,
    Error,
} from './components/views';
import styles from './App.module.scss';

export const initialState = {
    name: {
        value: '',
        error: '',
    },
    email: {
        value: '',
        error: '',
    },
    password: {
        value: '',
        error: '',
    },
    color: {
        value: '',
        error: '',
    },
    terms: {
        value: false,
        error: '',
    },
};
export const formAtom = atom(initialState);

const router = createBrowserRouter([
    {
        element: <SignUp />,
        path: '/',
    },
    {
        element: <AdditionalInfo />,
        path: '/more-info',
    },
    {
        element: <Confirmation />,
        path: '/confirmation',
    },
    {
        element: <Success />,
        path: '/success',
    },
    {
        element: <Error />,
        path: '/error',
    },
]);

function App() {
    const [, setFormState] = useAtom(formAtom);

    useEffect(() => {
        try {
            const lsState = JSON.parse(
                localStorage.getItem('the-form-state')
            );
            if (lsState) {
                setFormState(lsState);
            }
        } catch (e) {}
    }, []);

    return (
        <section className={cx('m-auto border rounded-2 p-5 mt-5 d-inline-block', styles.wrapper)}>
            <RouterProvider router={router} />
        </section>
    );
}

export default App;
