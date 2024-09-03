let alumnos = [];

//Funcion que realiza una llamada a la API de estudiantes y devuelve una promesa que se resuelve con los datos de los estudiantes.
function buscarEstudiantesAPI() {
    return new Promise((resolve, reject) => {
        fetch('https://apidemo.geoeducacion.com.ar/api/testing/estudiantes/1')
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

//Funcion que llama a la API de estudiantes, guarda los datos en la variable 'alumnos' y luego dibuja el grafico de composicion del alumnado por nivel. 
function pedirEstudiantes() {
    buscarEstudiantesAPI()
        .then(response => {
            alumnos = response.data;
            drawStudentCompositionChart();
        })
        .catch(error => console.error(error.message));
}

//Funcion que dibuja un grafico de columnas para mostrar la composicion del alumnado por nivel.
function drawStudentCompositionChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Nivel');
    data.addColumn('number', 'Cantidad');

    const levels = {};

    for (let i = 0; i < alumnos.length; i++) {
        const nivel = alumnos[i].nivel;
        if (!levels[nivel]) {
            levels[nivel] = 0;
        }
        levels[nivel]++;
    }

    const niveles = Object.keys(levels);

    for (let i = 0; i < niveles.length; i++) {
        const nivel = niveles[i];
        data.addRow([nivel, levels[nivel]]);
    }

    const options = {
        title: 'Composición del alumnado por nivel',
        hAxis: { title: 'Nivel' },
        vAxis: { title: 'Cantidad' },
        chartArea: { width: '60%', height: '60%' },
        colors: ['#2196f3']
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('composicion-nivel'));
    chart.draw(data, options);
}