export function useModel(props, propName, emit) {
  return computed({
    get() {
      new Proxy(props[propName], {
        set(obj, name, val) {
          emit('update:' + propName, {
            ...obj,
            [name]: val,
          });
          return true;
        },
      });
    },
    set(val) {
      emit('update:' + propName, val);
    },
  });
}
