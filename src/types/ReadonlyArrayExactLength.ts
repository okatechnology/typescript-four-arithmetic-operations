export type IsCertainlyInteger<N extends number> =
  IsCertainlyIntegerImpl<`${N}`>;

type IsCertainlyIntegerImpl<Str extends string> = Str extends `${any}.${any}`
  ? false
  : Str extends `-${any}`
  ? false
  : Str extends "Infinity" | "-Infinity" | "NaN"
  ? false
  : true;

type ReadonlyArrayExactLengthRec<
  T,
  L extends number,
  Result extends readonly T[]
> = Result["length"] extends L
  ? Result
  : ReadonlyArrayExactLengthRec<T, L, readonly [T, ...Result]>;

export type ReadonlyArrayExactLength<T, N extends number> = number extends N
  ? readonly T[]
  : N extends number
  ? IsCertainlyInteger<N> extends true
    ? ReadonlyArrayExactLengthRec<T, N, readonly []>
    : readonly T[]
  : never;
