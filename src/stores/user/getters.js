
import { Cookies } from "quasar";
import useExtractHelpers from "src/composables/system/Helpers/useExtractHelpers";
const { addValues, formatCurrency } = useExtractHelpers()

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getters = {
  // doubleCount: (state) => state.counter * 2,
  getInvestiment: (state) => {
    return state.data.user_wallet.current_investment;
  },
  currentInvestimentSeries: (state) => (arraySeries) => {
    // console.log("Estou aqui", arraySeries);
    let investmentInitial = state.data.user_wallet.current_investment;
    const arrayReturn = [];
    for (let i = 0; i < arraySeries.length; i++) {
      let valueNew;
      let addValue;
      // console.log('valueinvestment', investmentInitial)
      addValue = arraySeries[i] * investmentInitial / 100;
      valueNew = investmentInitial + addValue;
      // console.log('addValue sem toFixed -> ', valueNew);
      arrayReturn.push(addValue.toFixed(2));
    }
    // console.log("array return -> ", arrayReturn);
    return arrayReturn;
  },

  expiration: (state) => {
    const dataLocal = JSON.parse(localStorage.getItem("SA_user"));

    if (dataLocal) {
      return dataLocal.expiration_date != null ? true : false;
    }
  },
  isClient: (state) => {
    return state.data.role_id == 3;
  },
  canAccess: (state) => {
    const can = JSON.parse(localStorage.getItem(Cookies.get("SA_token")))
    // console.log('vamos olha para o data -> ', state.data)
    state.abilities = can
    return (params) => can.includes(params)
  },
  menuAccess: (state) => (params) => {
    if (state.abilities.length > 0) {
      return state.abilities.includes('all-access') ?? state.abilities.includes(params)
    }
  },
  authEmailCode: (state) => {
    return state.data.email_verified_at;
  },
  /** 
   * Verificar se esta preenchido formulario para cria novo banco
  */
  verifyFieldAccountEdit: (state) => {
    if (state.accountEdit.name || state.accountEdit.bank || state.accountEdit.agency || state.accountEdit.number || state.accountEdit.nickname)
      return true
    return false
  },


  /**
   * soma disponivel para investir com o investido fazendo o saldo da carteira
   */
  setCurrentWallet: (state) => {
    const currentInvestment = toNumber(state.wallet?.current_investment);
    const currentBalance = toNumber(state.wallet?.current_balance);
    return addValues(currentInvestment, currentBalance)
  },
  /**
   * pegando valores formatado do valor de disponivel para investir
   */
  getAvailableToInvest: (state) => {
    return formatCurrency(toNumber(state.wallet?.current_balance))
  },

  /**
   * Pegando cortação do dollar a parte do campo current_loan(isso provisoriamente)
   * @param {*} state 
   * @returns 
   */
  getconvertCoin: (state) => {
    return toNumber(state.wallet?.current_loan, 5.5)
  },


  /**
   * pegando valores formatado do valor de patrimônio investido
   */
  getCurrentInvest: (state) => {
    return formatCurrency(toNumber(state.wallet?.current_investment))
  },
  /**
   * Valor investido em dólar com fallback de câmbio.
   */
  getCurrentInvestUsd: (state) => {
    const currentInvestment = toNumber(state.wallet?.current_investment);
    const exchange = toNumber(state.wallet?.current_loan, 5.5);
    const safeExchange = exchange > 0 ? exchange : 5.5;
    return formatCurrency(currentInvestment / safeExchange)
  },
  /**
   * pegando valores formatado do redimento do ultimo mês
   */
  getLastMonth: (state) => {
    return formatCurrency(toNumber(state.wallet?.last_month))
  },
  /**
   * pegando contrato emergencial
   */
  getEmergency: (state) => {
    if (state.data.user_incomes && state.data.user_incomes.length > 0) {
      const income = state.data.user_incomes.filter((e) => e.origin_name == "Reserva de emergência")
      return income[0]
    }
    return { value: "0.00", data_info: "", description: "Faça um reserva emergencial" }
  },
  /**
   * pegando contrato personalizado
   */
  getPersonalite: (state) => {
    if (state.data.user_incomes && state.data.user_incomes.length > 0) {
      const income = state.data.user_incomes.filter((e) => e.origin_name == "Investimento Personalizado")
      return income[0]
    }
    return null
  },
  /**
   * pegando expansão patrimonial
   */
  getExpansive: (state) => {
    if (state.data.user_incomes && state.data.user_incomes.length > 0) {
      const income = state.data.user_incomes.filter((e) => e.origin_name == "Expansão Patrimonial")
      return income[0]
    }
    return { value: "", data_info: "", description: "Ainda não está expandindo seu patrimônio?" }
  }

};

export default { ...getters };
