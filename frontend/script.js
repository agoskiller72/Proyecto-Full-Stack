
let reservasEstado = [];


function showMessage() {
  var message = document.getElementById("product-message");
  var product = document.getElementById("product").value;
  message.classList.add("hidden");


  if (product == "Cuatriciclo") {
    message.textContent = "Incluye casco para cuidarte de cualquier imprevisto!.";
    message.classList.remove("hidden");

  } 
  
  else if (product == "Jetsky") {

    message.textContent = "Incluye casco y chaleco para cuidarte de cualquier imprevisto!.";
    message.classList.remove("hidden");
  }
}


function addAnotherProduct() {
  var container = document.getElementById("reservation-container");
  var newForm = document.createElement("div");
  newForm.classList.add("product-form");
  newForm.innerHTML = `
    <label>Eligi un producto con el que te vas a divertir!:</label>
    <select onchange="showMessage()">
      <option value="">Elige uno</option>
      <option value="Jetsky">Jetsky</option>
      <option value="Cuatriciclo">Cuatriciclo</option>
      <option value="Surf">Surf</option>
      <option value="Buceo">Buceo</option>
    </select>
    <p class="hidden"></p>
    <label>Ingresa la cantidad de personas (máx. 2)!!!:</label>
    <input type="number" min="1" max="2" required>
    <label>Elegi una fecha:</label>
    <input type="date" required>
    <label>Elegi los horarios (máx. 3):</label>
    <select multiple size="6" required>
      <option value="8:00 AM">8:00 AM</option>
      <option value="8:30 AM">8:30 AM</option>
      <option value="9:00 AM">9:00 AM</option>
      <option value="9:30 AM">9:30 AM</option>
      <option value="10:00 AM">10:00 AM</option>
      <option value="10:30 AM">10:30 AM</option>
      <option value="11:00 AM">11:00 AM</option>
      <option value="11:30 AM">11:30 AM</option>
      <option value="12:00 PM">12:00 PM</option>
      <option value="12:30 PM">12:30 PM</option>
      <option value="1:00 PM">1:00 PM</option>
      <option value="1:30 PM">1:30 PM</option>
      <option value="2:00 PM">2:00 PM</option>
      <option value="2:30 PM">2:30 PM</option>
      <option value="3:00 PM">3:00 PM</option>
      <option value="3:30 PM">3:30 PM</option>
      <option value="4:00 PM">4:00 PM</option>
      <option value="4:30 PM">4:30 PM</option>
      <option value="5:00 PM">5:00 PM</option>
      <option value="5:30 PM">5:30 PM</option>
      <option value="6:00 PM">6:00 PM</option>
      <option value="6:30 PM">6:30 PM</option>
      <option value="7:00 PM">7:00 PM</option>
      <option value="7:30 PM">7:30 PM</option>
      <option value="8:00 PM">8:00 PM</option>
    </select>

  `;
//ESTO DEJARLO ASI COMO ESTA
  container.appendChild(newForm);
}


function confirmReservation() {
  var errorMessage = document.getElementById("error-message");
  var successMessage = document.getElementById("success-message");
  errorMessage.classList.add("hidden");
  successMessage.classList.add("hidden");

  var forms = document.querySelectorAll(".product-form");
  var reservations = [];

  forms.forEach(function(form) {
    var product = form.querySelector("select").value;

    var people = form.querySelector("input[type='number']").value;

    var date = form.querySelector("input[type='date']").value;

    var times = [];

    var timeSelect = form.querySelector("select[multiple]");

    for (var i = 0; i < timeSelect.options.length; i++) {

      if (timeSelect.options[i].selected) {
        times.push(timeSelect.options[i].value);
      }
    }

    if (!product || product == "") {
      errorMessage.textContent = "Elige un producto!!!!.";
      errorMessage.classList.remove("hidden");
      return;
    }
    if (!people || people < 1 || people > 2) {
      errorMessage.textContent = "Elige 1 o 2 personas!!!.";
      errorMessage.classList.remove("hidden");
      return;
    }
    if (!date) {
      errorMessage.textContent = "Elige una fecha!!!.";
      errorMessage.classList.remove("hidden");
      return;
    }
    if (times.length == 0 || times.length > 3) {
      errorMessage.textContent = "Elige de 1 a 3 horarios!!!.";
      errorMessage.classList.remove("hidden");
      return;
    }

    reservations.push({ product: product, people: people, date: date, times: times });
  });



  if (reservations.length > 0) {
    var data = { reservations: reservations };
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/reservations", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        if (request.status == 200 || request.status == 201) {
          var response = JSON.parse(request.responseText);
          successMessage.textContent = response.message;
          successMessage.classList.remove("hidden");
         
          reservasEstado = response.reservations.map(function(res) {
            res.pagado = false;
            res.descuentoWhatsapp = false;
            return res;
          });
          renderReservas();
        } else {
          var response = JSON.parse(request.responseText);
          errorMessage.textContent = response.message || "Error al guardar!!.";
          errorMessage.classList.remove("hidden");
        }
      }
    };
    request.send(JSON.stringify(data));
  }
}


