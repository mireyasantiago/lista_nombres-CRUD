var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");// se pone como variable global para poder acceder a ella

var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
    $(document).on('click', '.accion', eliminarTarea);// cuando se aplica despues de realizarse


};

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);// se saco la funcion para que se pueda ocupAR
  });
}

var crearTarea = function (tarea) {

  var plantillaFinal="";
  plantillaFinal += plantilla.replace("__name__", tarea.name).replace("__status__", tarea.status[0]).replace('__data__', tarea._id);
  $tasksList.append(plantillaFinal);//poner en donde se va imprimir con append para que aparesca el ultimo por que con html solo muestra el ultimo


  /*var nombre = tarea.name;
  var estado = tarea.status[0];
  // creamos la fila
  var $tr = $("<tr />");
  // creamos la celda del nombre
  var $nombreTd = $("<td />");
  $nombreTd.text(nombre);
  // creamos la celda del estado
  var $estadoTd = $("<td />");
  $estadoTd.text(estado);
  // agregamos las celdas a la fila
  $tr.append($nombreTd);
  $tr.append($estadoTd);
  // agregamos filas a la tabla
  $tasksList.append($tr);*/


  //console.log(tarea);
};

var plantilla= '<tr>'+
      '<td>__name__</td>' +
      '<td>__status__</td>' +
      '<td>' +
        '<a class="glyphicon glyphicon-plus " aria-hidden="true" ></a>' +
        '<a class="glyphicon glyphicon-remove accion" data-id=__data__ aria-hidden="true"></a>' +
        '<a class="glyphicon glyphicon-pencil " aria-hidden="true"></a>' +
      '</td>' +
    '</tr>';

var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
  });
};


var eliminarTarea= function(){
  $.ajax({  //o con jQuery.ajax
    url: api.url + $(this).data("id"),
    type: "DELETE",// para eliminar
    success: function (mensaje){
      $tasksList.html("");// para limpiar el contenedor
      cargarTareas();
    }
  })
}

$(document).ready(cargarPagina);
