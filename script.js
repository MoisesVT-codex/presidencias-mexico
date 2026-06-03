const recorrido = document.querySelector("#recorrido");
const pista = document.querySelector("#pista");
const progreso = document.querySelector("#progreso");

function medirDesplazamiento() {
  return Math.max(0, pista.scrollWidth - window.innerWidth);
}

function actualizarRecorrido() {
  if (window.matchMedia("(max-width: 820px)").matches) {
    pista.style.transform = "translateX(0)";
    progreso.style.width = "0%";
    return;
  }

  const inicio = recorrido.offsetTop;
  const final = recorrido.offsetTop + recorrido.offsetHeight - window.innerHeight;
  if (final <= inicio) return;

  const avance = (window.scrollY - inicio) / (final - inicio);
  const porcentaje = Math.min(1, Math.max(0, avance));
  const desplazamiento = medirDesplazamiento() * porcentaje;

  pista.style.transform = `translateX(${-desplazamiento}px)`;
  progreso.style.width = `${porcentaje * 100}%`;
}

window.addEventListener("scroll", actualizarRecorrido, { passive: true });
window.addEventListener("resize", actualizarRecorrido);
actualizarRecorrido();
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.foto').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});
fetch("presidencia.json")
  .then(response => response.json())
  .then(datos => {

    console.log("JSON cargado");
    console.log(datos);
    console.log(datos[0]);
    console.log(Object.keys(datos[0]));
    
    console.log(Object.values(datos[0]));



    console.log(datos);
    console.log(datos[0]);
    const select = document.getElementById("presidenteSelect");
    const info = document.getElementById("infoPresidente");

    // Llenar el menú
    datos.forEach((fila, indice) => {


      const option = document.createElement("option");

      option.value = indice;
      option.textContent = fila.A;

      select.appendChild(option);
    });

    // Mostrar datos cuando elijan un presidente
    select.addEventListener("change", () => {

      const fila = datos[select.value];

      if (!fila) {
        info.innerHTML = "";
        return;
      }

      let html = "<h2>" + fila.A + "</h2>";

      Object.entries(fila).forEach(([columna, valor]) => {

        if (columna !== "Presidente") {

          html += `
            <p>
              <strong>${columna}:</strong>
              ${valor}
            </p>
          `;
        }
      });

      info.innerHTML = html;

    });

  });