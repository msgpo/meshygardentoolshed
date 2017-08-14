'use strict';

import meshyGardenChart from './lib/meshy-garden-chart';

document.body.onload = function () {
    if (meshyGardenConfig === undefined) {
        return;
    }
    if (!document.getElementById(meshyGardenConfig.containerId)) {
        return;
    }
    meshyGardenConfig.dataSource = "../meshygarden.tsv";
    meshyGardenChart.drawChart();
};
