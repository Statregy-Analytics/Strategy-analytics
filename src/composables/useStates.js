import { Platform, useQuasar } from "quasar";
import { useUserStore } from "src/stores/user";
import { useRoute } from "vue-router";
export default function useStates() {
  const useStore = useUserStore()
  const route = useRoute()
  const $q = useQuasar()
  const ParttensLoading = {
    message: 'Doing something. Please Wait...',
    boxClass: 'bg-transparent',
    spinnerColor: 'primary'
  }
  const get = async (country) => {
    const states = {
      1: [
        "Gran Chaco",
        "Mesopotâmia",
        "Cuyo",
        "Pampas",
        "Litoral",
        "Patagonia",
        "Noroeste argentino",
      ],
      3: [
        "Nova Gales do Sul",
        "Queensland",
        "Austrália do Sul",
        "Tasmânia",
        "Victoria ",
        "Austrália Ocidental",
      ],
      2: [
        "AK: Alasca",
        "AL: Alabama",
        "AR: Arkansas",
        "AZ: Arizona",
        "CA: Califórnia",
        "CO: Colorado",
        "CT: Connecticut",
        "DE: Delaware",
        "FL: Flórida",
        "GA: Geórgia",
        "HI: Havaí",
        "IA: Iowa",
        "ID: Idaho",
        "IL: Illinois",
        "IN: Indiana",
        "KS: Kansas",
        "KY: Kentucky",
        "LA: Louisiana",
        "MA: Massachusetts",
        "MD: Maryland",
        "ME: Maine",
        "MI: Michigan",
        "MN: Minnesota",
        "MO: Missouri",
        "MS: Mississippi",
        "MT: Montana",
        "NC: Carolina do Norte",
        "ND: Dakota do Norte",
        "NE: Nebraska",
        "NH: Nova Hampshire",
        "NJ: Nova Jérsei",
        "NM: Novo México",
        "NV: Nevada",
        "NY: Nova Iorque",
        "OH: Ohio",
        "OK: Oklahoma",
        "OR: Oregon",
        "PA: Pensilvânia",
        "RI: Rhode Island",
        "SC: Carolina do Sul",
        "SD: Dakota do Sul",
        "TN: Tennessee",
        "TX: Texas",
        "UT: Utah",
        "VT: Vermont",
        "VA: Virgínia",
        "WA: Washington",
        "WI: Wisconsin",
        "WV: Virgínia Ocidental",
        "WY: Wyoming",
      ],

      4: [
        "Aveiro",
        "Beja",
        "Braga",
        "Bragança",
        "Castelo Branco",
        "Coimbra",
        "Évora",
        "Faro",
        "Guarda",
        "Leiria",
        "Lisboa",
        "Portalegre",
        "Porto",
        "Santarém",
        "Setúbal",
        "Viana do Castelo",
        "Vila Real",
        " Viseu ",
      ],
      0: [
        "Acre",
        "Alagoas",
        "Amapá",
        "Amazonas",
        "Bahia",
        "Ceará",
        "Distrito Federal",
        "Espírito Santo",
        "Goiás",
        "Maranhão",
        "Mato Grosso",
        "Mato Grosso do Sul",
        "Minas Gerais",
        "Pará",
        "Paraíba",
        "Paraná",
        "Pernambuco",
        "Piauí",
        "Rio de Janeiro",
        "Rio Grande do Norte",
        "Rio Grande do Sul",
        "Rondônia",
        "Roraima",
        "Santa Catarina",
        "São Paulo",
        "Sergipe",
        "Tocantins",
      ],
    };
    // console.log(states[country]);
    return states[country];
  };
  const dimension = (value) => {
    const valueHeight = window.innerHeight;
    let scaleValue;

    if (value <= 599) {
      scaleValue = 0.7;
    } else if (value >= 600 && value <= 1023) {
      scaleValue = valueHeight >= 1023 ? 1.6 : 0.8;
    } else if (value >= 1024 && value <= 1439) {
      scaleValue = valueHeight >= 700 ? 2 : 1.15;
    } else if (value >= 1440 && value <= 1919) {
      scaleValue = 1.17;
    } else if (value >= 1920 && 2250) {
      scaleValue = 1.8;
    } else if (value > 2250) {
      scaleValue = 1.6;
    }
    return scaleValue;
  };

  const dimensionHeight = (value) => {
    // const height = window.innerHeight;
    return value <= 800 ? "normal" : "ultra";
  };
  const viewport = () => {
    const viewHeight = window.innerHeight;
    const viewWidth = window.innerWidth;
    return { viewWidth, viewHeight };
  };
  const detectTablet = () => {
    let isTo = false;

    if (Platform.has.touch) {
      isTo = viewport().viewWidth >= 1080 ? true : false;
    }
    return isTo;
  };
  const redirectRouteForUser = async (role_id) => {
    const nameRoute = {
      1: {
        name: "inicio"
      },
      2: {
        name: "inicio"
      },
      3: {
        name: "inicio"
      }
    }
    console.log('rediredRoute ->', nameRoute[role_id].name)
    useStore.setRouteHome(nameRoute[role_id].name)
  }
  const showLoading = (
    message = ParttensLoading.message,
    boxClass = ParttensLoading.boxClass,
    spinnerColor = ParttensLoading.spinnerColor
  ) => {
    $q.loading.show({
      message: message,
      boxClass: boxClass,
      spinnerColor: spinnerColor
    })
  }
  /*
   * verificar se passou 5minutos
   * @param {string} date_at 
   * @return boolean
  */
  const compareMinutes = (date_at) => {
    const dateNow = new Date();
    const dateParse = new Date(date_at);
    const calcTime = dateNow.getTime() - dateParse.getTime()
    return calcTime > 300000
  }
  const hideLoading = () => {
    $q.loading.hide()
  }
  const typeLoanIcon = {
    "secured_automovel": "IconCar",
    "secured_imovel": "IconHome2",
    "consorcio": "IconPigMoney",
    "colateral": "IconCoins"
  }
  const administrationImage = {
    "Sicredi": "/icons/banks/sicredi.png",
    "Porto": "/icons/banks/porto.png",
    "Itau": "/icons/banks/itau.png",
    "Inter": "/icons/banks/inter.png",
  }
  return {
    typeLoanIcon,
    administrationImage,
    redirectRouteForUser,
    get,
    dimension,
    dimensionHeight,
    viewport,
    compareMinutes,
    detectTablet,
    showLoading,
    hideLoading
  };
}
