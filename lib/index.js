import { isRef, isReactive, ref, reactive } from "vue";
const defaultDeepClone = (data) => {
  return JSON.parse(JSON.stringify(data));
};
const useResettableData = (data, cloneFn = defaultDeepClone) => {
  if (isRef(data)) {
    const [refValue, resetFn] = useResettableRef(
      cloneFn(data.value),
      cloneFn
    );
    return [refValue, resetFn];
  }
  if (isReactive(data)) {
    const [reactiveData, resetFn] = useResettableReactive(
      cloneFn(data),
      cloneFn
    );
    return [reactiveData, resetFn];
  }
  throw new Error("useResettableData only support ref or reactive");
};
function useResettableRef(value, cloneFn = defaultDeepClone) {
  const initialValue = cloneFn(value);
  const refValue = ref(cloneFn(initialValue));
  return [refValue, resetData];
  function resetData(data = initialValue) {
    refValue.value = cloneFn(data);
  }
}
function useResettableReactive(value, cloneFn = defaultDeepClone) {
  const initialValue = cloneFn(value);
  const reactiveValue = reactive(cloneFn(initialValue));
  return [reactiveValue, resetData];
  function resetData(data = initialValue) {
    Object.keys(reactiveValue).forEach((key) => Reflect.deleteProperty(reactiveValue, key));
    Object.assign(reactiveValue, cloneFn(data));
  }
}
export {
  useResettableData,
  useResettableReactive,
  useResettableRef
};
