function mostrarSeccion(seccionId) {
    // Oculta todas las secciones
    const secciones = document.querySelectorAll('.contenido');
    secciones.forEach(seccion => seccion.classList.remove('contenido-activo'));

    // Muestra solo la sección seleccionada
    const seccionSeleccionada = document.getElementById(seccionId);
    if (seccionSeleccionada) {
        seccionSeleccionada.classList.add('contenido-activo');
    }
}

// Simulación de datos para el programa

// Datos de clientes y cuentas
const clientes = [
    { id: "123456789", nombre: "Ana González", correo: "ana@example.com", telefono: "1234-5678" },
    { id: "987654321", nombre: "Carlos Méndez", correo: "carlos@example.com", telefono: "9876-5432" }
];

const cuentas = {
    "123456789": [
        { numero: "CTA123", saldo: "2500.00" },
        { numero: "CTA124", saldo: "1500.50" }
    ],
    "987654321": [
        { numero: "CTA200", saldo: "3500.00" }
    ]
};

// Base de datos simulada para cuentas y sus transacciones
const cuentasConTransacciones = [
    { numero: "CTA123", pin: "1234", dueño: "Ana González", telefono: "1234-5678" }
];

const historialTransacciones = {
    "CTA123": [
        { tipo: "Depósito", monto: 1500, fecha: "2024-11-01", comision: "No" },
        { tipo: "Retiro", monto: 500, fecha: "2024-11-02", comision: "Sí" },
        { tipo: "Depósito", monto: 2000, fecha: "2024-11-03", comision: "No" }
    ]
};

// Datos para cuentas, PINs, saldos y tipos de cambio
const cuentasDetalle = [
    { numero: "CTA123", pin: "1234", dueño: "Ana González", saldo: 5000, tipoCambioCompra: 600 }
];

const transacciones = {
    "CTA123": [
        { fecha: "2024-11-01", tipo: "Depósito", monto: 1500 },
        { fecha: "2024-11-02", tipo: "Retiro", monto: 500 },
        { fecha: "2024-11-03", tipo: "Depósito", monto: 2000 }
    ]
};

// Simulación de tipo de cambio
const tipoCambioSimulado = {
    compra: { valor: 600.00, fecha: "05/11/2024" },
    venta: { valor: 610.00, fecha: "05/11/2024" }
};

// Simulación de base de datos para cuentas y sus estatus
const cuentasInfo = [
    { numero: "CTA123", estatus: "Activa", dueño: "Ana González" },
    { numero: "CTA200", estatus: "Inactiva", dueño: "Carlos Méndez" },
    { numero: "CTA300", estatus: "Suspendida", dueño: "Beatriz López" }
];

// Variables para el sistema de autenticación de dos factores
let palabraClaveGenerada = ""; // Variable para almacenar la palabra clave generada


// GESTION DE CLIENTES 

// Función para crear cliente físico
function crearClienteFisico() {
    const nombre = document.getElementById("nombreFisico").value;
    const categoria = document.getElementById("categoriaFisico").value;
    const telefono = document.getElementById("telefonoFisico").value;
    const correo = document.getElementById("correoFisico").value;
    const identificacion = document.getElementById("identificacionFisico").value;
    const maxCuentas = document.getElementById("maxCuentasFisico").value;
    const fechaNacimiento = document.getElementById("fechaNacimientoFisico").value;
    const mensaje = document.getElementById("mensajeClienteFisico");

    if (telefono.length !== 8 || isNaN(telefono)) {
        alert("El número de teléfono debe tener 8 dígitos.");
        return;
    }
    if (!validarCorreo(correo)) {
        alert("El formato del correo electrónico no es válido.");
        return;
    }
    if (!identificacion.trim()) {
        alert("La identificación es requerida.");
        return;
    }
    if (isNaN(maxCuentas) || maxCuentas <= 0) {
        alert("La cantidad máxima de cuentas debe ser un número entero positivo.");
        return;
    }

    // Mostrar el resultado
    mensaje.innerHTML = `Se ha creado un nuevo cliente en el sistema, los datos del nuevo Cliente Físico son:<br>
                         Nombre completo: ${nombre}<br>
                         Categoría: ${categoria}<br>
                         Teléfono: ${telefono}<br>
                         Correo Electrónico: ${correo}<br>
                         Identificación: ${identificacion}<br>
                         Cantidad máxima de cuentas: ${maxCuentas}<br>
                         Fecha de Nacimiento: ${fechaNacimiento}`;
    document.getElementById("resultadoClienteFisico").style.display = "block";
}

