import { isReactive, isRef, reactive, ref, type Reactive, type Ref } from "vue";
import { ExtractReactiveDataType, ExtractRefValueType, UseResettableDataReturnType } from "./type";

const defaultDeepClone = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};

/**
 * ## 根据传入的数据，返回替身和重置函数
 * @param data 传入的数据
 * @param cloneFn 克隆函数
 * @returns
 */
export const useResettableData = <T>(
  data: T,
  cloneFn = defaultDeepClone,
): UseResettableDataReturnType<T> => {
  if (isRef(data)) {
    const [refValue, resetFn] = useResettableRef(
      cloneFn(data.value) as ExtractRefValueType<T>,
      cloneFn,
    );
    return [refValue, resetFn] as UseResettableDataReturnType<T>;
  }

  if (isReactive(data)) {
    const [reactiveData, resetFn] = useResettableReactive(
      cloneFn(data) as ExtractReactiveDataType<T>,
      cloneFn,
    );
    return [reactiveData, resetFn] as UseResettableDataReturnType<T>;
  }

  throw new Error("useResettableData only support ref or reactive");
};

export function useResettableRef<T>(value: T, cloneFn = defaultDeepClone) {
  const initialValue: T = cloneFn(value);
  const refValue = ref<T>(cloneFn(initialValue));
  return [refValue, resetData] as [Ref<T>, (data?: T) => void];

  /**
   * ## 设置数据，默认为初始值
   */
  function resetData(data = initialValue) {
    refValue.value = cloneFn(data);
  }
}

export function useResettableReactive<T extends object>(value: T, cloneFn = defaultDeepClone) {
  const initialValue = cloneFn(value);
  const reactiveValue = reactive<T>(cloneFn(initialValue));
  return [reactiveValue, resetData] as [Reactive<T>, (data?: T) => void];

  /**
   * ## 设置数据，默认为初始值
   */
  function resetData(data = initialValue) {
    Object.keys(reactiveValue).forEach(key => Reflect.deleteProperty(reactiveValue, key));
    Object.assign(reactiveValue, cloneFn(data));
  }
}
