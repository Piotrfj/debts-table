import React from 'react';
import { render, screen } from '@testing-library/react';
import { DebtsTable } from '../DebtsTable';
import { useDebts } from '../../../hooks/useDebts';
import { Debt } from '../../../types/Debt';

jest.mock('../../../hooks/useDebts');

const mockedUseDebts = useDebts as jest.MockedFunction<typeof useDebts>;

const mockDebts: Debt[] = [
    {
        Id: '1',
        Name: 'Test Dłużnik',
        NIP: '1234567890',
        Value: 2000,
        Date: '2024-01-01',
        DocumentType: '',
        Address: '',
        Number: '',
        Price: 0,
    },
];

describe('DebtsTable (with mocked useDebts)', () => {
    it('renders data from hook', () => {
        mockedUseDebts.mockReturnValue({
            debts: mockDebts,
            loading: false,
            error: null,
        });

        render(<DebtsTable />);

        expect(screen.getByText('Test Dłużnik')).toBeInTheDocument();
        expect(screen.getByText('1234567890')).toBeInTheDocument();
        expect(screen.getByText('2000,00 zł')).toBeInTheDocument();
        expect(screen.getByText('01-01-2024')).toBeInTheDocument();
    });

    it('renders loader if loading is true', () => {
        mockedUseDebts.mockReturnValue({
            debts: [],
            loading: true,
            error: null,
        });

        render(<DebtsTable />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders error if error is present', () => {
        mockedUseDebts.mockReturnValue({
            debts: [],
            loading: false,
            error: 'Something went wrong',
        });

        render(<DebtsTable />);
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
});
