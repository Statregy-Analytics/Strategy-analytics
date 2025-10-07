
const actions = {
  setSecuredLoan(payload) {
    this.securedLoan = payload
  },
  setTypeLoan(payload) {
    this.loan.type = payload
  },
  setStepAutoMobile(payload) {
    this.step_automobile = payload
  },
  setReasonLoan(payload) {
    this.loan.reason = payload
  },
  setModelCar(payload) {
    this.loan.model_car = payload
  },
  setInstallments(payload) {
    this.loan.installments = payload
  },
  setLoanOfferSelect(payload) {
    this.loan.offer_select = payload
  }

};

export default { ...actions };
