import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DebtsTableDesktop from '../../components/DebtsTable/DebtsTableDesktop';
import { Debt } from '../../types/Debt';
import { SortConfig } from '../../types/Sorting';

const debts: Debt[] = [
    { Id: '1', Name: 'Zbigniew Zając', NIP: '1111111111', Value: 15000, Date: '2024-05-12', DocumentType: '', Address: '', Number: '', Price: 0 },
];

describe('DebtsTableDesktop', () => {
    let sortConfig: SortConfig;
    let handleSort: jest.Mock;

    beforeEach(() => {
        sortConfig = { key: 'Name', direction: 'asc' };
        handleSort = jest.fn();
    });

    it('renders debts data in correct format', () => {
        render(<DebtsTableDesktop debts={debts} sortConfig={sortConfig} handleSort={handleSort} />);

        expect(screen.getByText('Zbigniew Zając')).toBeInTheDocument();
        expect(screen.getByText('1111111111')).toBeInTheDocument();
        expect(screen.getByText('15 000,00 zł')).toBeInTheDocument();
        expect(screen.getByText('12-05-2024')).toBeInTheDocument();
    });

    it('calls handleSort with correct key when header is clicked', () => {
        render(<DebtsTableDesktop debts={debts} sortConfig={sortConfig} handleSort={handleSort} />);

        fireEvent.click(screen.getByText(/DŁUŻNIK/i));
        expect(handleSort).toHaveBeenCalledWith('Name');

        fireEvent.click(screen.getByText(/NIP/i));
        expect(handleSort).toHaveBeenCalledWith('NIP');
    });

    it('displays descending sort indicator next to sorted column', () => {
        render(<DebtsTableDesktop debts={debts} sortConfig={{ key: 'Value', direction: 'desc' }} handleSort={handleSort} />);
        expect(screen.getByText(/KWOTA ZADŁUŻENIA/).textContent).toMatch(/▼/);
    });

    it('displays ascending sort indicator next to sorted column', () => {
        render(<DebtsTableDesktop debts={debts} sortConfig={{ key: 'Value', direction: 'asc' }} handleSort={handleSort} />);
        expect(screen.getByText(/KWOTA ZADŁUŻENIA/).textContent).toMatch(/▲/);
    });
});
