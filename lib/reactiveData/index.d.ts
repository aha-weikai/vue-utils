import { Reactive, Ref } from 'vue';
import { UseResettableDataReturnType } from './type';
/**
 * ## 根据传入的数据，返回替身和重置函数
 * @param data 传入的数据
 * @param cloneFn 克隆函数
 * @returns
 */
export declare const useResettableData: <T>(data: T, cloneFn?: <T_1>(data: T_1) => T_1) => UseResettableDataReturnType<T>;
export declare function useResettableRef<T>(value: T, cloneFn?: <T_1>(data: T_1) => T_1): [Ref<T>, (data?: T) => void];
export declare function useResettableReactive<T extends object>(value: T, cloneFn?: <T_1>(data: T_1) => T_1): [Reactive<T>, (data?: T) => void];
