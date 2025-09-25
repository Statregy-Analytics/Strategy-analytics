const state = () => {
  return {
    table: {},
    navbar: {
      clock: true,
      theme: false
    },
    system: {
      theme: "bg-theme-2",
      color: "",
      coin_primary: "BRL",
      coin_secondary: "USD",
      language: "pt",
      time_zone: "America/Sao_Paulo"
    },
    dashboard: {
      publicity_contract: true,
      communication_position: "container",
      communication_left: false
    },
    drawerTheme: false,
    menuAdm: false,
    optionsCoin: [
      { label: "Real(BRL)", value: "BRL" },
      { label: "Dólar(USD)", value: "USD" },
      { label: "Euro(EUR)", value: "EUR" }
    ],
    optionsLanguage: [
      { label: "Português do Brasil (pt-BR)", value: "pt" },
      { label: "Inglês (en-US)", value: "en" },
      { label: "Espanhol (es-ES)", value: "es" }
    ],
    optionsTimeZone: [
      { label: "Brasilia, D.F.", value: "America/Sao_Paulo" },
      { label: "Nova Iorque, EUA", value: "America/New_York" }
    ]
  };
};

export default state;
