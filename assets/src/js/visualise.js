// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
}
else {
    alert('The File APIs are not fully supported in this browser.');
}

function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    const f = evt.target.files[0];
    const fileDisplayArea = document.getElementById('fileDisplayArea');
    if (f) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var contents = e.target.result;
            alert("Got the file.n"
                + "name: " + f.name + "n"
                + "type: " + f.type + "n"
                + "size: " + f.size + " bytesn"
                + "starts with: " + contents.substr(1, contents.indexOf("n"))
            );
            fileDisplayArea.innerText = reader.result;
            parseData(reader.result);
        }
        reader.readAsText(f);
    }
    else {
        alert("Failed to load file");
    }
}

function parseData(tsv) {
    const chartType = document.getElementById("chartType");
    const esp_array = tsvToArray(tsv);
    const sensor_type = esp_array
        .map((elem) => elem[0])
        .filter((elem, i, sensortype) => sensortype.indexOf(elem) === i);
    const temp = esp_array
        .filter((elem) => elem[0] === "temp")
        .map((elem) => elem[1]);
    const humi = esp_array
        .filter((elem) => elem[0] === "humi")
        .map((elem) => elem[1]);
    const timestamp = esp_array
        .filter((elem) => elem[0] === "temp")
        .map((elem) => moment.unix(elem[3] / 1000).format('MM/DD/YYYY HH:mm'));
    esp_array
        .map((elem) => elem[0])
        .filter((elem, i, sensortype) => sensortype.indexOf(elem) === i)
        .map(function (elem) {
            let o = document.createElement("option");
            o.value = elem;
            o.text = elem;
            chartType.appendChild(o);
        });
    drawChart(timestamp, temp);
}


function tsvToArray(tsv) {
    const rows = tsv.split("\n");
    return rows.map(function (row) {
        return row.split("\t");
    });
};

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
httpGetAsync("../meshygarden.tsv", parseData);

var chartOptions = {
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
    }
};

function drawChart(x, y1) {
    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: x,
            datasets: [{
                label: 'temp',
                data: y1,
                backgroundColor: "rgba(153,255,51,0.4)"
            }/*, {
             label: 'humidity',
             data: y2,
             backgroundColor: "rgba(255,153,0,0.4)"
             }*/]
        },
        options: chartOptions
    });

    var select1 = document.getElementById("select1");
    var select2 = document.getElementById("select2");

    select1.onchange = function () {
        // empty select2
        while (select2.firstChild) {
            select2.removeChild(select2.firstChild);
        }
        if (select1.selectedIndex == 0) {
            return;
        }
        for (var i = select1.selectedIndex; i < select1.options.length; i++) {
            var o = document.createElement("option");
            o.value = select1.options[i].value;
            o.text = select1.options[i].text;
            select2.appendChild(o);
        }
    }


}
