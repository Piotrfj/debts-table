import { formatDate } from '../formatDate';

describe('formatDate', () => {
    it('formats ISO string correctly with leading zeros', () => {
        expect(formatDate('2024-01-09')).toBe('09-01-2024');
        expect(formatDate('2024-12-05')).toBe('05-12-2024');
    });

    it('formats full ISO date-time string correctly', () => {
        expect(formatDate('2023-03-01T00:00:00')).toBe('01-03-2023');
    });

    it('handles single-digit day and month', () => {
        expect(formatDate('2022-2-3')).toBe('03-02-2022');
    });
});
