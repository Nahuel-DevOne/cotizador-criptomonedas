const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

// Evento que se carga cuando el documento está listo
// Se llama a la función consultarCriptomonedas
document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas();

    formulario.addEventListener('submit', submitFormulario);

    // Se leen los valores del select de las criptomonedas y se agregan al objeto de búsqueda
    criptomonedasSelect.addEventListener('change', leerValor);
    // 
    monedaSelect.addEventListener('change', leerValor);
});

function consultarCriptomonedas(){
    // 1. Se consulta a esta url con fetch
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(respuesta => respuesta.json()) // Se obtiene la respuesta, se convierte a json
        .then(resultado => obtenerCriptomonedas(resultado.Data)) // Se obtiene el resultado, se llama a la función obtenerCriptomonedas
        .then(criptomonedas => selectCriptomonedas(criptomonedas)) // Se arma el select de criptomonedas

}

// Crear un promise
const obtenerCriptomonedas = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas);
})

function selectCriptomonedas(criptomonedas){
    criptomonedas.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option);

    })
}

function leerValor(e){
    objBusqueda[e.target.name] = e.target.value;
    // console.log(objBusqueda);
}

function submitFormulario(e){
    e.preventDefault();

    // Validar
    const { moneda, criptomoneda } = objBusqueda;

    if(moneda === '' || criptomoneda === ''){
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }

}

function mostrarAlerta(msg){
    const existeError = document.querySelector('.error');

    if(!existeError){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');

        // Mensaje de error
        divMensaje.textContent = msg;

        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}