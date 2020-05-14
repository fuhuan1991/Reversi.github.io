import config from './config';
import { getRival } from './util';
import Search from './search';

type coor = Array<number>;
type gameState = Array<Array<string | null>>;

let SIZE = config.size;
if (SIZE < 8) {
  console.log('min size is 8*8');
  SIZE = 8;
} else if (SIZE > 16) {
  console.log('max size is 16*16');
  SIZE = 16;
}
if (SIZE % 2 !== 0) {
  console.log('size must be an even number');
  SIZE = 8;
}

export const pickLocation = (opponent: string, currentState: gameState) => {
  const possibleMoves: Array<{value: number, pos: coor}> = [];
  let maxValue: number = 0;
  let finalMove: coor = [0, 0];

  for (let i = SIZE - 1; i >= 0; i--) {
    for (let j = SIZE - 1; j >= 0; j--) {
      let result = Search.SearchForReversiblePieces(i, j, opponent, currentState);
      if (result.length > 0 && !currentState[i][j]) {
        let value = result.length;

        if (atCorner(i, j)) {
          value = Infinity;
        } else if (atEdge(i, j)){
          value = value * 2;
        }

        if (value > maxValue) {
          finalMove = [i, j];
          maxValue = value;
        }

        possibleMoves.push({
          pos: [i, j],
          value: value,
        });
      }
    };
  };
  // console.log(possibleMoves);
  return finalMove;
}

const atCorner = (x: number, y: number) => {
  if (x === 0 && y === 0) return true;
  if (x === 0 && y === SIZE-1) return true;
  if (x === SIZE-1 && y === 0) return true;
  if (x === SIZE-1 && y === SIZE-1) return true;
  return false;
}

const atEdge = (x: number, y: number) => {
  if (x === 0) return true;
  if (x === SIZE-1) return true;
  if (y === 0) return true;
  if (y === SIZE-1) return true;
  return false;
}