// Función para crear cliente jurídico
function crearClienteJuridico() {
    const nombre = document.getElementById("nombreJuridico").value;
    const categoria = document.getElementById("categoriaJuridico").value;
    const telefono = document.getElementById("telefonoJuridico").value;
    const correo = document.getElementById("correoJuridico").value;
    const tipoNegocio = document.getElementById("tipoNegocio").value;
    const cedulaJuridica = document.getElementById("cedulaJuridica").value;
    const razonSocial = document.getElementById("razonSocial").value;
    const mensaje = document.getElementById("mensajeClienteJuridico");

    if (telefono.length !== 8 || isNaN(telefono)) {
        alert("El número de teléfono debe tener 8 dígitos.");
        return;
    }
    if (!validarCorreo(correo)) {
        alert("El formato del correo electrónico no es válido.");
        return;
    }
    if (!tipoNegocio.trim()) {
        alert("El tipo de negocio es requerido.");
        return;
    }
    if (!cedulaJuridica.match(/^\d{10}$/)) {
        alert("La cédula jurídica debe ser un número de 10 dígitos.");
        return;
    }
    if (!razonSocial.trim()) {
        alert("La razón social es requerida.");
        return;
    }

    // Mostrar el resultado
    mensaje.innerHTML = `Se ha creado un nuevo cliente en el sistema, los datos del nuevo Cliente Jurídico son:<br>
                         Nombre completo del apoderado: ${nombre}<br>
                         Categoría: ${categoria}<br>
                         Teléfono: ${telefono}<br>
                         Correo Electrónico: ${correo}<br>
                         Tipo de negocio: ${tipoNegocio}<br>
                         Cédula Jurídica: ${cedulaJuridica}<br>
                         Razón Social: ${razonSocial}`;
    document.getElementById("resultadoClienteJuridico").style.display = "block";
}

// Función para validar el formato de correo electrónico
function validarCorreo(correo) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(correo);
}

// Función para validar la identificación del cliente
function validarIdentificacionCliente(identificacion) {
    return clientes.find(cliente => cliente.id === identificacion);
}

// Función para mostrar información del cliente y continuar con el cambio de teléfono
function mostrarInfoCambioTelefono() {
    const identificacion = document.getElementById('identificacionCliente').value;
    const cliente = validarIdentificacionCliente(identificacion);

    if (cliente) {
        document.getElementById('datosClienteTelefono').innerHTML = `
            Cliente válido: ${cliente.nombre}<br>
            Teléfono actual: ${cliente.telefono}
        `;
        document.getElementById('infoClienteTelefono').style.display = 'block';
        document.getElementById('camposCambioTelefono').style.display = 'block';
    } else {
        alert("La identificación ingresada no corresponde a ningún cliente registrado.");
    }
}

// Función para cambiar el teléfono del cliente
function cambiarTelefono() {
    const nuevoTelefono = document.getElementById('nuevoTelefono').value;

    if (!/^\d{8}$/.test(nuevoTelefono)) {
        alert("El número de teléfono debe ser de 8 dígitos.");
        return;
    }

    const identificacion = document.getElementById('identificacionCliente').value;
    const cliente = validarIdentificacionCliente(identificacion);

    if (cliente) {
        cliente.telefono = nuevoTelefono;
        document.getElementById('mensajeCambioTelefono').innerHTML = `
            Estimado usuario: ${cliente.nombre}, ha cambiado su teléfono exitosamente.
        `;
        document.getElementById('resultadoCambioTelefono').style.display = 'block';
    }
}

// Función para mostrar información del cliente y continuar con el cambio de correo
function mostrarInfoCambioCorreo() {
    const identificacion = document.getElementById('identificacionCorreoCliente').value;
    const cliente = validarIdentificacionCliente(identificacion);

    if (cliente) {
        document.getElementById('datosClienteCorreo').innerHTML = `
            Cliente válido: ${cliente.nombre}<br>
            Correo actual: ${cliente.correo}
        `;
        document.getElementById('infoClienteCorreo').style.display = 'block';
        document.getElementById('camposCambioCorreo').style.display = 'block';
    } else {
        alert("La identificación ingresada no corresponde a ningún cliente registrado.");
    }
}

