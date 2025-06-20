import { renderHook, act } from '@testing-library/react';
import useSortedDebts from '../../hooks/useSortedDebts';
import { Debt } from '../../types/Debt';

const mockDebts: Debt[] = [
    { Id: '1', Name: 'Zenon', NIP: '111', Value: 100, Date: '2023-01-01', DocumentType: '', Address: '', Number: '', Price: 0 },
    { Id: '2', Name: 'Adam', NIP: '222', Value: 200, Date: '2022-01-01', DocumentType: '', Address: '', Number: '', Price: 0 },
    { Id: '3', Name: 'Marek', NIP: '333', Value: 150, Date: '2022-01-01', DocumentType: '', Address: '', Number: '', Price: 0 },
];

describe('useSortedDebts', () => {
    it('should sort by Name ascending by default', () => {
        const { result } = renderHook(() => useSortedDebts(mockDebts));

        expect(result.current.sortedDebts[0].Name).toBe('Adam');
        expect(result.current.sortedDebts[1].Name).toBe('Marek');
        expect(result.current.sortedDebts[2].Name).toBe('Zenon');
    });

    it('should toggle sorting direction on same key', () => {
        const { result } = renderHook(() => useSortedDebts(mockDebts));

        act(() => {
            result.current.handleSort('Name');
        });

        expect(result.current.sortConfig.direction).toBe('desc');
        expect(result.current.sortedDebts[0].Name).toBe('Zenon');
        expect(result.current.sortedDebts[1].Name).toBe('Marek');
        expect(result.current.sortedDebts[2].Name).toBe('Adam');
    });

    it('should sort by Value when key is changed', () => {
        const { result } = renderHook(() => useSortedDebts(mockDebts));

        act(() => {
            result.current.handleSort('Value');
        });

        expect(result.current.sortConfig.key).toBe('Value');
        expect(result.current.sortedDebts[0].Value).toBe(100);
        expect(result.current.sortedDebts[1].Value).toBe(150);
        expect(result.current.sortedDebts[2].Value).toBe(200);
    });
});
