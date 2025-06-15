import { Debt } from "./Debt";

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
    key: keyof Pick<Debt, 'Name' | 'NIP' | 'Value' | 'Date'>;
    direction: SortDirection;
}