// Función para cambiar el correo electrónico del cliente
function cambiarCorreo() {
    const nuevoCorreo = document.getElementById('nuevoCorreo').value;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoCorreo)) {
        alert("Por favor ingrese una dirección de correo electrónico válida.");
        return;
    }

    const identificacion = document.getElementById('identificacionCorreoCliente').value;
    const cliente = validarIdentificacionCliente(identificacion);

    if (cliente) {
        cliente.correo = nuevoCorreo;
        document.getElementById('mensajeCambioCorreo').innerHTML = `
            Estimado usuario: ${cliente.nombre}, ha cambiado su correo electrónico exitosamente.
        `;
        document.getElementById('resultadoCambioCorreo').style.display = 'block';
    }
}


// GESTION DE CUENTAS
// Función para validar la identificación del cliente
function validarIdentificacion() {
    const identificacion = document.getElementById('identificacionCuenta').value;
    const cliente = clientes.find(c => c.id === identificacion);

    const infoClienteDiv = document.getElementById('infoCliente');
    const datosClienteP = document.getElementById('datosCliente');
    const camposCuentaDiv = document.getElementById('camposCuenta');

    if (cliente) {
        datosClienteP.innerHTML = `Cliente válido: ${cliente.nombre} (Tipo: ${cliente.tipo})`;
        infoClienteDiv.style.display = 'block';
        camposCuentaDiv.style.display = 'block';
    } else {
        alert("La identificación ingresada no corresponde a ningún cliente registrado.");
        infoClienteDiv.style.display = 'none';
        camposCuentaDiv.style.display = 'none';
    }
}

// Función para crear una nueva cuenta
function crearCuenta() {
    const identificacion = document.getElementById('identificacionCuenta').value;
    const pin = document.getElementById('pinCuenta').value;
    const montoInicial = document.getElementById('montoInicial').value;
    const cliente = clientes.find(c => c.id === identificacion);

    if (!cliente) {
        alert("La identificación ingresada no corresponde a ningún cliente registrado.");
        return;
    }

    // Validación del PIN y monto
    if (!/^\d{4}$/.test(pin)) {
        alert("El PIN debe ser un número de 4 dígitos.");
        return;
    }

    if (!/^\d+$/.test(montoInicial)) {
        alert("El monto inicial debe ser un número entero sin decimales.");
        return;
    }

    // Generar un nuevo número de cuenta y agregar la cuenta a los datos simulados
    const numeroCuenta = `CTA${Math.floor(Math.random() * 10000)}`;
    const nuevaCuenta = {
        numero: numeroCuenta,
        pin,
        saldo: parseFloat(montoInicial),
        estatus: "Activa"
    };
    cuentas[identificacion].push(nuevaCuenta);

    const resultadoCuentaDiv = document.getElementById('resultadoCuenta');
    const mensajeCuentaP = document.getElementById('mensajeCuenta');

    mensajeCuentaP.innerHTML = `
        Se ha creado una nueva cuenta en el sistema.<br>
        Número de cuenta: ${numeroCuenta}<br>
        Estatus de la cuenta: Activa<br>
        Saldo actual: ${parseFloat(montoInicial).toFixed(2)} colones<br>
        Tipo de cliente: ${cliente.tipo}<br>
        Nombre del dueño: ${cliente.nombre}
    `;
    resultadoCuentaDiv.style.display = 'block';
}

// Función para validar la cuenta
function validarCuenta() {
    const numeroCuenta = document.getElementById('numeroCuenta').value;
    const cuenta = Object.values(cuentas).flat().find(c => c.numero === numeroCuenta);

    const camposCambioPinDiv = document.getElementById('camposCambioPin');
    const resultadoCambioPinDiv = document.getElementById('resultadoCambioPin');

    if (cuenta) {
        camposCambioPinDiv.style.display = 'block';
        resultadoCambioPinDiv.style.display = 'none';
    } else {
        alert("El número de cuenta ingresado no corresponde a ninguna cuenta registrada.");
        camposCambioPinDiv.style.display = 'none';
    }
}

// Función para cambiar el PIN
function cambiarPin() {
    const numeroCuenta = document.getElementById('numeroCuenta').value;
    const pinActual = document.getElementById('pinActual').value;
    const nuevoPin = document.getElementById('nuevoPin').value;
    const cuenta = Object.values(cuentas).flat().find(c => c.numero === numeroCuenta);

    if (!cuenta) {
        alert("El número de cuenta ingresado no corresponde a ninguna cuenta registrada.");
        return;
    }

    // Validación de PIN actual y nuevo PIN
    if (cuenta.pin !== pinActual) {
        alert("El PIN actual ingresado es incorrecto.");
        return;
    }

    if (!/^\d{4}$/.test(nuevoPin)) {
        alert("El nuevo PIN debe ser un número de 4 dígitos.");
        return;
    }

    cuenta.pin = nuevoPin; // Actualiza el PIN en la base de datos simulada

    const resultadoCambioPinDiv = document.getElementById('resultadoCambioPin');
    const mensajeCambioPinP = document.getElementById('mensajeCambioPin');
    mensajeCambioPinP.innerHTML = `
        Estimado usuario: ${cuenta.dueño}, le informamos que se ha cambiado satisfactoriamente el PIN de su cuenta ${numeroCuenta}.
    `;
    resultadoCambioPinDiv.style.display = 'block';
}

