import axios from 'axios';
import { Debt } from '../types/Debt';

const BASE_URL = 'https://rekrutacja-webhosting-it.krd.pl/api/Recruitment';

export const getTopDebts = async (): Promise<Debt[]> => {
    const response = await axios.get(`${BASE_URL}/GetTopDebts`);
    return response.data;
};
