import { Notify } from 'quasar'

export default function useNotify() {
  // Usar Notify diretamente evita chamar inject() fora do setup
  const time = 2500;
  const actions = { icon: 'close', 'aria-label': 'Dismiss', color: "dark" }
  const pos = 'top'
  const successNotify = (message, getTime = time, posNotify = pos) => {
    Notify.create({
      type: 'positive',
      position: posNotify,
      message: message || 'Tudo certo!',
      actions: [actions],
      timeout: getTime
    })
  };
  const alternativeNotify = (message, getTime = time, posNotify = pos) => {
    Notify.create({
      color: 'primary',
      position: posNotify,
      message: message || 'Ops... precisamos recomeça.',
      actions: [actions],
      timeout: getTime
    })
  };

  const errorNotify = (message, getTime = time, posNotify = pos) => {
    Notify.create({
      type: 'negative',
      position: posNotify,
      message: message || 'Falha!',
      actions: [actions],
      timeout: getTime
    })
  };
  const infoNotify = (message, getTime = time, posNotify = pos) => {
    Notify.create({
      type: 'info',
      position: posNotify,
      message: message || 'Informação adquirida!',
      actions: [actions],
      timeout: getTime
    })
  };
  /**
   * 
   * @param {Array|object} obj erros que seram ixibidos um apos o outros
   * @param {number} getTime quantos segundos vai aparece a notificações
   */
  const multError = (obj, getTime = 1) => {
    // let qua = 2
    for (const key in obj) {
      getTime++
      let formatInt = parseInt(`${getTime}000`)
      errorNotify(obj[key], formatInt)
    }
  }

  return {
    errorNotify,
    successNotify,
    infoNotify,
    alternativeNotify,
    multError
  };
}
