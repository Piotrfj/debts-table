import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Header from '../../components/Header/Header';

jest.useFakeTimers();
const mockSearch = jest.fn();

describe('Header component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('renders input and button', () => {
        render(<Header onSearch={mockSearch} />);

        expect(screen.getByLabelText('PODAJ NIP LUB NAZWĘ DŁUŻNIKA')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'SZUKAJ' })).toBeInTheDocument();
    });

    it('calls onSearch after debounce with trimmed query (length >= 3)', () => {
        render(<Header onSearch={mockSearch} />);

        const input = screen.getByLabelText('PODAJ NIP LUB NAZWĘ DŁUŻNIKA');
        fireEvent.change(input, { target: { value: '   test   ' } });

        expect(mockSearch).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(400);
        });

        expect(mockSearch).toHaveBeenCalledWith('test');
    });

    it('calls onSearch with trimmed value immediately on button click', () => {
        render(<Header onSearch={mockSearch} />);

        const input = screen.getByLabelText('PODAJ NIP LUB NAZWĘ DŁUŻNIKA');
        const button = screen.getByRole('button', { name: 'SZUKAJ' });

        fireEvent.change(input, { target: { value: '   manual  ' } });
        fireEvent.click(button);

        expect(mockSearch).toHaveBeenCalledWith('manual');
    });
});
