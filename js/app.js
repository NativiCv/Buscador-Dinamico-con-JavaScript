// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color');


// Contenedor para los resultados
const resultado = document.querySelector('#resultado');




// Date().getFullYear(), Trae el año actual
const max = new Date().getFullYear();
const min = max - 10;








// Generar un objeto con la busqueda

const datosBusqueda = {
  marca       : '',
  year        : '',
  minimo      : '',
  maximo      : '',
  puertas     : '',
  color       : '',
  transmision : '',
}

// Eventos
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos); // Muestra los autos al cargar
    // Llena las opciones de años
    llenarSelect();
})

// Event listener para los select de búsqueda
// change cuando cambie el select
marca.addEventListener('change', ( e ) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});

year.addEventListener('change', (e) => {
 datosBusqueda.year = parseInt(e.target.value);
 filtrarAuto();
});

minimo.addEventListener('change', (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarAuto();
});

maximo.addEventListener('change', (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarAuto();
});

puertas.addEventListener('change', (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);
  filtrarAuto();
});

transmision.addEventListener('change', (e) =>{
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});

color.addEventListener('change', (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});




// Funciones
function mostrarAutos(autos) {

  limpiarHTML(); // Elimine el HTML previo

  autos.forEach( auto => {
    const autoHTML = document.createElement('P');
    //Para prevenir colocar .auto
    const {marca,modelo,year,precio,puertas,color,transmision} = auto;

    // autoHTML.textContent = `
    //   ${auto.marca} ${auto.modelo} ${auto.year} ${auto.precio} ${auto.puertas}, ${auto.color} ${auto.transmision}
    // `;

    autoHTML.textContent = `
      ${marca} - ${modelo} - ${year} - PRECIO: $${precio} - ${puertas} - ${color} - TRANSMISIÓN: ${transmision}
    `;
      // Insertar en el HTML
      resultado.appendChild(autoHTML);
  });
}

// Limpiar el HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function llenarSelect() {

  for (let i = max; i >= min; i--) {
    const opcion = document.createElement('OPTION');
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); // Agrega las opciones de años al select
  } 
}

// Funcion que filtra en la base a la busqueda
function filtrarAuto() {
  // Array method, itera todos los elementos 
  // Funcion de alto nivel, es una funcion que toma otra funcion
  const resultado = autos.filter( filtrarMarca ).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuerta).filter(filtrarTransmision).filter(filtrarColor) ;

  if (resultado.length) {
    console.log(resultado);
    mostrarAutos(resultado);
  }else{
    noResultado();
  }


  
}

function noResultado() {
  limpiarHTML();
  const div = document.createElement("DIV");
  div.classList.add('alerta', 'error');
  div.textContent = "No hay Resultados, Intenta con otros términos de busqueda";
  resultado.appendChild(div);
}

function filtrarMarca(auto) {
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  }
    return auto;
}

function filtrarYear(auto) {
  if (datosBusqueda.year) {
    return auto.year === datosBusqueda.year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  if (datosBusqueda.minimo) {
    return auto.precio >= datosBusqueda.minimo;
  }
  return auto; 
}

function filtrarMaximo(auto) {
  if (datosBusqueda.maximo) {
    return auto.precio <= datosBusqueda.maximo;
  }
  return auto;
}

function filtrarPuerta(auto) {
  if (datosBusqueda.puertas) {
    return auto.puertas === datosBusqueda.puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  if (datosBusqueda.transmision) {
    return auto.transmision === datosBusqueda.transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  if (datosBusqueda.color) {
    return auto.color === datosBusqueda.color;
  }
  return auto;
}

