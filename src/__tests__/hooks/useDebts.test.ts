import { renderHook, act } from '@testing-library/react';
import useDebts from '../../hooks/useDebts';
import { getTopDebts, getFilteredDebts } from '../../api/debts';
import { Debt } from '../../types/Debt';

jest.mock('../../api/debts');

const mockedGetTopDebts = getTopDebts as jest.MockedFunction<typeof getTopDebts>;
const mockedGetFilteredDebts = getFilteredDebts as jest.MockedFunction<typeof getFilteredDebts>;

const mockData: Debt[] = [
    {
        Id: '1',
        Name: 'Jan Kowalski',
        NIP: '1234567890',
        Value: 1000,
        Date: '2024-01-01',
        DocumentType: '',
        Address: '',
        Number: '',
        Price: 0,
    },
];

describe('useDebts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('loads top debts successfully', async () => {
        mockedGetTopDebts.mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useDebts());

        await act(async () => {
            await result.current.loadTopDebts();
        });

        expect(mockedGetTopDebts).toHaveBeenCalled();
        expect(result.current.debts).toEqual(mockData);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it('handles error during loadTopDebts', async () => {
        mockedGetTopDebts.mockRejectedValueOnce(new Error('Network Error'));

        const { result } = renderHook(() => useDebts());

        await act(async () => {
            await result.current.loadTopDebts();
        });

        expect(result.current.error).toEqual('An error occurred while loading debts.');
        expect(result.current.debts).toEqual([]);
        expect(result.current.loading).toBe(false);
    });

    it('filters debts by query', async () => {
        mockedGetFilteredDebts.mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useDebts());

        await act(async () => {
            await result.current.searchDebts('kowalski');
        });

        expect(mockedGetFilteredDebts).toHaveBeenCalledWith('kowalski');
        expect(result.current.debts).toEqual(mockData);
        expect(result.current.error).toBe(null);
    });

    it('fallbacks to top debts when empty or shorter than 3 chars query is passed to searchDebts', async () => {
        mockedGetTopDebts.mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useDebts());

        await act(async () => {
            await result.current.searchDebts('');
            await result.current.searchDebts('k');
            await result.current.searchDebts('ko');
            await result.current.searchDebts('kow');
        });

        expect(mockedGetTopDebts).toHaveBeenCalledTimes(3);
    });

    it('handles error during filtered search', async () => {
        mockedGetFilteredDebts.mockRejectedValueOnce(new Error('Network Error'));

        const { result } = renderHook(() => useDebts());

        await act(async () => {
            await result.current.searchDebts('test');
        });

        expect(result.current.error).toEqual('An error occurred while filtering debts.');
        expect(result.current.loading).toBe(false);
    });
});
