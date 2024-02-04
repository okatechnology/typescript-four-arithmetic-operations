import { Abs } from 'src/types/Abs';
import { SignOf } from 'src/types/SignOf';
import { SubtractZeroOrNaturalNumbers } from 'src/types/Subtract';
import { ToggleSign } from 'src/types/ToggleSign';
import { ReadonlyArrayExactLength } from 'ts-array-length';

type AddTwoZeroOrNaturalNumbers<N1 extends number, N2 extends number> = [
  ...ReadonlyArrayExactLength<unknown, N1>,
  ...ReadonlyArrayExactLength<unknown, N2>,
]['length'];

// type A = AddTwoZeroOrNaturalNumbers<2, 4>;
// 13;

// type B = AddTwoZeroOrNaturalNumbers<2 | 6, 4 | 9>;
// 6 | 11 | 10 | 15;

// type C = AddTwoZeroOrNaturalNumbers<0, 2>;
// 2;

// type D = AddTwoZeroOrNaturalNumbers<0, 0>;
// 0;

// type E = AddTwoZeroOrNaturalNumbers<-2, -4>;
// type F = AddTwoZeroOrNaturalNumbers<2, -4>;
// number;

export type AddTwoInts<N1 extends number, N2 extends number> = N1 extends any
  ? N2 extends any
    ? [SignOf<N1>, SignOf<N2>] extends ['+', '-']
      ? SubtractZeroOrNaturalNumbers<N1, Abs<N2>>
      : [SignOf<N1>, SignOf<N2>] extends ['-', '+']
      ? SubtractZeroOrNaturalNumbers<N2, Abs<N1>>
      : [SignOf<N1>, SignOf<N2>] extends ['-', '-']
      ? AddTwoZeroOrNaturalNumbers<
          Abs<N1>,
          Abs<N2>
        > extends infer T extends number
        ? ToggleSign<T>
        : never
      : AddTwoZeroOrNaturalNumbers<N1, N2>
    : never
  : never;

/* 
  `-${AddTwoZeroOrNaturalNumbers<Abs<N1>, Abs<N2>>}` extends `${infer U extends number}` ? U : never
  と書きたいが、AddTwoZeroOrNaturalNumbers<Abs<N1>, Abs<N2>>が Template Literal Types で使うことのできる 
  string | number | bigint | boolean | null | undefined 型であるということを
  TypeScript が理解できないため分けて書く必要がある。  
*/

// type S = AddTwoInts<-2, -4>;
// -6;

// type T = AddTwoInts<-2, 4>;
// 2;

// type U = AddTwoInts<2, -4>;
// -2;

// type V = AddTwoInts<-2 | 6, -4 | -9>;
// 2 | -6 | -11 | -3
