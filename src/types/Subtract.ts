import { AddTwoInts } from 'src/types/Add';
import { CompareTwoIntsPosition } from 'src/types/CompareTwoIntsPosition';
import { ToggleSign } from 'src/types/ToggleSign';
import { ReadonlyArrayExactLength } from 'ts-array-length';

export type SubtractSmallFromBigZeroOrNaturalNumbers<
  N1 extends number,
  N2 extends number,
> = ReadonlyArrayExactLength<unknown, N1> extends readonly [
  ...ReadonlyArrayExactLength<unknown, N2>,
  ...infer V,
]
  ? V['length']
  : number;

// type G = SubtractSmallFromBigZeroOrNaturalNumbers<4, 2>;
// 2;

// type H = SubtractSmallFromBigZeroOrNaturalNumbers<9 | 6, 4 | 2>;
// 2 | 4 | 5 | 7

// type I = SubtractSmallFromBigZeroOrNaturalNumbers<2, 4>;
// number;

export type SubtractZeroOrNaturalNumbers<
  N1 extends number,
  N2 extends number,
> = N1 extends any
  ? N2 extends any
    ? CompareTwoIntsPosition<N1, N2> extends 'left' | 'same'
      ? SubtractSmallFromBigZeroOrNaturalNumbers<N1, N2>
      : CompareTwoIntsPosition<N1, N2> extends 'right'
      ? ToggleSign<SubtractSmallFromBigZeroOrNaturalNumbers<N2, N1>>
      : number
    : never
  : never;

// type Q = SubtractZeroOrNaturalNumbers<2, 4>;
// -2;

// type R = SubtractZeroOrNaturalNumbers<2 | 6, 4 | 9>;
// 2 | -2 | -7 | -3

export type SubtractInts<N1 extends number, N2 extends number> = N1 extends any
  ? N2 extends any
    ? AddTwoInts<N1, ToggleSign<N2>>
    : never
  : never;

// type W = SubtractInts<2, 4>;
// -2;

// type X = SubtractInts<-2, 4>;
// -6;

// type Y = SubtractInts<2 | -6, 4 | -9>;
