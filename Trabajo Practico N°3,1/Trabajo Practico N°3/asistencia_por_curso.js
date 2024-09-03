// Función que dibuja el gráfico de barras de comparación de niveles de asistencia por curso.
function drawAttendanceComparisonChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Curso');
    data.addColumn('number', 'Presentes');
    data.addColumn('number', 'Ausentes');

    asistencia.forEach(registro => {
        data.addRow([registro.curso, registro.presentes, registro.ausentes]);
    });

    const options = {
        title: 'Comparación de Niveles de Asistencia por Curso',
        hAxis: {
            title: 'Cantidad de Alumnos'
        },
        vAxis: {
            title: 'Cursos'
        },
        isStacked: true,
        colors: ['#2196f3', '#ff0000'],
        chartArea: { width: '60%', height: '60%' }
    };

    const chart = new google.visualization.BarChart(document.getElementById('asistencia-por-curso'));
    chart.draw(data, options);
}
