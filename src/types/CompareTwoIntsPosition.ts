import { Abs } from 'src/types/Abs';
import { SignOf } from 'src/types/SignOf';
import { SubtractSmallFromBigZeroOrNaturalNumbers } from 'src/types/Subtract';

type CompareTwoZeroOrNaturalNumbersPosition<
  L extends number,
  R extends number,
> = L extends any
  ? R extends any
    ? number extends L
      ? 'incomparable'
      : number extends R
      ? 'incomparable'
      : number extends SubtractSmallFromBigZeroOrNaturalNumbers<L, R>
      ? 'right'
      : number extends SubtractSmallFromBigZeroOrNaturalNumbers<R, L>
      ? 'left'
      : 'same'
    : never
  : never;

// type J = CompareTwoZeroOrNaturalNumbersPosition<2, 4>;
// 'right';

// type K = CompareTwoZeroOrNaturalNumbersPosition<2, 2>;
// 'same';

// type L = CompareTwoZeroOrNaturalNumbersPosition<2 | 4 | 6, 4>;
// 'right' | 'same' | 'left';

// type M = CompareTwoZeroOrNaturalNumbersPosition<2, number>;
// 'incomparable';

export type CompareTwoIntsPosition<
  L extends number,
  R extends number,
> = L extends any
  ? R extends any
    ? number extends L
      ? 'incomparable'
      : number extends R
      ? 'incomparable'
      : [SignOf<L>, SignOf<R>] extends ['+', '-']
      ? 'left'
      : [SignOf<L>, SignOf<R>] extends ['-', '+']
      ? 'right'
      : [SignOf<L>, SignOf<R>] extends ['-', '-']
      ? CompareTwoZeroOrNaturalNumbersPosition<Abs<R>, Abs<L>>
      : CompareTwoZeroOrNaturalNumbersPosition<L, R>
    : never
  : never;

// type N = CompareTwoIntsPosition<-2, -4>;
// 'left';

// type O = CompareTwoIntsPosition<-2, 2>;
// 'right';

// type P = CompareTwoIntsPosition<-2, -2>;
// 'same';