function renderReservas() {
  var reservationsList = document.getElementById("reservations-list");
  reservationsList.innerHTML = "";
  reservasEstado.forEach(function(res, idx) {
  
    let descuento = reservasEstado.length > 1 ? 0.10 : 0;
    let descuentoWhatsapp = res.descuentoWhatsapp ? 0.5 : 0;
    let total = 120;
    if (descuentoWhatsapp) {
      total = total * 0.5; 
    } else if (descuento) {
      total = total * (1 - descuento);
    }

    let textoDescuento = '';
    if (descuentoWhatsapp) {
      textoDescuento = '<span style="color: green;">Reembolso: 50%</span>';
    } else if (descuento) {
      textoDescuento = 'Descuento: 10%';
    } else {
      textoDescuento = 'Descuento: 0%';
    }

    
    let btnDescuento = !res.descuentoWhatsapp
      ? `<button onclick="aplicarDescuentoWhatsapp(${idx})">Pone el código que se te envió por WhatsApp y recibi el 50% de descuento</button>`
      : '<span style="color: green;">¡reembolso aplicado!</span>';

    let soloFecha = res.date.substring(0,10);

    let primerHorario = res.times && res.times.length > 0 ? res.times[0] : null;

    let partesHora = primerHorario ? primerHorario.match(/(\d+):(\d+) (AM|PM)/) : null;

    if (!partesHora) {
      partesHora = ["", "12", "00", "AM"];
    }

    let hora24 = parseInt(partesHora[1]);
    let minutos = parseInt(partesHora[2]);
    let ampm = partesHora[3];

    if (ampm === "PM" && hora24 !== 12) hora24 += 12;
    if (ampm === "AM" && hora24 === 12) hora24 = 0;

    let fechaTurnoLocal = new Date(`${soloFecha}T${hora24.toString().padStart(2,"0")}:${minutos.toString().padStart(2,"0")}:00`);
    let ahora = new Date();
    let diferenciaHoras = (fechaTurnoLocal - ahora) / (1000 * 60 * 60);
    let puedeCancelar = diferenciaHoras > 2;

    let pagoHtml = res.pagado
      ? `<p style="color: green;">Pago confirmado, Muchisimas Gracias</p>`
      : `<p style="color: orange;">Pago pendiente</p>
         <button onclick="aprobarPago(${idx})">Aprobar pago</button>`;

    let cancelarBtn = puedeCancelar
      ? `<button id="cancel-${res._id}" onclick="cancelReservation('${res._id}')">Cancelar</button>`
      : `<button disabled style="background:#ccc;cursor:not-allowed;" title="Solo se puede cancelar hasta 2 horas antes del turno">Cancelar (no permitido)</button>`;

    var reservationHtml = `
      <div class="reservation" id="reserva-${idx}">
        <h2>Reserva: #${res._id}</h2>
        <p>Fecha: ${res.date}</p>
        <p>${textoDescuento}</p>
        <h3>Servicio:</h3>
        <div style="background-color: #E6F3FA; padding: 10px; border-radius: 5px;">
          <p>Producto: ${res.product}</p>
          <p>Fecha y horario: ${res.date}, ${res.times.join(", ")}</p>
          <p>Cantidad de personas: ${res.people}</p>
          <p>Precio: $${total.toFixed(2)}</p>
          <p style="color: red;">${puedeCancelar ? 'Cancelable' : 'No cancelable (menos de 2h)'}</p>
          <p>Incluye el seguro por tormenta(50% de reembolso!!!)</p>
          ${pagoHtml}
          ${btnDescuento}
        </div>
        ${cancelarBtn}
      </div>
    `;
    reservationsList.innerHTML += reservationHtml;
  });
}


function aprobarPago(idx) {
  let codigo = prompt("Ingresá el código del comprobante para aprobar el pago:");
  if (codigo === "1234") {
    reservasEstado[idx].pagado = true;
    alert("Pago aprobado!!!!!");
    renderReservas();
  } else {
    alert("Código incorrecto.");
  }
}


function aplicarDescuentoWhatsapp(idx) {
  let codigo = prompt("Pone el código que se te envió por WhatsApp:");
  if (codigo === "WAPP50") {
    reservasEstado[idx].descuentoWhatsapp = true;
    alert("Perfecto! En unos minutos se reembolsara lo que es debido");
    renderReservas();
  } else {
    alert("Código incorrecto.");
  }
}


function cancelReservation(bookingId) {
  var errorMessage = document.getElementById("error-message");
  var request = new XMLHttpRequest();
  request.open("DELETE", "http://localhost:3000/reservations/" + bookingId, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onreadystatechange = function() 
  
  {
    if (request.readyState == 4) {
      if (request.status == 200) {
        reservasEstado = reservasEstado.filter(function(res) {
          return res._id !== bookingId;
        });
        renderReservas();
      } else {
        var response = JSON.parse(request.responseText);
        errorMessage.textContent = response.message || "Error al cancelar.";
        errorMessage.classList.remove("hidden");
      }
    }
  };
  request.send();
}
