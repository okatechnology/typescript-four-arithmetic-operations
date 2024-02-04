import { Abs } from 'src/types/Abs';

// 0は正の数とする
export type SignOf<N extends number> = N extends any
  ? N extends 0
    ? '+'
    : `${N}` extends `-${Abs<N>}`
    ? '-'
    : '+'
  : never;
