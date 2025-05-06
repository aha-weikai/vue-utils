import { Reactive, Ref } from 'vue';
type RefReturnType<T> = [Ref<T>, (data?: T) => void];
type ReactiveReturnType<T extends object> = [Reactive<T>, (data?: T) => void];
export type UseResettableDataReturnType<T> = T extends Ref<infer R> ? RefReturnType<R> : T extends Reactive<infer S extends object> ? ReactiveReturnType<S> : never;
export type ExtractRefValueType<T> = T extends Ref<infer R, any> ? R : any;
export type ExtractReactiveDataType<T> = T extends Reactive<infer R> ? (R extends Object ? R : never) : never;
export {};
