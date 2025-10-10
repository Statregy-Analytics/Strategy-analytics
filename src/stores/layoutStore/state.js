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
      coin_primary: "Real (BRL)",
      coin_secondary: "Dólar (USD)",
      language: "Português do Brasil (pt-BR)",
      time_zone: "Brasilia, D.F (GMT-3)"
    },
    dashboard: {
      publicity_contract: true,
      communication_position: "container",
      communication_left: false,
      view_wallet_value: true
    },
    drawerTheme: false,
    menuAdm: false,
    optionsCoin: [
      { label: "Real(BRL)", value: "Real (BRL)" },
      { label: "Dólar(USD)", value: "Dólar (USD)" },
      { label: "Euro (EUR)", value: "Euro (EUR)" },
    ],
    optionsLanguage: [
      { label: "Português do Brasil (pt-BR)", value: "pt" },
      { label: "Inglês (en-US)", value: "en" },
      { label: "Espanhol (es-ES)", value: "es" }
    ],
    optionsTimeZone: [
      { label: "Brasilia, D.F (GMT-3)", value: "America/Sao_Paulo", sigla: 'pt-BR', fuso: '(CMT-3)' },
      { label: "Nova Iorque, EUA", value: "America/New_York", sigla: 'en-US', fuso: '(CMT-5)' }
    ]
  };
};

export default state;
