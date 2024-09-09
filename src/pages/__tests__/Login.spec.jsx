/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import store from '../../store';
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Login from '../Login';
import { db } from '../../indexedDB';
import { expect } from 'vitest';

vi.mock('../../indexedDB', () => ({
    db: {
        users: {
            add: vi.fn(),
            where: vi.fn().mockReturnValue({
                where: vi.fn().mockReturnValue({
                    equals: vi.fn(),
                    each: vi.fn(),
                }),
            })
        }
    }
}));
vi.mock('react-router-dom', async () => {
    const mod = await vi.importActual('react-router-dom');
    return {
        ...mod,
        useNavigate: vi.fn().mockReturnValue(vi.fn())
    };
});
vi.mock('react-toastify', async () => {
    const mod = await vi.importActual('react-toastify');
    return {
        ...mod,
        toast: {
            error: vi.fn()
        }
    };
})


const renderApp = () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        </Provider>

    );
};

describe("Counter", () => {

    test("should render Login component", async () => {
        renderApp();
        const loginHeading = screen.getAllByText(/Login/i);
        const loginButton = screen.getByRole('button', { name: /Login/i });
        const freelancerText = screen.getByText(/Freelancer/i);
        const employerText = screen.getByText(/Employer/i)
        expect(loginHeading.length).toBe(2);
        expect(loginButton).toBeInTheDocument();
        expect(freelancerText).toBeInTheDocument();
        expect(employerText).toBeInTheDocument();
    });

    test('it should navigate to freelancer job board page', async () => {

        const mockUserInfo = { id: 1, email: 'test@gmail.com', role: 'freelancer' };
        const navigate = vi.fn();
        vi.mocked(db.users.where).mockReturnValueOnce({
            equals: vi.fn().mockReturnValueOnce(({
                each: vi.fn((callback = vi.fn()) => callback(mockUserInfo))
            })),
        });
        vi.mocked(useNavigate).mockReturnValue(navigate);

        renderApp();
        let emailInput, passwordInput
        await waitFor(() => {
            emailInput = screen.getByLabelText(/email/i);
            passwordInput = screen.getByLabelText(/password/i);
            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
        });
        const submitButton = await screen.getByRole('button', { name: /Login/i });

        await waitFor(() => {
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            fireEvent.click(submitButton);
        });
        expect(navigate.mock.calls[0][0]).toBe('/freelancer/jobboard');
    });

    test('it should navigate to employer job board page', async () => {

        const mockUserInfo = { id: 1, email: 'test@gmail.com', role: 'employer' };
        const navigate = vi.fn();
        vi.mocked(db.users.where).mockReturnValueOnce({
            equals: vi.fn().mockReturnValueOnce(({
                each: vi.fn((callback = vi.fn()) => callback(mockUserInfo))
            })),
        });
        vi.mocked(useNavigate).mockReturnValue(navigate);

        renderApp();
        let emailInput, passwordInput, employerTab
        await waitFor(() => {
            emailInput = screen.getByLabelText(/email/i);
            passwordInput = screen.getByLabelText(/password/i);
            employerTab = screen.getByText(/Employer/i);
            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
            expect(employerTab).toBeInTheDocument();
        });

        await waitFor(() => {
            fireEvent.click(employerTab);
        })

        const submitButton = screen.getByRole('button', { name: /Login/i });

        await waitFor(() => {
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            fireEvent.click(submitButton);
        });
        expect(navigate.mock.calls[0][0]).toBe('/employer/myjobs');
    });

    test('it should create user if no user found and navigate to the home page', async () => {

        const nullUser = null;
        const mockUserInfo = { id: 1, email: 'test@gmail.com', role: 'freelancer' };
        const navigate = vi.fn();
        vi.mocked(db.users.where).mockReturnValueOnce({
            equals: vi.fn().mockReturnValueOnce(({
                each: vi.fn((callback = vi.fn()) => callback(nullUser))
            })),
        });
        vi.mocked(db.users.add).mockReturnValue(1);
        vi.mocked(db.users.where).mockReturnValueOnce({
            equals: vi.fn().mockReturnValueOnce(({
                each: vi.fn((callback = vi.fn()) => callback(mockUserInfo))
            })),
        });
        vi.mocked(useNavigate).mockReturnValue(navigate);
        renderApp();

        let emailInput, passwordInput;
        await waitFor(() => {
            emailInput = screen.getByLabelText(/email/i);
            passwordInput = screen.getByLabelText(/password/i);
            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
        });

        const submitButton = screen.getByRole('button', { name: /Login/i });

        await waitFor(() => {
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            fireEvent.click(submitButton);
        });

        expect(navigate.mock.calls[0][0]).toBe('/freelancer/jobboard');

    });

    test('it should throw error if it is a invalid user', async () => {

        const nullUser = null;
        const mockUserInfo = { id: 1, email: 'test@gmail.com', role: 'employer' };
        const navigate = vi.fn();
        vi.mocked(db.users.where).mockReturnValueOnce({
            equals: vi.fn().mockReturnValueOnce(({
                each: vi.fn((callback = vi.fn()) => callback(nullUser))
            })),
        });
        vi.mocked(db.users.add).mockReturnValue(1);
        vi.mocked(db.users.where).mockReturnValueOnce({
            equals: vi.fn().mockReturnValueOnce(({
                each: vi.fn((callback = vi.fn()) => callback(mockUserInfo))
            })),
        });
        vi.mocked(useNavigate).mockReturnValue(navigate);
        renderApp();

        let emailInput, passwordInput;
        await waitFor(() => {
            emailInput = screen.getByLabelText(/email/i);
            passwordInput = screen.getByLabelText(/password/i);
            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
        });

        const submitButton = screen.getByRole('button', { name: /Login/i });

        await waitFor(() => {
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            fireEvent.click(submitButton);
        });

        expect(toast.error.mock.calls[0][0]).toBe('Failed to login! valid Username or Password');

    });

    test('it should not submit and show input field error if we haven not enter any value', async () => {

        renderApp();

        let emailInput, passwordInput;
        await waitFor(() => {
            emailInput = screen.getByLabelText(/email/i);
            passwordInput = screen.getByLabelText(/password/i);
            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
        });

        const submitButton = screen.getByRole('button', { name: /Login/i });

        await waitFor(() => {
            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            fireEvent.click(submitButton);
        });

        const emailErrorMessage = screen.getByText(/Please Enter Email Address/i);

        expect(emailErrorMessage).toBeInTheDocument();

    });

    test('it should not submit and show input field error if we have entered invalid value', async () => {

        renderApp();

        let emailInput, passwordInput;
        await waitFor(() => {
            emailInput = screen.getByLabelText(/email/i);
            passwordInput = screen.getByLabelText(/password/i);
            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
        });

        const submitButton = screen.getByRole('button', { name: /Login/i });

        await waitFor(() => {
            fireEvent.change(emailInput, { target: { value: 'asdasd' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            fireEvent.click(submitButton);
        });

        const invalidErrorMessage = screen.getByText(/Enter Valid Email Address/i);

        expect(invalidErrorMessage).toBeInTheDocument();

    });

})
