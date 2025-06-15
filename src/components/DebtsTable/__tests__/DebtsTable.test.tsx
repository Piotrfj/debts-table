import React from 'react';
import { render, screen } from '@testing-library/react';
import { DebtsTable } from '../DebtsTable';
import { Debt } from '../../../types/Debt';

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

describe('DebtsTable (with props)', () => {
    it('renders debt data correctly', () => {
        render(<DebtsTable debts={mockDebts} loading={false} error={null} />);

        expect(screen.getByText('Test Dłużnik')).toBeInTheDocument();
        expect(screen.getByText('1234567890')).toBeInTheDocument();
        expect(screen.getByText('2000,00 zł')).toBeInTheDocument();
        expect(screen.getByText('01-01-2024')).toBeInTheDocument();
    });

    it('renders loader when loading is true', () => {
        render(<DebtsTable debts={[]} loading={true} error={null} />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders error when error is present', () => {
        render(<DebtsTable debts={[]} loading={false} error="Something went wrong" />);
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
});
