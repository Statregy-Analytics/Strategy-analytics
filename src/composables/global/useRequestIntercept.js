import { api, axios } from "boot/axios";
import useNotify from "../useNotify";
export default function useRequestIntercept() {

  const { errorNotify, alternativeNotify } = useNotify()
  // CSRF não necessário - comentado
  // const urlCors = process.env.API_URL_CORS
  const setCors = async () => {
    // CSRF não necessário - função desabilitada
    console.log('CSRF protection disabled - not needed for this backend');
    // await api.get(urlCors)
    //   .then((response) => {
    //     console.log(response)
    //   })
    //   .catch((e) => {
    //     alternativeNotify('Desative o bloqueio de cookies para melhorar sua experiência e podemos armazenar informações essenciais. Não armazenamos dados sensiveis, muito menos coletamos seus dados.', 50000);
    //     console.log(e)
    //     errorNotify(e)
    //   })
    //   .finally(() => {
    //     // hideLoading();
    //   });
  };

  return {
    setCors
  }
}
