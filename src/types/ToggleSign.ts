import { Abs } from 'src/types/Abs';

export type ToggleSign<N extends number> = N extends any
  ? N extends 0
    ? 0
    : `${N}` extends `-${Abs<N>}`
    ? Abs<N>
    : `-${N}` extends `${infer U extends number}`
    ? U
    : number
  : never;
