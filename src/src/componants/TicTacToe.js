
import React, {useState} from 'react'

const calculateWinner = (matrix) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (matrix[a] && matrix[a] === matrix[b] && matrix[a] === matrix[c]) {
      return matrix[a]
    }
  }
  return null
}

const TicTacToe = () => {
  const [matrix, setMatrix] = useState(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)
  const winner = calculateWinner(matrix);
  const isDraw = !winner && matrix.every((cell) => cell !== null)


  const handleClick = (e) => {
    const index = e.target.id;
    if (winner || isDraw || matrix[index]) return; // matrix[index] prevents overwriting

    const copyMatrix = [...matrix]
    copyMatrix[index] = isXTurn ? 'X' : 'O'
    setMatrix(copyMatrix)
    setIsXTurn(!isXTurn)
  }

  const resetGame = () => {
    setMatrix(Array(9).fill(null))
    setIsXTurn(true)
  }


  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)', gridTemplateRows: 'repeat(3, 50px)', gap: '3px' }}
        onClick={handleClick}
      >
        {matrix.map((item, index) => (
          <div
            key={index}
            id={index}
            style={{
              width: '50px',
              height: '50px',
              border: '1px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <br />
      <div>
        <button onClick={resetGame}>Reset Game</button>
        <p>Next Player: {isXTurn ? 'X' : "O"}</p>
        {winner && <p>Winner Is: {winner}</p>}
        {isDraw && !winner && <p>Game Draw plz reset!</p>}
      </div>
    </div>
  )
}

export default TicTacToe