// Función para validar la cuenta antes de eliminarla
function validarCuentaParaEliminar() {
    const numeroCuenta = document.getElementById('numeroCuentaEliminar').value;
    const pin = document.getElementById('pinCuentaEliminar').value;
    const cuenta = Object.values(cuentas).flat().find(c => c.numero === numeroCuenta);

    const mensajeConfirmacionDiv = document.getElementById('mensajeConfirmacionEliminacion');
    const mensajeCuentaEliminarP = document.getElementById('mensajeCuentaEliminar');
    const resultadoEliminacionDiv = document.getElementById('resultadoEliminacionCuenta');

    if (!cuenta) {
        alert("El número de cuenta ingresado no corresponde a ninguna cuenta registrada.");
        return;
    }

    if (cuenta.pin !== pin) {
        alert("El PIN ingresado es incorrecto.");
        return;
    }

    mensajeCuentaEliminarP.innerHTML = `
        Estimado usuario: ${cuenta.dueño}, usted está a un paso de eliminar su cuenta ${numeroCuenta} cuyo saldo actual es de ¢${cuenta.saldo.toFixed(2)}.
        <br>¿Está seguro que desea eliminar esta cuenta?
    `;
    mensajeConfirmacionDiv.style.display = 'block';
    resultadoEliminacionDiv.style.display = 'none';
}

// Función para confirmar la eliminación de la cuenta
function confirmarEliminacion() {
    const numeroCuenta = document.getElementById('numeroCuentaEliminar').value;
    const cuenta = Object.values(cuentas).flat().find(c => c.numero === numeroCuenta);

    const resultadoEliminacionDiv = document.getElementById('resultadoEliminacionCuenta');
    const mensajeResultadoEliminacionP = document.getElementById('mensajeResultadoEliminacion');

    if (cuenta) {
        const saldoCuenta = cuenta.saldo;
        
        // Eliminar la cuenta de los datos simulados
        Object.keys(cuentas).forEach(id => {
            cuentas[id] = cuentas[id].filter(c => c.numero !== numeroCuenta);
        });

        if (saldoCuenta > 0) {
            mensajeResultadoEliminacionP.innerHTML = `
                La cuenta ${numeroCuenta} ha sido eliminada exitosamente.<br>
                Por favor, tome el dinero que ha sido dispuesto en el dispensador de dinero, ya que su saldo era de ¢${saldoCuenta.toFixed(2)}.
            `;
        } else {
            mensajeResultadoEliminacionP.innerHTML = `
                La cuenta ${numeroCuenta} ha sido eliminada exitosamente. No tenía saldo al momento de la eliminación.
            `;
        }

        resultadoEliminacionDiv.style.display = 'block';
        document.getElementById('mensajeConfirmacionEliminacion').style.display = 'none';
    }
}

// Función para cancelar la eliminación
function cancelarEliminacion() {
    document.getElementById('mensajeConfirmacionEliminacion').style.display = 'none';
    alert("Eliminación de la cuenta cancelada.");
}

// GESTION DE OPERACIONES FINANCIERAS 

// Funcion para realizar deposito en colones
function realizarDepositoColones(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const numeroCuenta = document.getElementById("numeroCuentaDeposito").value;
    const montoDeposito = document.getElementById("montoDeposito").value;
    const cuenta = Object.values(cuentas).flat().find(c => c.numero === numeroCuenta);

    if (!cuenta) {
        alert("Número de cuenta no encontrado. Por favor, verifique el número ingresado.");
        return;
    }

    if (isNaN(montoDeposito) || parseFloat(montoDeposito) <= 0 || montoDeposito.includes(".")) {
        alert("El monto debe ser un número entero positivo sin decimales.");
        return;
    }

    // Procesar el depósito
    const montoComision = parseFloat(montoDeposito) * 0.02; // 2% de comisión
    const montoRealDepositado = parseFloat(montoDeposito) - montoComision;
    cuenta.saldo += montoRealDepositado;

    // Mostrar el resultado
    const resultadoDepositoDiv = document.getElementById("resultadoDepositoColones");
    const mensajeDeposito = document.getElementById("mensajeDepositoColones");
    mensajeDeposito.innerHTML = `
        Estimado usuario: ${cuenta.dueño}, se han depositado correctamente ${parseFloat(montoDeposito).toFixed(2)} colones.<br>
        El monto real depositado a su cuenta ${cuenta.numero} es de ${montoRealDepositado.toFixed(2)} colones<br>
        El monto cobrado por concepto de comisión fue de ${montoComision.toFixed(2)} colones, que fueron rebajados automáticamente de su saldo actual
    `;
    resultadoDepositoDiv.style.display = "block";
}

