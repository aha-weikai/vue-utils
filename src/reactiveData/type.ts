import { Reactive, Ref } from "vue";

// 定义更精确的返回类型，结合 useResettableRef 和 useResettableReactive 的返回类型
type RefReturnType<T> = [Ref<T>, (data?: T) => void];

type ReactiveReturnType<T extends object> = [Reactive<T>, (data?: T) => void];

export type UseResettableDataReturnType<T> =
  T extends Ref<infer R>
    ? RefReturnType<R>
    : T extends Reactive<infer S extends object>
      ? ReactiveReturnType<S>
      : never;

export type ExtractRefValueType<T> = T extends Ref<infer R, any> ? R : any;

export type ExtractReactiveDataType<T> =
  T extends Reactive<infer R> ? (R extends Object ? R : never) : never;
