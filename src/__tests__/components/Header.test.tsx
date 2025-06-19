import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Header } from '../../components/Header/Header';

describe('Header', () => {
    it('calls onSearch after debounce delay when typing', async () => {
        const onSearch = jest.fn();
        render(<Header onSearch={onSearch} />);

        const input = screen.getByPlaceholderText('PODAJ NIP LUB NAZWĘ DŁUŻNIKA');

        fireEvent.change(input, { target: { value: 'Jan' } });

        // Debounce: fast typing should NOT call immediately
        expect(onSearch).not.toHaveBeenCalled();

        await waitFor(() => {
            expect(onSearch).toHaveBeenCalledWith('Jan');
        });
    });

    it('calls onSearch immediately on button click', () => {
        const onSearch = jest.fn();
        render(<Header onSearch={onSearch} />);

        const input = screen.getByPlaceholderText('PODAJ NIP LUB NAZWĘ DŁUŻNIKA');
        const button = screen.getByRole('button', { name: 'Szukaj' });

        fireEvent.change(input, { target: { value: 'Kowalski' } });
        fireEvent.click(button);

        expect(onSearch).toHaveBeenCalledWith('Kowalski');
    });
});
