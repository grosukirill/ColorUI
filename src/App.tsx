import React, { useState } from 'react';
import { colorMap } from './api/Colors';
import { AdjacencyMatrix } from './types';

const App: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState<number>(5);
  const [adjacencyMatrix, setAdjacencyMatrix] = useState<number[][]>([]);
  const [result, setResult] = useState<number[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMatrixChange = (row: number, col: number, value: number) => {
    const updatedMatrix = [...adjacencyMatrix];
    updatedMatrix[row][col] = value;
    setAdjacencyMatrix(updatedMatrix);
  };

  const generateMatrix = () => {
    const newMatrix = Array.from({ length: matrixSize }, () =>
        Array(matrixSize).fill(0)
    );
    setAdjacencyMatrix(newMatrix);
    setResult(null);
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      const payload: AdjacencyMatrix = { size: matrixSize, matrix: adjacencyMatrix };
      const response = await colorMap(payload);
      setResult(response.regionColors);
    } catch (err) {
      setError('Failed to color the map. Ensure the backend is running.');
    }
  };

  return (
      <div className="App">
        <h1>Map Coloring Problem</h1>

        <div>
          <label>Number of Regions: </label>
          <input
              type="number"
              value={matrixSize}
              onChange={(e) => setMatrixSize(parseInt(e.target.value, 10))}
              min="2"
          />
          <button onClick={generateMatrix}>Generate Adjacency Matrix</button>
        </div>

        {adjacencyMatrix.length > 0 && (
            <div>
              <h2>Adjacency Matrix</h2>
              <table>
                <tbody>
                {adjacencyMatrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((value, colIndex) => (
                          <td key={colIndex}>
                            <input
                                type="number"
                                value={value}
                                min="0"
                                max="1"
                                onChange={(e) =>
                                    handleMatrixChange(rowIndex, colIndex, parseInt(e.target.value, 10))
                                }
                            />
                          </td>
                      ))}
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        )}

        <button onClick={handleSubmit}>Submit</button>

        {result && (
            <div>
              <h2>Result</h2>
              <ul>
                {result.map((color, index) => (
                    <li key={index}>
                      Region {index + 1}: Color {color}
                    </li>
                ))}
              </ul>
            </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  );
};

export default App;
