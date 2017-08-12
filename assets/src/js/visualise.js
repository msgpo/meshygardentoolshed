'use strict';

import MeshyGardenChart from './lib/meshy-garden-chart';

document.body.onload = () => MeshyGardenChart.httpGetAsync("../meshygarden.tsv", MeshyGardenChart.parseData);
