const getters = {
  installmentsValues: (state) => {
    if (state.selectedPay.length <= 0) {
      return 0
    }
    let valueSum = state.selectedPay.reduce((acc, item) => acc + item.valor, 0)
    return valueSum.toFixed(2)
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(valueSum);
  }
};
export default { ...getters };
