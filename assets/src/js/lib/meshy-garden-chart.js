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
        const tsvToArray = tsv => tsv.split("\n").map(row => row.split("\t"));
        const esp_array = tsvToArray(tsv);
        const temp = esp_array
            .filter(elem => elem[0] === "temp")
            .map(elem => elem[1]);
        const humi = esp_array
            .filter(elem => elem[0] === "humi")
            .map(elem => elem[1]);
        const timestamp = esp_array
            .map(elem => moment.unix(elem[3] / 1000).format('MM/DD/YYYY HH:mm'));
        const config = {
            type: 'line',
            data: {
                labels: timestamp,
                datasets: [{
                    label: 'temp',
                    data: temp,
                    backgroundColor: "rgba(153,255,51,0.4)"
                }/*, {
                 label: 'humidity',
                 data: y2,
                 backgroundColor: "rgba(255,153,0,0.4)"
                 }*/]
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
                        time: {
                            format: 'MM/DD/YYYY HH:mm'
                        }
                    }],
                },
            }
        };
        const chart = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(chart, config);
    },
};

export default MeshyGardenChart;
