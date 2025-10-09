const state = () => {
  return {
    securedLoan: "home",
    step_automobile: "valores",
    step_imovel: "valores",
    automobile: [
      { header: "De quanto você precisa?", step: "valores", component: "SelectValuesLayout", next: "motivo" },
      { header: "Motivo do Empréstimo", step: "motivo", component: "ReasonsLoanLayout", next: "info_inicial" },
      { header: "Informações iniciais", step: "info_inicial", component: "InfoBasicLoanLayout", next: "info_complementa" },
      { header: "Informações iniciais", step: "info_complementa", component: "InfoBasicAutoLoanLayout", next: "info_auto" },
      { header: "Informações do Veículo", step: "info_auto", component: "InfoAutoLoanLayout" },
      { header: "Documentações importantes", step: "document", component: "DocUploadLoanLayout" },
    ],
    imovel: [
      { header: "De quanto você precisa?", step: "valores", component: "SelectValuesLayout", next: "motivo" },
      { header: "Motivo do Empréstimo", step: "motivo", component: "ReasonsImovelLoanLayout", next: "info_inicial" },
      { header: "Informações iniciais", step: "info_inicial", component: "InfoBasicLoanLayout", next: "info_complementa" },
      { header: "Informações iniciais", step: "info_complementa", component: "InfoBasicImovelLoanLayout", next: "info_auto" },
      { header: "Informações do Imóvel", step: "info_auto", component: "InfoImovelLoanLayout" },
      { header: "Documentações importantes", step: "document", component: "DocUploadImovelLoanLayout" },
    ],
    property: {
      step: 1
    },
    consortium_automobile: [
      { header: "Simular por", step: "valores", component: "SelectValuesConsortiumLayout", next: "motivo" },
      { header: "Motivo do Empréstimo", step: "motivo", component: "ReasonsLoanLayout", next: "info_inicial" },
      { header: "Informações iniciais", step: "info_inicial", component: "InfoBasicLoanLayout", next: "info_complementa" },
      { header: "Informações iniciais", step: "info_complementa", component: "InfoBasicAutoLoanLayout", next: "info_auto" },
      { header: "Informações do Veículo", step: "info_auto", component: "InfoAutoLoanLayout" },
      { header: "Documentações importantes", step: "document", component: "DocUploadLoanLayout" },
    ],
    consortium_imovel: [
      { header: "Simular por", step: "valores", component: "SelectValuesConsortiumLayout", next: "motivo" },
    ],
    loan: {
      type: "",
      value_loan: 50000,
      value_loan_installments: 680,
      installments: 0,
      offer_select: "",
      offer_final: false,
      imovel_name: []
    },
    offers_layout: "text-imagem"
  };
};

export default state;
