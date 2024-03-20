function useLocalStorage(key) {
  function setLSValue(value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  function getLSValue() {
    try {
      const value = window.localStorage.getItem(key);
      return value ? value : undefined;
    } catch (error) {
      console.log(error);
    }
  }

  return { setLSValue, getLSValue };
}

export default useLocalStorage;
