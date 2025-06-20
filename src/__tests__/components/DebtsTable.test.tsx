import React from 'react';
import { render, screen } from '@testing-library/react';
import DebtsTable from '../../components/DebtsTable/DebtsTable';
import * as responsive from 'react-responsive';
import { Debt } from '../../types/Debt';

jest.mock('../../components/DebtsTable/DebtsTableDesktop', () => () => <div>Desktop View</div>);
jest.mock('../../components/DebtsTable/DebtsTableMobile', () => () => <div>Mobile View</div>);

const mockDebts: Debt[] = [
    { Id: '1', Name: 'Anna', NIP: '1234567890', Value: 1000, Date: '2024-01-01', DocumentType: '', Address: '', Number: '', Price: 0 }
];

describe('DebtsTable', () => {
    it('shows loader when loading is true', () => {
        render(<DebtsTable debts={[]} loading={true} error={null} />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('shows error when error is present', () => {
        render(<DebtsTable debts={[]} loading={false} error="Something went wrong" />);

        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    it('shows empty warning when data is empty and loading is false', () => {
        render(<DebtsTable debts={[]} loading={false} error={null} />);

        expect(screen.getByText(/Brak danych/i)).toBeInTheDocument();
    });

    it('renders mobile version', () => {
        jest.spyOn(responsive, 'useMediaQuery').mockReturnValue(true);
        render(<DebtsTable debts={mockDebts} loading={false} error={null} />);

        expect(screen.getByText(/mobile view/i)).toBeInTheDocument();
    });

    it('renders desktop version', () => {
        jest.spyOn(responsive, 'useMediaQuery').mockReturnValue(false);
        render(<DebtsTable debts={mockDebts} loading={false} error={null} />);

        expect(screen.getByText(/desktop view/i)).toBeInTheDocument();
    });
});
