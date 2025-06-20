import { useMediaQuery } from 'react-responsive';
import useSortedDebts from '../../hooks/useSortedDebts';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import Empty from '../Empty/Empty';
import DebtsTableMobile from './DebtsTableMobile';
import DebtsTableDesktop from './DebtsTableDesktop';
import { Debt } from '../../types/Debt';

interface DebtsTableProps {
    debts: Debt[];
    loading: boolean;
    error: string | null;
}

const DebtsTable: React.FC<DebtsTableProps> = ({ debts, loading, error }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { sortedDebts, sortConfig, handleSort } = useSortedDebts(debts);

    if (loading) return <Loader />;
    if (error) return <Error message={error} />;
    if (sortedDebts.length === 0) return <Empty />;

    const commonProps = { debts: sortedDebts, sortConfig, handleSort };

    return isMobile ? (
        <DebtsTableMobile {...commonProps} />
    ) : (
        <DebtsTableDesktop {...commonProps} />
    );
};

export default DebtsTable;
