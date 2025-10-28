import { computed, ref } from "vue";
import { Dark } from "quasar";
import { useRouter } from "vue-router";
import { useLayoutStore } from "src/stores/layout";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";

export default function useCharts() {
  const dashboard = useLayoutStore().dashboard;
  const useStore = useUserStore()
  const { walletChart } = storeToRefs(useStore)
  // const months = ["JAN", "FEV", "MAR", "ABRIL", "MAI", "JUN", "JUL", "AGO"];
  const convertNumber = (num) => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    } else {
      return num.toString();
    }
  }
  const optionsTheme = () => {
    return Dark.isActive
      ? {
        mode: "dark",
        palette: "palette1",
        // monochrome: {
        //   enabled: false,
        //   color: "#255aee",
        //   shadeTo: "light",
        //   shadeIntensity: 0.65,
        // },
      }
      : {
        mode: "light",
        palette: "palette2",
        // monochrome: {
        //   enabled: false,
        //   color: "#255aee",
        //   shadeTo: "light",
        //   shadeIntensity: 0.65,
        // },
      };
  };

  const arrayWhite = ["gray", "gray", "gray", "gray", "gray", "gray", "gray"];
  const arrayDark = [
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
  ];

  const themeOptions = computed(() => optionsTheme());
  const colorText = computed(() => (Dark.isActive ? "#fff" : "#000"));
  const legendPosition = computed(() =>
    dashboard.screenViewWdth <= 1000 ? "top" : "right"
  );
  const mobileStyle = ref({
    style: {
      fontSize: "10px",
      fontWeight: "bold",
      fontFamily: "Inter",
      color: colorText,
    },
    margin: 30,
    toolbar: {
      offsetX: 30,
      offsetY: 30,
    },
  });
  const desktopStyle = ref({
    style: {
      fontSize: "12px",
      fontWeight: "bold",
      fontFamily: "Inter",
      color: colorText,
    },
    margin: 10,
    toolbar: {
      offsetX: 0,
      offsetY: 0,
    },
  });
  const titleStyle = computed(() =>
    dashboard.screenViewWdth <= 1000 ? mobileStyle.value : desktopStyle.value
  );
  const toolbarOptions = computed(() =>
    dashboard.screenViewWdth <= 1000
      ? mobileStyle.value.toolbar
      : desktopStyle.value.toolbar
  );
  const colorArray = computed(() => (Dark.isActive ? arrayDark : arrayWhite));
  const optionsComparative = ref({
    theme: themeOptions,
    colors: ["#00A3FF", "#E3F271", "#F08484"],
    legend: {
      show: false,
    },
    chart: {
      width: "100%",
      height: 150,
      background: "transparent",
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false, // Remove download/export options
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.1,
        opacityFrom: 0.5,
        opacityTo: 0.0,
        stops: [0, 100, 0]
      }
    },
    markers: {
      size: 2,
    },
    stroke: {
      curve: "smooth",
    },
    // title: {
    //   text: "Carteira",
    //   align: "center",
    //   margin: titleStyle.value.margin,
    //   style: titleStyle.value.style,
    // },
    grid: {
      show: false,
      row: {
        colors: ["transparent"], // takes an array which will be repeated on columns
        opacity: 1,
      },
      yaxis: {
        lines: {
          show: true,
        }
      },
    },
    xaxis: {
      crosshairs: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      tickPlacement: "center",
      labels: {
        style: {
          colors: "#989898",
          fontSize: "8px",
          fontFamily: "Inter",
          fontWeight: 600,
        },
      },
      categories: [
        "jan.",
        "fev.",
        "mar.",
        "abr.",
        "mai.",
        "jun.",
        "jul.",
        "ago.",
        "set.",
        "out.",
        "nov.",
        "dez.",
      ],
    },
    yaxis: {
      opposite: true,
      min: 0,
      max: 1100000,
      labels: {
        align: "left",
        formatter: (value) => {
          return `${convertNumber(value)}`;
        },
        style: {
          colors: "#989898",
          fontSize: "8px",
          fontFamily: "Inter",
          fontWeight: 600,
        },
      },
    },
  });
  const optionsContractComparative = ref({
    theme: themeOptions,
    legend: {
      show: false,
    },
    colors: ["#00A3FF", "#00F5D9", "#7438FF"],
    chart: {
      width: "100%",
      height: 100,
      background: "transparent",
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false, // Remove download/export options
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    // title: {
    //   text: "Carteira",
    //   align: "center",
    //   margin: titleStyle.value.margin,
    //   style: titleStyle.value.style,
    // },
    grid: {
      show: false,
      row: {
        colors: ["transparent"], // takes an array which will be repeated on columns
        opacity: 1,
      },
      yaxis: {
        lines: {
          show: true,
        }
      },
    },
    xaxis: {
      crosshairs: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      tickPlacement: "center",
      labels: {
        style: {
          colors: "#989898",
          fontSize: "8px",
          fontFamily: "Inter",
          fontWeight: 600,
        },
      },
      categories: [
        "jun.",
        "jul.",
        "ago.",
        "set.",
        "out.",
        "nov.",
        "dez.",
        "2025",
        "fev.",
        "mar.",
        "abr.",
        "mai.",
        "jun."
      ],
    },
    yaxis: {
      opposite: true,
      min: 0,
      max: 210000,
      labels: {
        align: "left",
        formatter: (value) => {
          return `${convertNumber(value)}`;
        },
        style: {
          colors: "#989898",
          fontSize: "8px",
          fontFamily: "Inter",
          fontWeight: 600,
        },
      },
    },
  });

  const optionsYield = ref({
    theme: themeOptions,
    legend: { position: "top", fontFamily: "Inter" },
    colors: ["#2E93fA", "#E91E63"],
    chart: {
      background: "transparent",
      height: 350,
      type: "line",
      toolbar: toolbarOptions,
    },
    stroke: {
      width: [0, 10],
    },
    title: {
      text: "Rendimentos de dividendos da Carteira",
      align: "left",
      margin: titleStyle.value.margin,
      style: titleStyle.value.style,
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [],
    },
    labels: [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ],

    yaxis: [
      {
        // opposite: true,
        labels: {
          align: "left",
          formatter: (value) => {
            return `0,${value}%`;
          },
          style: {
            fontFamily: "Inter",
            color: colorText,
          },
        },
      },
    ],
  });
  const optionsAssetsClass = ref({
    theme: themeOptions,
    colors: ["#2E93fA", "#001"],
    chart: {
      background: "transparent",
      width: 380,
      type: "pie",
    },
    labels: ["EUA", "Blockchain"],
    title: {
      text: "Ativos classes",
      align: "left",
      margin: titleStyle.value.margin,
      style: titleStyle.value.style,
    },
    responsive: [
      {
        // breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
          style: {
            color: colorText,
          },
        },
      },
    ],
  });

  const optionsAssetRisks = ref({
    theme: themeOptions,
    chart: {
      background: "transparent",
      colors: ["#2E93fA", "yellow", "orange", "orange", "orange", "orange"],
      width: 380,
      type: "pie",
    },
    labels: ["TLT", "Dólar", "Aave", "ChainLink", "Etherum", "Unisawp"],
    title: {
      text: "Gerenciamento de risco",
      align: "left",
      margin: titleStyle.value.margin,
      style: titleStyle.value.style,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
          style: {
            color: colorText,
          },
        },
      },
    ],
  });

  //pontos
  const addPoints = (valueNumber) => {
    let numberString = valueNumber.toString();

    let group = [];

    for (var i = numberString.length; i > 0; i -= 3) {
      group.unshift(numberString.substring(Math.max(0, i - 3), i));
    }
    // console.log('Aqui o addPoints', group.join("."));
    return group.join(".");
  };
  //no title
  const walletOption = ref({
    theme: {
      mode: 'dark',
      palette: 'palette1'
    },
    chart: {
      background: "transparent",
      height: 250,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false
      },
      // Configurações de animação adicionadas
      animations: {
        enabled: true,
        easing: 'easein', // ou 'linear', 'easeout', 'easein'
        speed: 2800, // velocidade da animação em ms (quanto maior, mais lento)
        animateGradually: {
          enabled: true,
          delay: 3050 // delay entre cada ponto/série
        },
        dynamicAnimation: {
          enabled: true,
          speed: 15350
        }
      },
      foreColor: 'transparent'

    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 4
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        opacityFrom: 0.5,
        opacityTo: 0,
      }
    },
    colors: ["#00A3FF"],
    legend: {
      fontSize: '56px',
      labels: {
        colors: ["#eee"],
        useSeriesColors: false,
      },
    },
    grid: {
      borderColor: '#3D3D3D',
      row: {
        colors: ["transparent"],
        opacity: 0.4,
      },
      yaxis: {
        lines: {
          show: true,
        }
      },
    },
    xaxis: {
      crosshairs: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      tickPlacement: "center",
      labels: {
        style: {
          colors: "#989898",
          fontSize: "12px",
          fontFamily: "Inter",
          fontWeight: 600,
        },
      },
      categories: ["JAN", "FEV", "MAR", "ABRIL", "MAI", "JUN", "JUL", "AGO"],
      animations: {
        enabled: true,
        speed: 1800,
        animateGradually: {
          enabled: true,
          delay: 1350
        }
      }
    },
    yaxis: {
      opposite: true,
      min: 40000,
      max: 80000,
      labels: {
        align: "left",
        formatter: (value) => {
          return ` ${convertNumber(value)}`;
        },
        style: {
          fontSize: "12px",
          colors: "#eee",
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => {
          return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(value);
        }
      }
    }
  });
  const walletOptionCurrent = ref({
    theme: themeOptions,
    chart: {
      background: "transparent",
      height: 250,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    // title: {
    //   text: "Product Trends by Month",
    //   align: "center",
    // },
    legend: {
      labels: {
        colors: ["#000"],
        useSeriesColors: false,
      },
    },
    grid: {
      row: {
        colors: ["#fff", "transparent"], // takes an array which will be repeated on columns
        opacity: 1,
      },
    },
    xaxis: {
      tickPlacement: "center",
      labels: {
        style: {
          colors: colorArray,
          fontSize: "8px",
          fontWeight: 600,
        },
      },
      categories: [
        "JAN",
        "FEV",
        "MAR",
        "ABRIL",
        "MAI",
        "JUN",
        "JUL",
        "AGO",
      ],
    },
    yaxis: {
      opposite: true,
      min: 0,
      // max: 50,
      labels: {
        align: "left",
        formatter: (value) => {
          let numberNew = value.toFixed(2);
          // let numberNew = addPoints(value);
          return `R$ ${numberNew}`;
        },
        style: {
          colors: colorArray,
        },
      },
    },
  });
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
      borderColor: "#fff",
      strokeDashArray: 0.1,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
    },
    legend: {
      show: false,
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
  });

  const barColumnComparative = ref({
    theme: themeOptions,
    colors: ["#00A3FF", "#00F5D9", "#7438FF"],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      background: "transparent",
      toolbar: {
        show: false
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '25%',
      },
      colors: {
        ranges: [{
          from: 0,
          to: 0,
          color: undefined
        }],
        backgroundBarColors: ['transparent', 'transparent', 'transparent'],
        backgroundBarOpacity: 1,
        backgroundBarRadius: 0,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        }
      },
      active: {
        allowMultipleDataPointsSelection: true,
        filter: {
          type: 'none',
        }
      },
    },
    stroke: {
      width: 0,
    },
    xaxis: {
      categories: ["JAN. 25", "FEB. 25", "MAR. 25", "APR. 25", "MAY. 25", "JUN. 25", "JUL. 25", "AUG. 25", "SEP. 25", "OCT. 25", "NOV. 25", "DEC. 25",
        "JAN. 26", "FEB. 26", "MAR. 26"],
      // categories: [2008, 2009, 2010, 2011],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
    },
    goals: {
      me: 'Expected',
      value: 50,
      strokeHeight: 3,
      strokeColor: '#ff0008'
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 0.1,
    },
    tooltip: {
      show: false,
      y: {
        formatter: function (val) {
          return val + "%"
        }
      }
    },
    fill: {
      opacity: 1

    },
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'right',
      offsetX: 80,
      labels: {
        show: false,
        colors: ["#a59b9bff", "#a59b9bff", "#a59b9bff"],
        useSeriesColors: false,
      }
    },
    yaxis: {
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          align: "left",
          colors: ["#a59b9bff", "#a59b9bff", "#a59b9bff"],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    annotations: {
      yaxis: [
        {
          y: 50, // valor da média
          borderColor: '#FF991F',
          borderWidth: 3,
          label: {
            borderColor: '#ff0008',
            style: {
              color: '#fff',
              background: '#ff0008'
            },
            text: 'Média'
          }
        }
      ]
    }

  })

  return {
    walletOption,
    optionsComparative,
    optionsYield,
    optionsAssetsClass,
    optionsAssetRisks,
    walletOptionCurrent,
    optionsContractComparative,
    barComparative,
    barColumnComparative
  };
}
