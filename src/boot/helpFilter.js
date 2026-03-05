import { date } from 'quasar'

const filters = {
  price(input) {
    if (isNaN(input)) {
      return "-";
    }
    return "$" + input.toFixed(2);
  },
  /**
   * Converte para string de USA ou BR moeda
   * @param {number|string} value 
   * @param {Boolean} br
   * @returns String
   */
  currentValue(value, br) {
    if (br) {
      return `R$ ${value}`;
    }
    return `$ ${value}`;
  },
  dateFormatBr(value) {
    let dateCurrent = new Date(value + " 00:00:00")
    return date.formatDate(dateCurrent, "DD/MM/YYYY")
  },
  /**
   * Formata valores numericos
   * @param {number|float} value numero para ser convertido para formato ex.:2.999,00
   * @returns valor convertido para 2 casas decimais e pontuação de milhar
   */
  formatPartternCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  },
  /**
   * converte para dolar data 30/04/2025 $exchange
   * @param {String|Number} value valor que sera convertido para o cambio
   * @param {Number|null} exchange valor do câmbio para ser dividido no calculo
   */
  convertCoin(value, exchange = 5.50) {
    let normalizedValue = value;
    if (typeof normalizedValue === 'string') {
      normalizedValue = normalizedValue.replace(/\./g, '').replace(',', '.');
    }
    normalizedValue = Number(normalizedValue);

    const normalizedExchange = Number(exchange);
    const safeExchange = Number.isFinite(normalizedExchange) && normalizedExchange > 0
      ? normalizedExchange
      : 5.5;

    const converExchange = Number.isFinite(normalizedValue)
      ? normalizedValue / safeExchange
      : 0;

    return this.formatPartternCurrency(converExchange)
  },
  /**
   * conta principal verify
   * @param {String|Boolean} value 
   * @return "conta princapal" | ""
   */
  mainAccount(value) {
    let stringAccount = ''
    if (value) {
      stringAccount = 'Conta principal'
    }
    return stringAccount
  }

};
export default filters;
