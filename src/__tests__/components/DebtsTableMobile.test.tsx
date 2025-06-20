import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DebtsTableMobile from '../../components/DebtsTable/DebtsTableMobile';
import { Debt } from '../../types/Debt';
import { SortConfig } from "../../types/Sorting";

const debts: Debt[] = [
    { Id: '1', Name: 'Zbigniew Zając', NIP: '1111111111', Value: 15000, Date: '2024-05-12', DocumentType: '', Address: '', Number: '', Price: 0 },
];

describe('DebtsTableMobile', () => {
    let sortConfig: SortConfig;
    let handleSort: jest.Mock;

    beforeEach(() => {
        sortConfig = { key: 'Name', direction: 'asc' };
        handleSort = jest.fn();
    });

    it('renders debts data in correct format', () => {
        render(
            <DebtsTableMobile
                debts={debts}
                sortConfig={sortConfig}
                handleSort={handleSort}
            />
        );

        expect(screen.getByText('Zbigniew Zając')).toBeInTheDocument();
        expect(screen.getByText('1111111111')).toBeInTheDocument();
        expect(screen.getByText('15 000,00 zł')).toBeInTheDocument();
        expect(screen.getByText('12-05-2024')).toBeInTheDocument();

    });

    it('calls handleSort when changing select value', () => {
        render(
            <DebtsTableMobile
                debts={debts}
                sortConfig={sortConfig}
                handleSort={handleSort}
            />
        );

        const select = screen.getByLabelText(/Sortuj według/i);
        fireEvent.change(select, { target: { value: 'Value' } });

        expect(handleSort).toHaveBeenCalledWith('Value');
    });

    it('calls handleSort with current sortKey when clicking sort direction button', () => {
        render(
            <DebtsTableMobile
                debts={debts}
                sortConfig={sortConfig}
                handleSort={handleSort}
            />
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(handleSort).toHaveBeenCalledWith('Name');
    });
});
