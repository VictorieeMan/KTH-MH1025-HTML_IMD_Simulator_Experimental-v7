	// Code by VE 2023-01-25
	window.glolib = {} // Intended as a namespace for global varables.
  refresh_speed = 500;
  

// Source: https://codepen.io/apexcharts/pen/pxZKqL
window.Apex = {
  chart: {
    foreColor: "#fff",
    toolbar: {
      show: false
    }
  },
  colors: ["#FCCF31", "#17ead9", "#f02fc2"],
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: "#40475D"
  },
  xaxis: {
    axisTicks: {
      color: "#333"
    },
    axisBorder: {
      color: "#333"
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      gradientToColors: ["#F55555", "#6078ea", "#6094ea"]
    }
  },
  tooltip: {
    theme: "dark",
    x: {
      formatter: function (val) {
        return moment(new Date(val)).format("HH:mm:ss");
      }
    }
  },
  yaxis: {
    decimalsInFloat: 2,
    opposite: true,
    labels: {
      offsetX: -10
    },
    logarithmic: true
  }
};

var trigoStrength = 3;
var iteration = 11;

function getRangeRandom(yrange) {
  return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
}

function getNewData(baseval, yrange) {
  var newTime = baseval + 300000;
  return {
    x: newTime,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
  };
}


var optionsLine = {
  chart: {
    height: 350,
    type: "line",
    stacked: true,
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: refresh_speed
      }
    },
    dropShadow: {
      enabled: false,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22
    },
    events: {
      animationEnd: function (chartCtx) {
        const newData1 = chartCtx.w.config.series[0].data.slice();
        newData1.shift();
        const newData2 = chartCtx.w.config.series[1].data.slice();
        newData2.shift();
        window.setTimeout(function () {
          chartCtx.updateOptions(
            {
              series: [
                {
                  data: newData1
                }
                ,
                {
                  data: newData2
                }
              ],
              subtitle: { // Probably the rooling number in the upper right corner
                text: parseInt(getRandom() * Math.random()).toString()
              }
            },
            false,
            false
          );
        }, 300);
      }
    },
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: "straight",
    width: 4
  },
  yaxis: {
    min: -1,
    max: 1,
  },
  grid: {
    padding: {
      left: 0,
      right: 0
    }
  },
  markers: {
    size: 0,
    hover: {
      size: 0
    }
  },
  series: [
    {
      name: "dE",
      data: [[0,0]]
    }
    // Adding extra series is possible
    ,
    {
      name: "avgE_2048 - E",
      data: [[0,0]]
    }
  ],
  xaxis: {
    type: "datetime",
    range: 2700000
  },
  title: {
    text: "Processes: ",
    align: "left",
    style: {
      fontSize: "12px"
    }
  },
  // subtitle: {
  //   text: "20",
  //   floating: true,
  //   align: "right",
  //   offsetY: 0,
  //   style: {
  //     fontSize: "22px"
  //   }
  // },
  legend: {
    show: true,
    floating: true,
    horizontalAlign: "left",
    onItemClick: {
      toggleDataSeries: false
    },
    position: "top",
    offsetY: -33,
    offsetX: 60
  }
};

var chartLine = new ApexCharts(
  document.querySelector("#linechart"),
  optionsLine
);
chartLine.render();

window.setInterval(function () {
  iteration++;

// Bookmark, this is where the data is entered
if (glolib.running_bool){
  chartLine.updateSeries([
    {
      data: [
        ...chartLine.w.config.series[0].data,
        [chartLine.w.globals.maxX + 30000, glolib.totalE_Diff]
      ]
    }
    ,
    {
      data: [
        ...chartLine.w.config.series[1].data,
        [chartLine.w.globals.maxX + 30000, glolib.diffFromAvg_E]
      ]
    }
  ]);
}

}, refresh_speed); // Speed control