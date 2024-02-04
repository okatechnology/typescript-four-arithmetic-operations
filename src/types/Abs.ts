export type Abs<N extends number> = `${N}` extends `-${infer T extends number}` //[1]
  ? T
  : N;

/*
  [1]
  extends number を使うことで、T が number 型であることを TypeScript に理解させる。
  これを使わずに、`${N}` extends `-${infer T}` ? T : N と書くと、T は string 型として推論されてしまう。
*/

// type A = Abs<2>;
// 2;

// type B = Abs<-2>;
// 2;
