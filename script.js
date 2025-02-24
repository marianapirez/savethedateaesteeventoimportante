// URL de tu Web App desplegada en Google Apps Script
const url = "https://script.google.com/macros/s/AKfycbxBUdsIyCCD79Ed0wdg8Tkx6nVDkwRzh_jT1belXyM-d09YO7Spm3lQozh5jl-G37Y0QA/exec"; // Reemplaza con tu URL

// Lista de invitados con sus cupos asignados
const invitados = {
  "anadossantos": { nombre: "Ana dos Santos", telefono: "095608354", cupos: 5 },
  "makinsondossantos": { nombre: "Makinson dos Santos", telefono: "095608348", cupos: 1 },
  "sandradossantos": { nombre: "Sandra dos Santos", telefono: "096112224", cupos: 2 },
  "fanygomez": { nombre: "Fany Gomez", telefono: "097929465", cupos: 1 },
  "mirthagomez": { nombre: "Mirtha Gomez", telefono: "098265107", cupos: 1 },
  "mirianlemos": { nombre: "Mirian Lemos", telefono: "091960397", cupos: 3 },
  "claudialemos": { nombre: "Claudia Lemos", telefono: "84376566", cupos: 5 },
  "teresalemos": { nombre: "Teresa Lemos", telefono: "095025208", cupos: 1 },
  "nellylemos": { nombre: "Nelly Lemos", telefono: "094169819", cupos: 2 },
  "isabellemos": { nombre: "Isabel Lemos", telefono: "99119520", cupos: 2 },
  "marcialemos": { nombre: "Marcia Lemos", telefono: "91935095", cupos: 2 },
  "gustavolemos": { nombre: "Gustavo Lemos", telefono: "099195234", cupos: 5 },
  "hugolemos": { nombre: "Hugo Lemos", telefono: "091502299", cupos: 4 },
  "yanelemos": { nombre: "Yane Lemos", telefono: "099795888", cupos: 3 },
  "mireyalemos": { nombre: "Mireya Lemos", telefono: "091649145", cupos: 1 },
  "cecilialemos": { nombre: "Cecilia Lemos", telefono: "098864994", cupos: 3 },
  "rosanaramos": { nombre: "Rosana Ramos", telefono: "099526255", cupos: 5 },
  "carinaramos": { nombre: "Carina Ramos", telefono: "099751723", cupos: 3 },
  "fanyalmeida": { nombre: "Fany Almeida", telefono: "099932002", cupos: 2 },
  "irisalmeida": { nombre: "Iris Almeida", telefono: "091551702", cupos: 3 },
  "leticiagutierrez": { nombre: "Leticia Gutierrez", telefono: "097194792", cupos: 6 },
  "gustavomello": { nombre: "Gustavo Mello", telefono: "99754570", cupos: 5 },
  "tamaramello": { nombre: "Tamara Mello", telefono: "093876979", cupos: 4 },
  "deliairigaray": { nombre: "Delia Irigaray", telefono: "097038076", cupos: 2 },
  "soniafigueroa": { nombre: "Sonia Figueroa", telefono: "095511703", cupos: 2 },
  "jazminrivero": { nombre: "Jazmin Rivero", telefono: "098062436", cupos: 3 },
  "lorenawilkins": { nombre: "Lorena Wilkins", telefono: "094971599", cupos: 5 },
  "marciarodriguez": { nombre: "Marcia Rodríguez", telefono: "095608377", cupos: 5 },
  "naraolivera": { nombre: "Nara Olivera", telefono: "093363063", cupos: 2 },
  "marlenribeiro": { nombre: "Marlene Ribeiro", telefono: "97037194", cupos: 2 },
  "mariapereira": { nombre: "María Pereira", telefono: "91756940", cupos: 1 },
  "patriciapereira": { nombre: "Patricia Pereira", telefono: "099888693", cupos: 2 },
  "jorgebuere": { nombre: "Jorge buere", telefono: "099601717", cupos: 1 },
  "emanuelmorales": { nombre: "Emanuel Morales", telefono: "098861371", cupos: 1 },
  "celiadarosa": { nombre: "Celia da Rosa", telefono: "091324955", cupos: 1 },
  "flaviavieira": { nombre: "Flavia Vieira", telefono: "092988314", cupos: 1 },
  "elisaarriola": { nombre: "Elisa Arriola", telefono: "095753429", cupos: 1 },
  "isaurafrias": { nombre: "Isaura Frías", telefono: "46223641", cupos: 1 },
  "biancarodriguez": { nombre: "Bianca Rodríguez", telefono: "092789970", cupos: 1 },
  "albertomoreno": { nombre: "Alberto Moreno", telefono: "098743203", cupos: 1 },
  "fernandavalbuena": { nombre: "Fernanda Valbuena", telefono: "091208406", cupos: 3 }
};

