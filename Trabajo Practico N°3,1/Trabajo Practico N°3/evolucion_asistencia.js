let historialAsistencia = [];

//Funcion para buscar el historial de asistencia desde la API.
function buscarHistorialAsistenciaAPI() {
    return new Promise((resolve, reject) => {
        fetch('https://apidemo.geoeducacion.com.ar/api/testing/historial_asistencia/1')
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

//Funcion para solicitar el historial de asistencia y dibujar el grafico de evolucion anual.
function pedirHistorialAsistencia() {
    buscarHistorialAsistenciaAPI()
        .then(response => {
            historialAsistencia = response.data;

            drawAttendanceHistoryChart();
        })
        .catch(error => console.error(error.message));
}

//Funcion que dibuja el grafico de anillo para mostrar la evolución anual de nivel de asistencia por mes.
function drawAttendanceHistoryChart() {
    const dataArray = [
        ['Mes', 'Asistencia']
    ];
    for (let i = 0; i < historialAsistencia.length; i++) {
        dataArray[i + 1] = [historialAsistencia[i].mes, historialAsistencia[i].asistencia];
    }
    const dataTable = google.visualization.arrayToDataTable(dataArray);


    const options = {
        title: 'Evolución Anual de Nivel de Asistencia por Mes',

        pieHole: 0.4,
        pieSliceText: 'percentage',
        colors: ['#8AD1C2', '#9F8AD1', '#D18A99', '#D1B78A', '#F40853', '#0808F4', '#F4E208', '#08F441', '#08b0F4', '#5B6264'],
        chartArea: { width: '60%', height: '65%' }
    };

    const chart = new google.visualization.PieChart(document.getElementById('evolucion-asistencia'));
    chart.draw(dataTable, options);
}
