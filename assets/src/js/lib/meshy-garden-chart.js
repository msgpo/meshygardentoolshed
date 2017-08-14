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
                        data: measurements('temp'),
                        backgroundColor: "rgba(153, 255, 51, .4)"
                    },
                    {
                        label: 'Humidity (%)',
                        data: measurements('humi'),
                        backgroundColor: "rgba(255, 51, 153, .4)"
                    },
                    {
                        label: 'Soil (%)',
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
                            labelString: 'Day / Time'
                        }
                        time: {
                            format: 'MM/DD/YYYY HH:mm'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        },
                    }]
                },
            }
        };
        const chart = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(chart, config);
    },
};

export default MeshyGardenChart;
