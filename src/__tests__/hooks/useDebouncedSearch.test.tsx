import { renderHook, act } from '@testing-library/react';
import useDebouncedSearch from '../../hooks/useDebouncedSearch';

jest.useFakeTimers();

const mockSearch = jest.fn();

describe('useDebouncedSearch', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should NOT call onSearch if value length is 1 or 2', () => {
        const { result } = renderHook(() => useDebouncedSearch(mockSearch));

        act(() => {
            result.current.setQuery('ab');
        });

        act(() => {
            jest.advanceTimersByTime(400);
        });

        expect(mockSearch).not.toHaveBeenCalled();
    });

    it('should call onSearch with debounced value if length >= 3', () => {
        const { result } = renderHook(() => useDebouncedSearch(mockSearch));

        act(() => {
            result.current.setQuery('abcd');
        });

        expect(mockSearch).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(400);
        });

        expect(mockSearch).toHaveBeenCalledWith('abcd');
    });

    it('should call onSearch with empty string if cleared', () => {
        const { result } = renderHook(() => useDebouncedSearch(mockSearch));

        act(() => {
            result.current.setQuery('   ');
        });

        act(() => {
            jest.advanceTimersByTime(400);
        });

        expect(mockSearch).toHaveBeenCalledWith('');
    });
});
