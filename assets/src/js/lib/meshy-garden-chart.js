'use strict';

import moment from "moment";
import Chart from "chart.js";

const MeshyGardenChart = {
    httpGetAsync: (url, callback) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        };
        xhr.open("GET", url, true);
        xhr.send(null);
    },
    parseData: tsv => {
        const data = tsv.split("\n").map(row => row.split("\t"));
        const measurements = type => data
            .filter(elem => elem[0] === type)
            .map(elem => elem[1]);
        const formattedDate = data
            .filter(elem => elem[0] === "temp")
            .map(elem => moment.unix(elem[3] / 1000).format('MM/DD/YYYY HH:mm'));
        const config = {
            type: 'line',
            data: {
                labels: formattedDate,
                datasets: [
                    {
                        label: 'Temperature (C)',
                        yAxisID: 'tempC',
                        data: measurements('temp'),
                        backgroundColor: "rgba(153, 255, 51, .4)"
                    },
                    {
                        label: 'Temperature (F)',
                        yAxisID: 'tempF',
                        data: measurements('temp').map(t => 32 + (t / 5 * 9)),
                        backgroundColor: "rgba(51, 102, 0, .4)"
                    },
                    {
                        label: 'Humidity (%)',
                        yAxisID: 'humi',
                        data: measurements('humi'),
                        backgroundColor: "rgba(255, 51, 153, .4)"
                    },
                    {
                        label: 'Soil (%)',
                        yAxisID: 'soil',
                        data: measurements('soil'),
                        backgroundColor: "rgba(51, 153, 255,.4)"
                    }
                 ]
            },
            options: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 80,
                        fontColor: 'black'
                    }
                },
                scales: {
                    xAxes: [{
                        type: "time",
                        scaleLabel: {
                            display: true,
                            labelString: 'Time reported'
                        },
                        time: {
                            format: 'MM/DD/YYYY HH:mm'
                        }
                    }],
                    yAxes: [
                        {
                            id: "tempC",
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Temperature (C)'
                            },
                        },
                        {
                            id: "tempF",
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Temperature (F)'
                            },
                        },
                        {
                            id: "humi",
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Humidity %'
                            },
                        },
                        {
                            id: "soil",
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Soil %'
                            },
                        },
                    ]
                },
            }
        };
        const chart = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(chart, config);
    },
};

export default MeshyGardenChart;