// Funcion para realizar deposito en dolares
function realizarDepositoDolares(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const numeroCuenta = document.getElementById("numeroCuentaDepositoDolares").value;
    const montoDepositoDolares = document.getElementById("montoDepositoDolares").value;
    const cuenta = Object.values(cuentas).flat().find(c => c.numero === numeroCuenta);

    if (!cuenta) {
        alert("Número de cuenta no encontrado. Por favor, verifique el número ingresado.");
        return;
    }

    if (isNaN(montoDepositoDolares) || parseFloat(montoDepositoDolares) <= 0 || montoDepositoDolares.includes(".")) {
        alert("El monto debe ser un número entero positivo sin decimales.");
        return;
    }

    // Obtener el tipo de cambio de compra (simulado)
    const tipoCambioCompra = tipoCambioSimulado.compra.valor;
    const fechaCambio = tipoCambioSimulado.compra.fecha;

    // Calcular el monto en colones y la comisión
    const montoEnColones = parseFloat(montoDepositoDolares) * tipoCambioCompra;
    const montoComision = montoEnColones * 0.02; // 2% de comisión
    const montoRealDepositado = montoEnColones - montoComision;
    cuenta.saldo += montoRealDepositado;

    // Mostrar el resultado en un mensaje agradable
    const resultadoDepositoDiv = document.getElementById("resultadoDepositoDolares");
    const mensajeDepositoDolares = document.getElementById("mensajeDepositoDolares");
    mensajeDepositoDolares.innerHTML = `
        Estimado usuario: <strong>${cuenta.dueño}</strong>, hemos recibido exitosamente un depósito de <strong>$${parseFloat(montoDepositoDolares).toFixed(2)}</strong>.<br>
        <br>
        El tipo de cambio de compra según el BCCR para el día de hoy (${fechaCambio}) es: ₡${tipoCambioCompra.toFixed(2)}<br>
        <br>
        Monto equivalente en colones: <strong>₡${montoEnColones.toFixed(2)}</strong><br>
        Monto depositado en su cuenta: <strong>₡${montoRealDepositado.toFixed(2)}</strong><br>
        Comisión aplicada: <strong>₡${montoComision.toFixed(2)}</strong>, que ha sido rebajada automáticamente de su saldo.
    `;
    resultadoDepositoDiv.style.display = "block";
}


// Función para iniciar el proceso de retiro en colones
function iniciarRetiroColones() {
    const numeroCuenta = document.getElementById("numeroCuentaRetiroColones").value;
    const pin = document.getElementById("pinRetiroColones").value;

    // Verificar cuenta y PIN
    if (verificarCuentaYpin(numeroCuenta, pin, 'Colones')) {
        enviarPalabraClave("Colones");
    } else {
        alert("Número de cuenta o PIN incorrecto.");
    }
}

// Función para iniciar el proceso de retiro en dólares
function iniciarRetiroDolares() {
    const numeroCuenta = document.getElementById("numeroCuentaRetiroDolares").value;
    const pin = document.getElementById("pinRetiroDolares").value;

    // Verificar cuenta y PIN
    if (verificarCuentaYpin(numeroCuenta, pin, 'Dolares')) {
        enviarPalabraClave("Dolares");
    } else {
        alert("Número de cuenta o PIN incorrecto.");
    }
}

// Función para verificar cuenta y PIN
function verificarCuentaYpin(numeroCuenta, pin, tipoRetiro) {
    const cuenta = cuentasConTransacciones.find(c => c.numero === numeroCuenta && c.pin === pin);
    if (cuenta) {
        document.getElementById(`verificacionPalabra${tipoRetiro}`).style.display = 'block';
        return true;
    }
    return false;
}

// Función para enviar una palabra clave al usuario (simulación)
function enviarPalabraClave(tipoRetiro) {
    palabraClaveGenerada = generarPalabraAleatoria();
    alert(`Simulación: Se ha enviado la palabra clave "${palabraClaveGenerada}" al teléfono registrado.`); // Simulación
}