// Función para buscar el invitado por nombre o teléfono
function buscarInvitado(event) {
  event.preventDefault();
  const input = document.getElementById("nombre").value.trim();
  if (input === "") {
    alert("Por favor, ingrese su nombre o teléfono.");
    return;
  }

  let invitadoEncontrado = null;
  for (let clave in invitados) {
    if (invitados[clave].telefono === input || clave === input) {
      invitadoEncontrado = invitados[clave];
      break;
    }
  }

  if (invitadoEncontrado) {
    localStorage.setItem("nombre", invitadoEncontrado.nombre);
    localStorage.setItem("cupos", invitadoEncontrado.cupos);
    document.getElementById("pagina1").style.display = "none";
    document.getElementById("pagina2").style.display = "block";
    document.getElementById("nombreInvitado").textContent = invitadoEncontrado.nombre;
    document.getElementById("cupos").textContent = "Tienes disponibles " + invitadoEncontrado.cupos + " lugares.";
  } else {
    alert("Nombre o teléfono no encontrado en la lista de invitados, intente nuevamente.");
  }
}

// Función para mostrar u ocultar el contenedor extra según la selección de asistencia
function actualizarCampos() {
  const asistenciaElem = document.querySelector('input[name="asistencia"]:checked');
  const extras = document.getElementById("extras");
  if (asistenciaElem && asistenciaElem.value === "si") {
    extras.style.display = "block";
  } else {
    extras.style.display = "none";
    document.getElementById("lugaresConfirmados").value = "";
  }
}

// Función para guardar la confirmación y enviar los datos a Google Sheets
function guardarConfirmacion(event) {
  event.preventDefault();

  const asistenciaElem = document.querySelector('input[name="asistencia"]:checked');
  if (!asistenciaElem) {
    alert("Por favor, indique si asistirá o no.");
    return;
  }

  const asistencia = asistenciaElem.value;
  const nombre = localStorage.getItem("nombre");
  let lugares = "";
  if (asistencia === "si") {
    lugares = document.getElementById("lugaresConfirmados").value;
    const cuposDisponibles = parseInt(localStorage.getItem("cupos"));
    if (lugares === "" || isNaN(lugares) || parseInt(lugares) < 1 || parseInt(lugares) > cuposDisponibles) {
      alert("No puede confirmar más lugares de los asignados.");
      return;
    }
  } else {
    // Para quienes no asisten, se guarda 0 lugares confirmados
    lugares = 0;
  }

  // Preparar datos a enviar usando FormData
  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("asistencia", asistencia);
  formData.append("lugaresConfirmados", lugares);

  // Enviar datos al endpoint de Google Apps Script
  fetch(url, {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(result => {
    console.log("Datos guardados:", result);
  })
  .catch(error => {
    console.error("Error al guardar los datos:", error);
  });

  // Actualizar la página de agradecimiento
  const mensajeGracias = document.getElementById("mensajeGracias");
  const detalleGracias = document.getElementById("detalleGracias");
  const whatsappLinkDiv = document.getElementById("whatsappLink");

  if (asistencia === "si") {
    mensajeGracias.textContent = "Gracias por confirmar tu presencia.";
    detalleGracias.textContent = "¡Nos vemos en mis quince años!";
    whatsappLinkDiv.innerHTML = ""; // No se muestra enlace para quienes asisten
  } else {
    mensajeGracias.textContent = "Lamento que no puedas asistir.";
    detalleGracias.textContent = "Espero verte en otra ocasión. ¡Gracias por avisarme!";
    // Enlace a WhatsApp. Reemplaza el número (en este ejemplo: 1234567890) y el mensaje según sea necesario.
    whatsappLinkDiv.innerHTML = '<p><a href="https://wa.me/59893564232?text=Hola%20Luciana,%20quisiera%20hablar%20contigo" target="_blank">Contacta a Luciana por WhatsApp</a></p>';
  }

  document.getElementById("pagina2").style.display = "none";
  document.getElementById("pagina4").style.display = "block";
}

// Asignar eventos a botones e inputs
document.getElementById("continuarBtn").addEventListener("click", buscarInvitado);
document.getElementById("confirmarBtn").addEventListener("click", guardarConfirmacion);
document.querySelectorAll('input[name="asistencia"]').forEach(input => {
  input.addEventListener("change", actualizarCampos);
});
