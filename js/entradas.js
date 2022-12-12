function loadData() {
  let request = sendRequest("entrada/list", "GET", "");
  let table = document.getElementById("entradas-table");
  table.innerHTML = "";
  request.onload = function () {
    let data = request.response;
    console.log(data);
    data.forEach((element) => {
      table.innerHTML += `
                <tr>
                    <th>${element.idEntrada}</th>
                    <td>${element.codigoproductoEntrada}</td>
                    <td>${element.nombreproductoEntrada}</td>
                    <td>${element.cantidadEntrada}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick='window.location = "form_entradas.html?id=${element.idEntrada}"'>Editar</button>
                        <button type="button" class="btn btn-danger" onclick='deleteEntrada(${element.idEntrada})'>Eliminar</button>
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

function loadEntrada(idEntrada) {
  let request = sendRequest("entrada/list/" + idEntrada, "GET", "");
  let codigo = document.getElementById("entrada-codigo");
  let nombre = document.getElementById("entrada-nombre");
  let cantidad = document.getElementById("entrada-cantidad");
  let id = document.getElementById("entrada-id");

  request.onload = function () {
    let data = request.response;
    id.value = data.idEntrada;
    codigo.value = data.codigoproductoEntrada;
    nombre.value = data.nombreproductoEntrada;
    cantidad.value = data.cantidadEntrada;
  };
  request.onerror = function () {
    alert("Error al recuperar los datos.");
  };
}

function deleteEntrada(idEntrada) {
  let request = sendRequest("entrada/" + idEntrada, "DELETE", "");
  request.onload = function () {
    loadData();
  };
}

function saveEntrada() {
  let codigo = document.getElementById("entrada-codigo").value;
  let nombre = document.getElementById("entrada-nombre").value;
  let cantidad = document.getElementById("entrada-cantidad").value;
  let id = document.getElementById("entrada-id").value;

  let data = {
    idEntrada: id,
    codigoproductoEntrada: codigo,
    nombreproductoEntrada: nombre,
    cantidadEntrada: cantidad,
  };

  let request = sendRequest("entrada/", id ? "PUT" : "POST", data);
  request.onload = function () {
    window.location = "entradas.html";
  };
  request.onerror = function () {
    alert("Error al guardar los cambios.");
  };
}