// Función para generar una palabra clave aleatoria
function generarPalabraAleatoria() {
    const palabras = ["clave", "seguridad", "banca", "transaccion", "autenticacion"];
    return palabras[Math.floor(Math.random() * palabras.length)];
}

// Función para validar la palabra clave ingresada
function validarPalabraClaveRetiro(tipoRetiro) {
    const palabraIngresada = document.getElementById(`palabraClave${tipoRetiro}`).value;
    if (palabraIngresada === palabraClaveGenerada) {
        document.getElementById(`campoMontoRetiro${tipoRetiro}`).style.display = 'block';
    } else {
        alert("Palabra clave incorrecta. Inténtelo de nuevo.");
    }
}

// Función para realizar el retiro en colones
function realizarRetiroColones() {
    const monto = parseInt(document.getElementById("montoRetiroColones").value);
    const cuenta = cuentasConTransacciones.find(c => c.numero === "CTA123"); // Ejemplo

    if (validarMonto(monto, cuenta)) {
        cuenta.saldo -= monto;
        mostrarResultadoRetiro(cuenta, monto, "Colones", 100); // 100 colones de comisión
    } else {
        alert("Fondos insuficientes o monto inválido.");
    }
}

// Función para realizar el retiro en dólares
function realizarRetiroDolares() {
    const montoDolares = parseInt(document.getElementById("montoRetiroDolares").value);
    const tipoCambioVenta = tipoCambioSimulado.venta.valor;
    const montoColones = montoDolares * tipoCambioVenta;
    const cuenta = cuentasConTransacciones.find(c => c.numero === "CTA123"); // Ejemplo

    if (validarMonto(montoColones, cuenta)) {
        cuenta.saldo -= montoColones;
        mostrarResultadoRetiro(cuenta, montoDolares, "Dolares", montoColones * 0.02, tipoCambioVenta);
    } else {
        alert("Fondos insuficientes o monto inválido.");
    }
}

// Función para validar el monto del retiro
function validarMonto(monto, cuenta) {
    return !isNaN(monto) && monto > 0 && cuenta.saldo >= monto;
}

// Función para mostrar el resultado del retiro
function mostrarResultadoRetiro(cuenta, monto, tipoRetiro, comision, tipoCambioVenta = null) {
    const mensajeRetiro = document.getElementById(`mensajeRetiro${tipoRetiro}`);
    const montoTotal = monto + comision;

    let mensaje = `Estimado usuario: ${cuenta.dueño}, el monto de este retiro de su cuenta ${cuenta.numero} es ${monto}.00 ${tipoRetiro.toLowerCase()}, por favor tome el dinero dispensado.<br>`;
    mensaje += `[El monto cobrado por concepto de comisión fue de ${comision.toFixed(2)} colones, que fueron rebajados automáticamente de su saldo actual]<br>`;

    if (tipoRetiro === "Dolares") {
        mensaje += `[Según el BCCR, el tipo de cambio de venta del dólar de hoy es: ${tipoCambioVenta.toFixed(2)}]<br>`;
        mensaje += `[El monto equivalente de su retiro es ${montoTotal.toFixed(2)} colones]`;
    }

    mensajeRetiro.innerHTML = mensaje;
    document.getElementById(`resultadoRetiro${tipoRetiro}`).style.display = "block";
}


// CONSULTAS Y REPORTES

// Función para iniciar la consulta de transacciones
function iniciarConsultaTransacciones() {
    const numeroCuenta = document.getElementById("numeroCuentaTransacciones").value;
    const pinCuenta = document.getElementById("pinCuentaTransacciones").value;
    const cuenta = cuentasConTransacciones.find(c => c.numero === numeroCuenta);

    if (cuenta && cuenta.pin === pinCuenta) {
        // Generar una palabra clave simulada
        palabraClaveGenerada = generarPalabraClave();
        alert(`Simulación: Se ha enviado la palabra clave "${palabraClaveGenerada}" al teléfono registrado.`);
        
        // Mostrar la sección de verificación de palabra clave
        document.getElementById("verificacionPalabra").style.display = "block";
    } else {
        alert("Número de cuenta o PIN incorrecto. Por favor, verifique los datos ingresados.");
    }
}

// Función para generar una palabra clave aleatoria
function generarPalabraClave() {
    const palabras = ["seguridad", "clave", "banca", "transaccion", "codigo"];
    return palabras[Math.floor(Math.random() * palabras.length)];
}

