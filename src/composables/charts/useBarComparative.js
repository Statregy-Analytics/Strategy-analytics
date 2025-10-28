import { computed, ref } from "vue";
export default function userBarComparative() {

  const barComparative = ref({
    theme: themeOptions,
    colors: ["#00A3FF", "#00F5D9", "#7438FF"],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      stackType: '100%',
      background: "transparent",
      toolbar: {
        show: true
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '40%',
      },
    },
    stroke: {
      width: 0,
    },
    xaxis: {
      categories: ["Renda Fixa", "Renda Variável", "Poupança", "Aposentadoria"],
      labels: {
        formatter: (val) => `${val}%`,
        style: {
          colors: "#a59b9bff"
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      min: 0,
      max: 100,
      tickAmount: 5,
      crosshairs: {
        show: false
      }
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    fill: {
      opacity: 1
    },
    grid: {
      borderColor: "transparent",
      strokeDashArray: 0.1,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {

        lines: {
          show: false
        }
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetX: 80,
      labels: {
        colors: ["#a59b9bff", "#a59b9bff", "#a59b9bff"],
        useSeriesColors: false,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 2
      }
    },
    yaxis: {
      labels: {
        align: 'left',
        style: {
          colors: ["#a59b9bff", "#a59b9bff", "#a59b9bff"],
        },
      },
      offsetX: 100,
      offsetY: 100,
      rotate: 10,
    },
    annotations: {
      xaxis: [
        {
          markers: {
            size: 10,
          }
        }
      ]
    }
  });

  return {
    barComparative
  }

}
