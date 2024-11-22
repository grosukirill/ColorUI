import axios from 'axios';
import {AdjacencyMatrix, ColoringResult} from '../types';

const BASE_URL = 'http://localhost:8080';

export const colorMap = async (adjacencyMatrix: AdjacencyMatrix): Promise<ColoringResult> => {
    const response = await axios.post<ColoringResult>(`${BASE_URL}/color`, adjacencyMatrix, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'

        }
    });
    return response.data;
};
