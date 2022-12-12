function loadData() {
  let request = sendRequest("empresa/list", "GET", "");
  let table = document.getElementById("empresas-table");
  table.innerHTML = "";
  request.onload = function () {
    let data = request.response;
    console.log(data);
    data.forEach((element) => {
      table.innerHTML += `
                <tr>
                    <th>${element.idEmpresa}</th>
                    <td>${element.tipoEmpresa}</td>
                    <td>${element.nitEmpresa}</td>
                    <td>${element.ciudadEmpresa}</td>
                    <td>${element.telefonoEmpresa}</td>
                    <td>${element.emailEmpresa}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick='window.location = "form_empresas.html?id=${element.idEmpresa}"'>Editar</button>
                        <button type="button" class="btn btn-danger" onclick='deleteEmpresa(${element.idEmpresa})'>Eliminar</button>
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

function loadEmpresa(idEmpresa) {
  let request = sendRequest("empresa/list/" + idEmpresa, "GET", "");
  let tipo = document.getElementById("empresa-tipo");
  let nit = document.getElementById("empresa-nit");
  let ciudad = document.getElementById("empresa-ciudad");
  let telefono = document.getElementById("empresa-telefono");
  let email = document.getElementById("empresa-email");
  let id = document.getElementById("empresa-id");

  request.onload = function () {
    let data = request.response;
    id.value = data.idEmpresa;
    tipo.value = data.tipoEmpresa;
    nit.value = data.nitEmpresa;
    ciudad.value = data.ciudadEmpresa;
    telefono.value = data.telefonoEmpresa;
    email.value = data.emailEmpresa;
  };
  request.onerror = function () {
    alert("Error al recuperar los datos.");
  };
}

function deleteEmpresa(idEmpresa) {
  let request = sendRequest("empresa/" + idEmpresa, "DELETE", "");
  request.onload = function () {
    loadData();
  };
}

function saveEmpresa() {
  let tipo = document.getElementById("empresa-tipo").value;
  let nit = document.getElementById("empresa-nit").value;
  let ciudad = document.getElementById("empresa-ciudad").value;
  let telefono = document.getElementById("empresa-telefono").value;
  let email = document.getElementById("empresa-email").value;
  let id = document.getElementById("empresa-id").value;

  let data = {
    idEmpresa: id,
    tipoEmpresa: tipo,
    nitEmpresa: nit,
    ciudadEmpresa: ciudad,
    telefonoEmpresa: telefono,
    emailEmpresa: email,
  };

  let request = sendRequest("empresa/", id ? "PUT" : "POST", data);
  request.onload = function () {
    window.location = "empresas.html";
  };
  request.onerror = function () {
    alert("Error al guardar los cambios.");
  };
}
