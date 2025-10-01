
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
  }

};

export default { ...actions };
