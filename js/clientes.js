function loadData() {
  let request = sendRequest("cliente/list", "GET", "");
  let table = document.getElementById("clientes-table");
  table.innerHTML = "";
  request.onload = function () {
    let data = request.response;
    console.log(data);
    data.forEach((element) => {
      table.innerHTML += `
                <tr>
                    <th>${element.idCliente}</th>
                    <td>${element.documentoCliente}</td>
                    <td>${element.nombreCliente}</td>
                    <td>${element.ciudadCliente}</td>
                    <td>${element.direccionCliente}</td>
                    <td>${element.telefonoCliente}</td>
                    <td>${element.emailCliente}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick='window.location = "form_clientes.html?id=${element.idCliente}"'>Editar</button>
                        <button type="button" class="btn btn-danger" onclick='deleteCliente(${element.idCliente})'>Eliminar</button>
                    </td>
                </tr>

                `;
    });
  };
  request.onerror = function () {
    table.innerHTML = `
            <tr>
                <td colspan="6">Error al recuperar los datos.</td>
            </tr>
        `;
  };
}

function loadCliente(idCliente) {
  let request = sendRequest("cliente/list/" + idCliente, "GET", "");
  let documento = document.getElementById("cliente-documento");
  let nombre = document.getElementById("cliente-nombre");
  let ciudad = document.getElementById("cliente-ciudad");
  let direccion = document.getElementById("cliente-direccion");
  let telefono = document.getElementById("cliente-telefono");
  let email = document.getElementById("cliente-email");
  let id = document.getElementById("cliente-id");

  request.onload = function () {
    let data = request.response;
    id.value = data.idCliente;
    documento.value = data.documentoCliente;
    nombre.value = data.nombreCliente;
    ciudad.value = data.ciudadCliente;
    direccion.value = data.direccionCliente;
    telefono.value = data.telefonoCliente;
    email.value = data.emailCliente;
  };
  request.onerror = function () {
    alert("Error al recuperar los datos.");
  };
}

function deleteCliente(idCliente) {
  let request = sendRequest("cliente/" + idCliente, "DELETE", "");
  request.onload = function () {
    loadData();
  };
}

function saveCliente() {
  let documento = document.getElementById("cliente-documento").value;
  let nombre = document.getElementById("cliente-nombre").value;
  let ciudad = document.getElementById("cliente-ciudad").value;
  let direccion = document.getElementById("cliente-direccion").value;
  let telefono = document.getElementById("cliente-telefono").value;
  let email = document.getElementById("cliente-email").value;
  let id = document.getElementById("cliente-id").value;

  let data = {
    idCliente: id,
    documentoCliente: documento,
    nombreCliente: nombre,
    ciudadCliente: ciudad,
    direccionCliente: direccion,
    telefonoCliente: telefono,
    emailCliente: email,
  };

  let request = sendRequest("cliente/", id ? "PUT" : "POST", data);
  request.onload = function () {
    window.location = "clientes.html";
  };
  request.onerror = function () {
    alert("Error al guardar los cambios.");
  };
}
