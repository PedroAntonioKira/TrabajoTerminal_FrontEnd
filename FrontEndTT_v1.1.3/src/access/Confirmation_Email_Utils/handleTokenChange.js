// Función para manejar el cambio en el input del token
const handleTokenChange = (e, setCustomToken01) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setCustomToken01(value);
    }
  };

  export default handleTokenChange;