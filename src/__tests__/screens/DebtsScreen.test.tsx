import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DebtsScreen from '../../screens/DebtsScreen';
import * as useDebtsHook from '../../hooks/useDebts';
import '@testing-library/jest-dom';
import * as responsive from "react-responsive";

const mockDebts = [
    { Id: '1', Name: 'Anna Nowak', NIP: '123', Value: 3000, Date: '2023-05-10', DocumentType: '', Address: '', Number: '', Price: 0 },
    { Id: '2', Name: 'Zbigniew Zając', NIP: '456', Value: 9000, Date: '2022-03-10', DocumentType: '', Address: '', Number: '', Price: 0 },
    { Id: '3', Name: 'Bartosz Nowak', NIP: '789', Value: 1000, Date: '2021-12-12', DocumentType: '', Address: '', Number: '', Price: 0 },
];

describe('DebtsScreen', () => {
    it('sorts debts by Name when column header is clicked', () => {
        jest.spyOn(useDebtsHook, 'default').mockReturnValue({
            debts: mockDebts,
            loading: false,
            error: null,
            loadTopDebts: jest.fn(),
            searchDebts: jest.fn(),
        });
        jest.spyOn(responsive, 'useMediaQuery').mockReturnValue(false); // desktop
        render(<DebtsScreen />);

        const nameHeader = screen.getByText(/KWOTA ZADŁUŻENIA/i);

        fireEvent.click(nameHeader);

        const rowsBefore = screen.getAllByRole('row');
        expect(rowsBefore[1]).toHaveTextContent('1000,00 zł');
        expect(rowsBefore[2]).toHaveTextContent('3000,00 zł');
        expect(rowsBefore[3]).toHaveTextContent('9000,00 zł');

        fireEvent.click(nameHeader);

        const rowsAfter = screen.getAllByRole('row');
        expect(rowsAfter[1]).toHaveTextContent('9000,00 zł');
        expect(rowsAfter[2]).toHaveTextContent('3000,00 zł');
        expect(rowsAfter[3]).toHaveTextContent('1000,00 zł');
    });
});
