const state = () => {
  return {
    data: [],
    editData: {
      id: "",
    },
    isDirtyReport: {},
    stepHighPerfomance: 1,
    highPerfomance: {
      types: []
    }
  };
};

export default state;
