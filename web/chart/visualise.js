// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    if (f) {
      var reader = new FileReader();
      reader.onload = function(e) {
	      var contents = e.target.result;
        alert( "Got the file.n"
              +"name: " + f.name + "n"
              +"type: " + f.type + "n"
              +"size: " + f.size + " bytesn"
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

function parseData(inputfile) {

        var ESParray = [];
        var chartType = document.getElementById("chartType");

        ESParray = tsvToArray(inputfile);

        var sensortype = ESParray.map(function(elem){
            return elem[0]
        });

        var data = ESParray.map(function(elem){
            return elem[2]
        });

        var temparray = ESParray.filter(function(elem){
            return elem[0] == "temp"
        });
        var tempdata = temparray.map(function(elem){
            return elem[2]
        });

        var humiarray = ESParray.filter(function(elem){
            return elem[0] == "humi"
        });
        var humidata = humiarray.map(function(elem){
            return elem[2]
        });

        var timevalue = temparray.map(function(elem){
            var dateString = moment.unix(elem[4]/1000).format('MM/DD/YYYY HH:mm');
            return dateString;
        });

        console.log(tempdata)

        sensortype  = sensortype.filter(function(elem, i, sensortype) {
                return sensortype.indexOf(elem) === i;
            }
        );

        sensortype.map(function(elem){
            var o = document.createElement("option");
            o.value = elem;
            o.text = elem;
            chartType.appendChild(o);
        });

        console.log(timevalue);
        console.log(sensortype);
        drawChart(timevalue, tempdata);
}


function tsvToArray (tsv) {
    rows  = tsv.split("\n");
    return rows.map(function (row) {
    	return row.split("\t");
    });
};

function httpGetAsync(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
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

function drawChart(x, y1){
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

select1.onchange = function() {
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
