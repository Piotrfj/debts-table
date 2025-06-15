import { sortDebts } from '../sortDebts';
import { SortConfig } from '../../types/Sorting';
import { Debt } from '../../types/Debt';

const mockDebts: Debt[] = [
    { Id: '1', Name: 'CCC', NIP: '555', Value: 300, Date: '2024-01-01', DocumentType: '', Address: '', Number: '', Price: 0 },
    { Id: '2', Name: 'AAA', NIP: '111', Value: 100, Date: '2024-03-01', DocumentType: '', Address: '', Number: '', Price: 0 },
    { Id: '3', Name: 'BBB', NIP: '222', Value: 200, Date: '2024-02-01', DocumentType: '', Address: '', Number: '', Price: 0 },
];

describe('sortDebts', () => {
    it('sorts by Name ascending', () => {
        const config: SortConfig = { key: 'Name', direction: 'asc' };
        const result = sortDebts(mockDebts, config);
        expect(result.map((d) => d.Name)).toEqual(['AAA', 'BBB', 'CCC']);
    });

    it('sorts by Name descending', () => {
        const config: SortConfig = { key: 'Name', direction: 'desc' };
        const result = sortDebts(mockDebts, config);
        expect(result.map((d) => d.Name)).toEqual(['CCC', 'BBB', 'AAA']);
    });

    it('sorts by Value ascending', () => {
        const config: SortConfig = { key: 'Value', direction: 'asc' };
        const result = sortDebts(mockDebts, config);
        expect(result.map((d) => d.Value)).toEqual([100, 200, 300]);
    });

    it('sorts by Date descending', () => {
        const config: SortConfig = { key: 'Date', direction: 'desc' };
        const result = sortDebts(mockDebts, config);
        expect(result.map((d) => d.Date)).toEqual(['2024-03-01', '2024-02-01', '2024-01-01']);
    });
});
