import '@testing-library/jest-dom';
import { expect, describe, vi, test, afterEach } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLiveQuery } from 'dexie-react-hooks';
import { toast } from 'react-toastify';
import configureMockStore from 'redux-mock-store';
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import JobsList from '../JobsList';
import { db } from '../../indexedDB';
import { JobListMock } from './mockData';


vi.mock('../../indexedDB', () => ({
    db: {
        jobposts: {
            toArray: vi.fn()
        },
        appliedjob: {
            add: vi.fn()
        },
    }
}));
vi.mock('dexie-react-hooks', () => ({
    useLiveQuery: vi.fn(),
}));

vi.mock('react-redux', async () => {
    const mod = await vi.importActual('react-redux');
    return {
        ...mod,
        useSelector: vi.fn()
    };
});
vi.mock('react-toastify', async () => {
    const mod = await vi.importActual('react-toastify');
    return {
        ...mod,
        toast: {
            error: vi.fn(),
            success: vi.fn()
        }
    };
});


const mockStore = configureMockStore();

const renderApp = (storeValue = {}) => {
    let store = mockStore({
        userReducer: {
            loggedInUser: storeValue
        }
    });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobsList />
            </MemoryRouter>
        </Provider>

    );
};

describe("JobsList", () => {

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("should render JobsList component", async () => {

        useSelector.mockReturnValue({ loggedInUser: { id: 1, role: 'freelancer' } });
        vi.mocked(db.jobposts.toArray).mockReturnValueOnce(JobListMock);
        for (let i = 0; i < 10; i++) {
            vi.mocked(useLiveQuery).mockReturnValueOnce({ id: 1, jobId: '1' });
        }

        renderApp();

        let filterBy, sortBy;
        await waitFor(() => {
            filterBy = screen.getByLabelText(/Filter By:/i);
            sortBy = screen.getByLabelText(/Sort By:/i);
        });

        expect(filterBy).toBeInTheDocument();
        expect(sortBy).toBeInTheDocument();
    });

    test("should handle skill filter", async () => {

        useSelector.mockReturnValue({ loggedInUser: { id: 1, role: 'freelancer' } });
        vi.mocked(db.jobposts.toArray).mockReturnValueOnce(JobListMock);
        vi.mocked(db.jobposts.toArray).mockReturnValueOnce(JobListMock);
        for (let i = 0; i < 10; i++) {
            vi.mocked(useLiveQuery).mockReturnValueOnce({ id: 1, jobId: '1' });
        }

        renderApp();

        let filterBy, sortBy;
        await waitFor(() => {
            filterBy = screen.getByLabelText(/Filter By:/i);
            sortBy = screen.getByLabelText(/Sort By:/i);
        });

        await waitFor(() => {
            fireEvent.change(filterBy, { target: { value: 'javascript', name: 'skill' } });
        });

        expect(filterBy).toBeInTheDocument();
        expect(sortBy).toBeInTheDocument();
    });

    test("should handle sort both asc order", async () => {

        useSelector.mockReturnValue({ loggedInUser: { id: 1, role: 'freelancer' } });
        vi.mocked(db.jobposts.toArray).mockReturnValueOnce(JobListMock);
        vi.mocked(db.jobposts.toArray).mockReturnValueOnce(JobListMock);
        for (let i = 0; i < 10; i++) {
            vi.mocked(useLiveQuery).mockReturnValueOnce({ id: 1, jobId: '1' });
        }

        renderApp();

        let filterBy, sortBy;
        await waitFor(() => {
            filterBy = screen.getByLabelText(/Filter By:/i);
            sortBy = screen.getByLabelText(/Sort By:/i);
        });

        await waitFor(() => {
            fireEvent.change(sortBy, { target: { value: 'asc', name: 'sort' } });
        });

        expect(filterBy).toBeInTheDocument();
        expect(sortBy).toBeInTheDocument();
    });

    test("should handle sort both dsc order", async () => {

        useSelector.mockReturnValue({ loggedInUser: { id: 1, role: 'freelancer' } });
        vi.mocked(db.jobposts.toArray).mockReturnValueOnce(JobListMock);
        vi.mocked(db.jobposts.toArray).mockReturnValueOnce(JobListMock);
        for (let i = 0; i < 10; i++) {
            vi.mocked(useLiveQuery).mockReturnValueOnce({ id: 1, jobId: '1' });
        }

        renderApp();

        let filterBy, sortBy;
        await waitFor(() => {
            filterBy = screen.getByLabelText(/Filter By:/i);
            sortBy = screen.getByLabelText(/Sort By:/i);
        });

        await waitFor(() => {
            fireEvent.change(sortBy, { target: { value: 'dsc', name: 'sort' } });
        });

        expect(filterBy).toBeInTheDocument();
        expect(sortBy).toBeInTheDocument();
    });

    test("should handle sort both dsc order", async () => {

        useSelector.mockReturnValue({ loggedInUser: { id: 1, role: 'freelancer' } });
        vi.mocked(db.jobposts.toArray).mockReturnValueOnce(JobListMock);
        vi.mocked(db.jobposts.toArray).mockReturnValueOnce(JobListMock);
        for (let i = 0; i < 10; i++) {
            vi.mocked(useLiveQuery).mockReturnValueOnce({ id: 1, jobId: '1' });
        }

        renderApp();

        let filterBy, sortBy, paginationElement;
        await waitFor(() => {
            filterBy = screen.getByLabelText(/Filter By:/i);
            sortBy = screen.getByLabelText(/Sort By:/i);
            paginationElement = screen.getByTestId(/2/i);
        });

        await waitFor(() => {
            fireEvent.click(paginationElement, 2);
        });


        expect(filterBy).toBeInTheDocument();
        expect(sortBy).toBeInTheDocument();
    });

    test("should apply for a job successfully", async () => {
        useSelector.mockReturnValue({ loggedInUser: { id: 1, role: 'freelancer' } });
        vi.mocked(db.jobposts.toArray).mockReturnValueOnce(JobListMock);
        vi.mocked(db.jobposts.toArray).mockReturnValueOnce(JobListMock);
        vi.mocked(db.appliedjob.add).mockReturnValue(1);
        for (let i = 0; i < 10; i++) {
            vi.mocked(useLiveQuery).mockReturnValueOnce(null);
        }

        renderApp();

        let filterBy, sortBy, paginationElement, applyButton;
        await waitFor(() => {
            filterBy = screen.getByLabelText(/Filter By:/i);
            sortBy = screen.getByLabelText(/Sort By:/i);
            paginationElement = screen.getByTestId(/1/i);
        });

        await waitFor(() => {
            fireEvent.click(paginationElement, 1);
        });

        applyButton = screen.getAllByText(/Apply/i);

        await waitFor(() => {
            fireEvent.click(applyButton[0], 1);
        });

        expect(filterBy).toBeInTheDocument();
        expect(sortBy).toBeInTheDocument();
        expect(toast.success.mock.calls[0][0]).toBe('Job Applied Successfully');
    });

    test("should fail while apply for a job and show error toast", async () => {
        useSelector.mockReturnValue({ loggedInUser: { id: 1, role: 'freelancer' } });
        vi.mocked(db.jobposts.toArray).mockReturnValueOnce(JobListMock);
        vi.mocked(db.jobposts.toArray).mockReturnValueOnce(JobListMock);
        vi.mocked(db.appliedjob.add).mockRejectedValueOnce(1);
        for (let i = 0; i < 10; i++) {
            vi.mocked(useLiveQuery).mockReturnValueOnce(null);
        }

        renderApp();

        let filterBy, sortBy, paginationElement, applyButton;
        await waitFor(() => {
            filterBy = screen.getByLabelText(/Filter By:/i);
            sortBy = screen.getByLabelText(/Sort By:/i);
            paginationElement = screen.getByTestId(/1/i);
        });

        await waitFor(() => {
            fireEvent.click(paginationElement, 1);
        });

        applyButton = screen.getAllByText(/Apply/i);

        await waitFor(() => {
            fireEvent.click(applyButton[0], 1);
        });

        expect(filterBy).toBeInTheDocument();
        expect(sortBy).toBeInTheDocument();
        expect(toast.error.mock.calls[0][0]).toBe('Failed to apply job');
    })
})
