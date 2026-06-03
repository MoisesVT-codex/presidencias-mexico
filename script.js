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

  const datos = [
    {
      "Presidente":"Años 50",
      "Periodo":"Años 50",
      "Porcentaje en pobreza":"90"
    },
    {
      "Presidente":"Años 60 y 70",
      "Periodo":"Años 60 y 70",
      "Porcentaje en pobreza":"70"
    },
    {
      "Presidente":"Miguel de la Madrid Hurtado",
      "Periodo":"1982-1988",
      "Porcentaje en pobreza":"59"
    },
    {
      "Presidente":"Carlos Salinas de Gortari",
      "Periodo":"1988-1994",
      "Porcentaje en pobreza":"21.4"
    },
    {
      "Presidente":"Ernesto Zedillo Ponce de León",
      "Periodo":"1994-2000",
      "Porcentaje en pobreza":"38"
    }
  ];
  const selector = document.getElementById("selectorPresidente");

datos.forEach(item => {
  const opcion = document.createElement("option");
  opcion.value = item.Presidente;
  opcion.textContent = item.Presidente;
  selector.appendChild(opcion);
});
const ctx = document.getElementById('graficaPobreza');

let grafica = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Pobreza'],
    datasets: [{
      label: 'Porcentaje',
      data: [21.4]
    }]
  }
});
selector.addEventListener("change", () => {

  const seleccionado = datos.find(
    d => d.Presidente === selector.value
  );

  grafica.data.datasets[0].data = [
    parseFloat(seleccionado["Porcentaje en pobreza"])
  ];

  grafica.data.datasets[0].label =
    seleccionado.Presidente;

  grafica.update();

});

const pelis = [
  {
    "Presidente":"Años 50",
    "Periodo":"Años 50",
    "Cantidad de películas por año":"100"
  },
  {
    "Presidente":"Años 60 y 70",
    "Periodo":"Años 60 y 70",
    "Cantidad de películas por año":"80"
  },
  {
    "Presidente":"Años 80",
    "Periodo":"1982-1988",
    "Cantidad de películas por año":"72"
  },
  {
    "Presidente":"Años 90",
    "Periodo":"1988-1994",
    "Cantidad de películas por año":"21"
  }
];
// DASHBOARD DE PELÍCULAS

const selectorPelis =
  document.getElementById("selectorPelis");

const detallePelis =
  document.getElementById("detallePelis");
  pelis.forEach(item => {

    const opcion = document.createElement("option");
  
    opcion.value = item.Periodo;
    opcion.textContent = item.Periodo;
  
    selectorPelis.appendChild(opcion);
  
  });
  const etiquetasPelis =
  pelis.map(d => d.Periodo);

const valoresPelis =
  pelis.map(d =>
    Number(d["Cantidad de películas por año"])
  );

const graficaPelis = new Chart(
  document.getElementById("graficaPelis"),
  {
    type: "bar",
    data: {
      labels: etiquetasPelis,
      datasets: [{
        label: "Películas por año",
        data: valoresPelis
      }]
    },
    options: {
      responsive: true
    }
  }
);
function actualizarPelis(periodoSeleccionado){

  const colores = pelis.map(item =>
    item.Periodo === periodoSeleccionado
      ? "rgba(54,162,235,0.9)"
      : "rgba(200,200,200,0.4)"
  );

  graficaPelis.data.datasets[0].backgroundColor =
    colores;

  graficaPelis.update();

}
selectorPelis.addEventListener("change", e => {

  actualizarPelis(e.target.value);

});
actualizarPelis(pelis[0].Periodo);
function actualizarPelis(periodoSeleccionado){

  const colores = pelis.map(item =>
    item.Periodo === periodoSeleccionado
      ? "rgba(54,162,235,0.9)"
      : "rgba(210,210,210,0.35)"
  );

  graficaPelis.data.datasets[0].backgroundColor =
    colores;

  graficaPelis.update();

  const dato =
    pelis.find(
      d => d.Periodo === periodoSeleccionado
    );

  detallePelis.innerHTML = `
    <h3>${dato.Periodo}</h3>
    <p>
      <strong>${dato["Cantidad de películas por año"]}</strong>
      películas producidas por año
    </p>
  `;
}
selectorPelis.addEventListener(
  "change",
  e => actualizarPelis(e.target.value)
);
actualizarPelis(pelis[0].Periodo);
const imagenes = [
  "img/ejemplo1.jpg",
  "img/ejemplo2.jpg",
  "img/ejemplo3.jpg"
];

let indice = 0;

const foto = document.getElementById("fotoCarrusel");

document.getElementById("siguiente").addEventListener("click", () => {
  indice = (indice + 1) % imagenes.length;
  foto.src = imagenes[indice];
});

document.getElementById("anterior").addEventListener("click", () => {
  indice = (indice - 1 + imagenes.length) % imagenes.length;
  foto.src = imagenes[indice];
});
setInterval(() => {
  indice = (indice + 1) % imagenes.length;
  foto.src = imagenes[indice];
}, 5000);