let calificaciones = [];

//Funcion para buscar los datos de calificaciones desde la API.
function buscarCalificacionesAPI() {
    return new Promise((resolve, reject) => {
        fetch('https://apidemo.geoeducacion.com.ar/api/testing/calificaciones/1')
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

//Funcion para solicitar los datos de calificaciones y dibujar el grafico de nivel general.
function pedirCalificaciones() {
    buscarCalificacionesAPI()
        .then(response => {
            calificaciones = response.data;
            drawGeneralGradesChart();
            drawComparativeGradesChart();
        })
        .catch(error => console.error(error.message));
}

//Funcion para dibujar el grafico de columnas que muestra el nivel general de calificaciones en la institucion.
function drawGeneralGradesChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Curso');
    data.addColumn('number', 'Aprobados');
    data.addColumn('number', 'Desaprobados');

    for (let i = 0; i < calificaciones.length; i++) {
        data.addRow([calificaciones[i].curso, calificaciones[i].aprobados, calificaciones[i].desaprobados]);
    }

    const options = {
        title: 'Nivel general de calificaciones en la institución',
        hAxis: {
            title: 'Cursos'
        },
        vAxis: {
            title: 'Proporción'
        },
        chartArea: { width: '60%', height: '60%' },
        isStacked: true,
        colors: ['#2196f3', '#ff0000']

    };

    const chart = new google.visualization.ColumnChart(document.getElementById('calificaciones-general'));
    chart.draw(data, options);
}