// Función para validar la palabra clave ingresada
function validarPalabraClave() {
    const palabraIngresada = document.getElementById("palabraClave").value;

    if (palabraIngresada === palabraClaveGenerada) {
        mostrarTransacciones();
    } else {
        alert("La palabra ingresada no coincide. Intente nuevamente.");
    }
}

// Función para mostrar las transacciones de la cuenta
function mostrarTransacciones() {
    const numeroCuenta = document.getElementById("numeroCuentaTransacciones").value;
    const cuenta = cuentasConTransacciones.find(c => c.numero === numeroCuenta);
    const resultadoDiv = document.getElementById("resultadoTransacciones");
    const mensaje = document.getElementById("mensajeTransacciones");
    const tbody = document.querySelector("#tablaTransacciones tbody");

    mensaje.innerHTML = `Estimado usuario: <strong>${cuenta.dueño}</strong>, el detalle de todos los depósitos y retiros que se han realizado sobre su cuenta <strong>${cuenta.numero}</strong> es:`;

    tbody.innerHTML = "";  // Limpiar contenido previo

    const transacciones = historialTransacciones[numeroCuenta] || [];
    transacciones.forEach(transaccion => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaccion.tipo}</td>
            <td>₡${transaccion.monto.toFixed(2)}</td>
            <td>${transaccion.fecha}</td>
            <td>${transaccion.comision}</td>
        `;
        tbody.appendChild(row);
    });

    resultadoDiv.style.display = "block";
}

// Función para consultar el tipo de cambio de compra o venta
function consultarTipoCambio(tipo) {
    const resultadoDivCompra = document.getElementById("resultadoTipoCambioCompra");
    const mensajeCompra = document.getElementById("mensajeTipoCambioCompra");
    const resultadoDivVenta = document.getElementById("resultadoTipoCambioVenta");
    const mensajeVenta = document.getElementById("mensajeTipoCambioVenta");

    if (tipo === 'compra') {
        const tipoCambioCompra = tipoCambioSimulado.compra;
        mensajeCompra.innerHTML = `El tipo de cambio de compra del dólar al día de hoy <strong>${tipoCambioCompra.fecha}</strong> es de <strong>₡${tipoCambioCompra.valor.toFixed(2)}</strong>.`;
        resultadoDivCompra.style.display = "block";
    } else if (tipo === 'venta') {
        const tipoCambioVenta = tipoCambioSimulado.venta;
        mensajeVenta.innerHTML = `El tipo de cambio de venta del dólar al día de hoy <strong>${tipoCambioVenta.fecha}</strong> es de <strong>₡${tipoCambioVenta.valor.toFixed(2)}</strong>.`;
        resultadoDivVenta.style.display = "block";
    }
}

// Vincular la sección "Consultar Tipo de Cambio de Compra" para cargar automáticamente el tipo de cambio
document.querySelector("[onclick=\"mostrarSeccion('consultarTipoCambioCompra')\"]").onclick = function() {
    mostrarSeccion('consultarTipoCambioCompra');
    consultarTipoCambio('compra'); // Llama a la función de consulta de tipo de cambio de compra
};

// Vincular la sección "Consultar Tipo de Cambio de Venta" para cargar automáticamente el tipo de cambio
document.querySelector("[onclick=\"mostrarSeccion('consultarTipoCambioVenta')\"]").onclick = function() {
    mostrarSeccion('consultarTipoCambioVenta');
    consultarTipoCambio('venta'); // Llama a la función de consulta de tipo de cambio de venta
};

// Función para consultar el estado de cuenta
function consultarEstadoCuenta() {
    const numeroCuenta = document.getElementById("numeroCuentaEstado").value;
    const pinCuenta = document.getElementById("pinCuenta").value;
    const cuenta = cuentasDetalle.find(c => c.numero === numeroCuenta);
    const resultadoEstadoCuentaDiv = document.getElementById("resultadoEstadoCuenta");
    const datosCuentaEstadoP = document.getElementById("datosCuentaEstado");
    const tbody = document.querySelector("#tablaTransaccionesCuenta tbody");

    if (cuenta && cuenta.pin === pinCuenta) {
        const saldoDolares = (cuenta.saldo / cuenta.tipoCambioCompra).toFixed(2);

        datosCuentaEstadoP.innerHTML = `
            <strong>Número de Cuenta:</strong> ${cuenta.numero}<br>
            <strong>Nombre del Titular:</strong> ${cuenta.dueño}<br>
            <strong>Saldo Actual (₡):</strong> ${cuenta.saldo}<br>
            <strong>Saldo Actual ($):</strong> ${saldoDolares}
        `;

        tbody.innerHTML = "";  // Limpiar contenido previo

        const transaccionesCuenta = transacciones[numeroCuenta] || [];
        transaccionesCuenta.forEach(transaccion => {
            const montoDolares = (transaccion.monto / cuenta.tipoCambioCompra).toFixed(2);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaccion.fecha}</td>
                <td>${transaccion.tipo}</td>
                <td>₡${transaccion.monto.toFixed(2)}</td>
                <td>$${montoDolares}</td>
            `;
            tbody.appendChild(row);
        });

        resultadoEstadoCuentaDiv.style.display = "block";
    } else {
        resultadoEstadoCuentaDiv.style.display = "none";
        alert("Número de cuenta o PIN incorrecto. Por favor, verifique los datos ingresados.");
    }
}

