let comunicados = [];

//Funcion para buscar los datos de comunicados desde la API.
function buscarComunicadosAPI() {
    return new Promise((resolve, reject) => {
        fetch('https://apidemo.geoeducacion.com.ar/api/testing/comunicados/1')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Hubo un error de red");
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

//Función para solicitar los datos de comunicados y dibujar la tabla y el gráfico indicador.
function pedirComunicados() {
    buscarComunicadosAPI()
        .then(response => {
            comunicados = response.data;
            drawCommunicationSendingSituation();
        })
        .catch(error => console.error(error.message));
}

//Función para dibujar el grafico de situación de envío de comunicados.
function drawCommunicationSendingSituation() {
    let total = 0;
    let entregados = 0;
    let pendientes = 0;
    let error = 0;

    for (let i = 0; i < comunicados.length; i++) {
        total += comunicados[i].total;
        entregados += comunicados[i].entregados;
        pendientes += comunicados[i].pendientes;
        error += comunicados[i].error;
    }

    // Crear la tabla utilizando Google Charts
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Estado');
    data.addColumn('number', 'Cantidad');

    data.addRows([
        ['Total', total],
        ['Entregados', entregados],
        ['Pendientes', pendientes],
        ['Error', error]
    ]);

    var table = new google.visualization.Table(document.getElementById('comunicados-table'));
    table.draw(data, { showRowNumber: true, width: '100%', height: '100%'});


    // Crear el gráfico indicador tipo "Gauge"
    var gaugeData = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Total', total],
        ['Entregados', entregados],
        ['Pendientes', pendientes],
        ['Error', error]
    ]);

    var gaugeOptions = {
        width: 500,
        height: 150,
        redFrom: 90,
        redTo: 100,
        yellowFrom: 75,
        yellowTo: 90,
        minorTicks: 5
    }

    var gaugeChart = new google.visualization.Gauge(document.getElementById('indicator_chart'));
    gaugeChart.draw(gaugeData, gaugeOptions);
}


