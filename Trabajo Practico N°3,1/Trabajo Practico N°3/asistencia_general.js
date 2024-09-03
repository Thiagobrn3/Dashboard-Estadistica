let asistencia = [];

//Funcion que realiza una llamada a la API de asistencia y devuelve una promesa que se resuelve con los datos de la asistencia de los estudiantes.
function buscarAsistenciaAPI() {
    return new Promise((resolve, reject) => {
        fetch('https://apidemo.geoeducacion.com.ar/api/testing/asistencia/1')
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

//Funcion que llama a la API de asistencia, guarda los datos en la variable 'asistencia' y luego dibuja el grafico de nivel de asistencia general.
function pedirAsistencia() {
    buscarAsistenciaAPI()
        .then(response => {
            asistencia = response.data;
            drawGeneralAttendanceChart();
            drawAttendanceComparisonChart();
        })
        .catch(error => console.error(error.message));
}

//Funcion que dibuja un grafico circular para mostrar el nivel de asistencia general.
function drawGeneralAttendanceChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Estado');
    data.addColumn('number', 'Cantidad');

    let presentes = 0;
    let ausentes = 0;

    for (let i = 0; i < asistencia.length; i++) {
        presentes = presentes + asistencia[i].presentes;
        ausentes = ausentes + asistencia[i].ausentes;
    }

    data.addRows([
        ['Presentes', presentes],
        ['Ausentes', ausentes]
    ]);

    const options = {
        title: 'Nivel de Asistencia General',
        is3D: true,
        chartArea: { width: '60%', height: '60%' },
        colors: ['#2196f3', '#ff0000'],
    };

    const chart = new google.visualization.PieChart(document.getElementById('asistencia-general'));
    chart.draw(data, options);
}