// Función para consultar el estatus de una cuenta
function consultarEstatusCuenta() {
    const numeroCuenta = document.getElementById("numeroCuenta").value;
    const cuenta = cuentasInfo.find(c => c.numero === numeroCuenta);
    const resultadoCuentaDiv = document.getElementById("resultadoCuenta");
    const datosCuentaP = document.getElementById("datosCuenta");

    if (cuenta) {
        datosCuentaP.innerHTML = `La cuenta número <strong>${cuenta.numero}</strong> a nombre de <strong>${cuenta.dueño}</strong> tiene estatus de <strong>${cuenta.estatus}</strong>.`;
        resultadoCuentaDiv.style.display = "block";
    } else {
        resultadoCuentaDiv.style.display = "none";
        alert("Número de cuenta no encontrado. Por favor, verifique el número ingresado.");
    }
}

// Función para consultar las cuentas de un cliente
function consultarCuentasCliente() {
    const identificacion = document.getElementById("identificacionCliente").value;
    const cliente = clientes.find(c => c.id === identificacion);
    const resultadoClienteDiv = document.getElementById("resultadoCliente");
    const datosClienteP = document.getElementById("datosCliente");
    const tbody = document.querySelector("#tablaCuentasCliente tbody");

    if (cliente) {
        datosClienteP.innerHTML = `
            <strong>Nombre:</strong> ${cliente.nombre}<br>
            <strong>Correo:</strong> ${cliente.correo}<br>
            <strong>Teléfono:</strong> ${cliente.telefono}
        `;
        
        tbody.innerHTML = "";  // Limpiar contenido anterior

        const cuentasCliente = cuentas[identificacion] || [];
        cuentasCliente.forEach(cuenta => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${cuenta.numero}</td>
                <td>${cuenta.saldo}</td>
            `;
            tbody.appendChild(row);
        });

        resultadoClienteDiv.style.display = "block";
    } else {
        resultadoClienteDiv.style.display = "none";
        alert("Cliente no encontrado. Por favor, verifique la identificación.");
    }
}

// Función para mostrar todos los clientes registrados
function mostrarClientesRegistrados() {
    const tbody = document.querySelector("#tablaClientesRegistrados tbody");
    tbody.innerHTML = "";  // Limpiar contenido previo

    clientes.sort((a, b) => a.nombre.localeCompare(b.nombre));
    clientes.forEach(cliente => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.correo}</td>
            <td>${cliente.telefono}</td>
        `;
        tbody.appendChild(row);
    });

    mostrarSeccion('consultarClientesRegistrados');
}
// Llama a mostrarClientesRegistrados cuando se seleccione "Clientes Registrados" en el menú
document.querySelector("[onclick=\"mostrarSeccion('consultarClientesRegistrados')\"]").onclick = mostrarClientesRegistrados;

// Función para mostrar todas las cuentas registradas
function mostrarCuentasRegistradas() {
    const tbody = document.querySelector("#tablaCuentasRegistradas tbody");
    tbody.innerHTML = "";  // Limpiamos el contenido previo

    cuentasInfo.forEach(cuenta => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${cuenta.numero}</td>
            <td>${cuenta.estatus}</td>
            <td>${cuenta.dueño}</td>
            <td>${cuenta.saldo}</td>
        `;
        tbody.appendChild(row);
    });

    mostrarSeccion('consultarCuentasRegistradas');
}
// Llama a mostrarCuentasRegistradas cuando se seleccione "Cuentas Registradas" en el menú
document.querySelector("[onclick=\"mostrarSeccion('consultarCuentasRegistradas')\"]").onclick = mostrarCuentasRegistradas;

