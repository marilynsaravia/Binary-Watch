function updateWatch() {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  
  // Determino si es AM/PM y ajusto al formato 12h
  const isPM = h >= 12;
  const h12 = h % 12 || 12;

  // Actualizo texto digital
  const timeString = `${h12}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  document.getElementById('currentTime').textContent = timeString;

  // Actualizo indicador PM
  const pmIndicator = document.getElementById('pmIndicator');
  isPM ? pmIndicator.classList.add('on') : pmIndicator.classList.remove('on');

  // Función para encender LEDs según los bits
  const setLeds = (selector, value) => {
    const leds = document.querySelectorAll(selector);
    leds.forEach(led => {
      const bit = parseInt(led.dataset.bit);
      // Operación a nivel de bits (Bitwise AND)
      if ((value & bit) !== 0) {
        led.classList.add('on');
      } else {
        led.classList.remove('on');
      }
    });
  };

  setLeds('.hours .led', h12);
  setLeds('.minutes .led', m);
}

// Actualizza cada segundo
setInterval(updateWatch, 1000);
updateWatch(); // Llamada inicial
