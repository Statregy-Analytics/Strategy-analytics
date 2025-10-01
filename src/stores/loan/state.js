const state = () => {
  return {
    securedLoan: "home",
    step_automobile: "valores",
    automobile: [
      { header: "De quanto você precisa?", step: "valores", component: "SelectValuesLayout", next: "motivo" },
      { header: "Motivo do Empréstimo", step: "motivo", component: "ReasonsLoanLayout", next: "info_inicial" },
      { header: "Informações iniciais", step: "info_inicial", component: "InfoBasicLoanLayout", next: "info_complementa" },
      { header: "Informações iniciais", step: "info_complementa", component: "InfoBasicAutoLoanLayout", next: "info_auto" },
      { header: "Informações do Veículo", step: "info_auto", component: "InfoAutoLoanLayout" },
      { header: "", step: "document", component: "" }
    ],
    property: {
      step: 1
    },
    loan: {
      type: "",
      value_loan: 50000
    }
  };
};

export default state;
