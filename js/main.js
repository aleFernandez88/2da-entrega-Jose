//CARRITO DE COMPRAS CON CONDICIONAL DE ENVIO:
//COMPUMUNDO-HYPER-MEGA-RED.

let usuario = "JC";
let password = "012";
const IVA = 1.16;
let acceso = false;
let envio; //variable para envio a domicilio
const carrito = []; //carrito de compras (array vacio)

//FUNCIONES.
//1- funcion para buscar producto:
function buscarProducto(array, nombre) {
  const buscarNombre = nombre.toLowerCase();
  return array.find((elem) => elem.nombre.toLowerCase().includes(buscarNombre));
}

//2- funcion para agregar productos al carrito:
function agregarAlCarrito(carrito, producto, cantidad) {
  if (producto == "x") {
    return false;
  }

  const encontrado = buscarProducto(tienda, producto);
  if (encontrado) {
    carrito.push({ ...encontrado, cantidad });
    return true;
  } else {
    alert("Producto no encontrado");
    return false;
  }
}

//3.- Funcion para calcular el pago total:
function calcularPagoTotal(array) {
  return array.reduce((acc, elemento) => {
    return acc + elemento.precio * elemento.cantidad;
  }, 0);
}

//4- funcion para login
let login = function (user, clave) {
  return user === usuario && clave === password;
};

//5.- Funcion para calcular costo de envio:
function calcularEnvio(envioDomicilio) {
  if (envioDomicilio == "si") {
    return 200; //costo fijo de envio
  } else {
    return 0; //sin costo de envio
  }
}

//6.- Funcion para calcualar parcialidades:
function calcularParcialidades(diferir, totalFinal) {
  if (diferir == "si" || diferir == "SI") {
    let plazo = parseInt(
      prompt("Elige un plazo entre 3,6 9 o 12 meses sin intereses")
    );
    //validar plazo:
    while (plazo != 3 && plazo != 6 && plazo != 9 && plazo != 12) {
      alert("opcion no valida");
      plazo = parseInt(
        prompt("Elige un plazo entre 3,6 9 o 12 meses sin intereses")
      );
    }
    let meses = plazo;
    let parcialidad = totalFinal / meses;
    return [meses, parcialidad]; //numero de meses y monto de parcialidad.
  } else {
    alert("Pago de contado");
    return [1, totalFinal]; //un solo pago de contado
  }
}

//array de productos:
const tienda = [
  { id: 1, nombre: "computadora de escritorio hp ", precio: 10500 },
  { id: 2, nombre: "laptop Dell Inspiron", precio: 12000 },
  { id: 3, nombre: "audifonos colors-1", precio: 400 },
  { id: 4, nombre: "bocinas usb", precio: 500 },
  { id: 5, nombre: "celular motorola g20", precio: 5000 },
  { id: 5, nombre: "i-pad pro max", precio: 9000 },
];

//ingreso:
for (let i = 2; i >= 0; i--) {
  let ingresoUsuario = prompt("Ingresa tu usuario");
  let ingresoPassword = prompt("Ingresa tu contraseña");
  if (login(ingresoUsuario, ingresoPassword)) {
    acceso = true;
    alert("Bienvenido a Compu-Mundo Hiper-Mega-Red " + usuario);
    break;
  } else {
    alert("Usuario o contraseña incorrectos. Tienes " + i + " intentos");
  }
}

if (acceso) {
  let seleccionar = prompt(
    "Elige un producto: \nComputadora de escritorio HP. \nLaptop dell inspiron. \nAudifonos colors-1. \nBocinas USB \n Para salir presona x \nLOS PRECIOS NO INCLUYEN IVA."
  ).toLowerCase();

  while (seleccionar != "x") {
    let cuantos = parseInt(
      prompt("Cuantas piezas de " + seleccionar + " deseas comprar?")
    );

    if (agregarAlCarrito(carrito, seleccionar, cuantos)) {
      alert("Producto agregado al carrito");
      console.log(carrito);
    }
    seleccionar = prompt(
      "Elige otro producto: \nComputadora de escritorio HP. \nLaptop dell inspiron. \nAudifonos colors-1. \nBocinas USB \n Para salir presona x \nLOS PRECIOS NO INCLUYEN IVA."
    ).toLowerCase();
  } //termina while

  if (carrito.length > 0) {
    let envioDomicilio = prompt(
      "Deseas envio a domicilio con un costo de $200.00? \nsi. \nno."
    ).toLowerCase();

    //elegir envio (si = 200, no = 0):
    envio = calcularEnvio(envioDomicilio); //llamar funcion de envio
    if (envioDomicilio == "si") {
      envio = 200;
    } else {
      envio = 0;
    }
    //variables de costos:
    const totalSinIva = calcularPagoTotal(carrito);
    const totalConIva = totalSinIva * IVA;
    const totalFinal = totalConIva + envio;

    //mostrar al usuario un resumen de compra:
    alert(
      "Resumen de compra:" +
        "\nTotal sin IVA: $" +
        totalSinIva.toFixed(2) +
        "\nTotal con IVA: $" +
        totalConIva.toFixed(2) +
        "\nCosto de envío: $" +
        envio +
        "\nTotal a pagar: $" +
        totalFinal.toFixed(2)
    );

    //elegir pagar en mensualidades:
    let diferir = prompt(
      "Deseas diferir tu compra en parcialidades? \nsi. \nno."
    ).toLowerCase();

    //llamar funcion para calcular parcialidades:
    let [meses, parcialidad] = calcularParcialidades(diferir, totalFinal);
    alert(
      "Tu plazo es de: " +
        meses +
        " meses \nTus pagos mensuales son de: $" +
        parcialidad.toFixed(2)
    );

    alert("Gracias por tu compra");
  } else {
    alert("Hasta pronto. Gracias por visitarnos");
  } //finaliza condicional carrito > 0
} else {
  alert("Cuenta bloqueada");
}
