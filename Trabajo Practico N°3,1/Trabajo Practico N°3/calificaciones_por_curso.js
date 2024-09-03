//Funcion para dibujar el grafico de comparativa de niveles de calificaciones por curso.
function drawComparativeGradesChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Curso');
    data.addColumn('number', 'Aprobados');
    data.addColumn('number', 'Desaprobados');

    for (let i = 0; i < calificaciones.length; i++) {
        data.addRow([calificaciones[i].curso, calificaciones[i].aprobados, calificaciones[i].desaprobados]);
    }

    const options = {
        title: 'Comparativa de niveles de calificaciones por curso',
        isStacked: true,
        hAxis: {
            title: 'Cursos'
        },
        vAxis: {
            title: 'Número de estudiantes'
        },
        chartArea: { width: '60%', height: '60%' },
        colors: ['#2196f3', '#ff0000'],
    };

    const chart = new google.visualization.AreaChart(document.getElementById('calificaciones-por-curso'));
    chart.draw(data, options);
}