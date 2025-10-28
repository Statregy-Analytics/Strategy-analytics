
const actions = {
  setdata(payload) {
    this.data = payload
  },
  setEditaData(payload) {
    this.editData = payload
    this.isDirtyReport = Object.freeze({ ...payload })
  },
  incrementStepInvestimentHigh(payload) {
    this.stepHighPerfomance += payload;

  },
  decrementStepInvestimentHigh(payload) {
    this.stepHighPerfomance -= payload;
  },
  setHighPerfomanceTime(payload) {
    this.highPerfomance.time = payload
  },
  setHighPerfomanceObjective(payload) {
    this.highPerfomance.objective = payload
  },
  setHighPerfomanceModality(payload) {
    this.highPerfomance.modality = payload
  }
};

export default { ...actions };
