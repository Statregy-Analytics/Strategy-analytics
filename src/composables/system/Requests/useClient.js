import { api } from 'src/boot/axios';
import useNotify from 'src/composables/useNotify'
import { ref } from 'vue'
import { date } from 'quasar'

export default function useClient() {

  const usersClient = ref([])
  const client = ref([])

  const extractClient = ref([])
  const loading = ref()
  const { errorNotify, successNotify, multError } = useNotify()
  const getClient = async (id) => {
    loading.value = true
    const reponse = await api.get(`clients/${id}`).then((res) => {
      client.value = res.data.user
    }).catch((e) => {
      console.log(e)
      errorNotify('Erro ao pegar os usuarios');
    }).finally(() => {
      loading.value = false
    })



    // try {
    //   usersClient.value = reponse.data.clients
    //   // storeReport.setdata(reponse.data.reports)
    //   // console.log('report -> ', reponse)
    // } catch (e) {
    //   console.log(e)
    //   errorNotify('Erro ao pegar os usuarios');
    // } finally {
    //   loading.value = false
    // }
  }
  const getAllClient = async () => {
    loading.value = true
    try {
      const reponse = await api.get('clients')
      usersClient.value = reponse.data.clients
      // storeReport.setdata(reponse.data.reports)
      // console.log('report -> ', reponse)
    } catch (e) {
      console.log(e)
      errorNotify('Erro ao pegar os usuarios');
    } finally {
      loading.value = false
    }
  }
  const getExtract = async (user_id) => {
    loading.value = true
    await api.get(`extract/${user_id}`).then((e) => {
      e.data.extract
      extractClient.value = e.data.extract
    }).catch((e) => {
      multError(e.response.data.errors)
      console.log(e)
      errorNotify('Erro ao pegar o extrato do usuário');
    }).finally(() => {
      loading.value = false
    })
  }
  const setIncome = async (data) => {
    loading.value = true
    await api.put(`clients/investment`, data).then((e) => {
      successNotify(e.data.message, 18000)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }).catch((e) => {
      multError(e.response.data.errors)
      console.log(e)
      errorNotify('Erro ao pegar o adionar rendimento para o usuário');
    }).finally(() => {
      loading.value = false
    })
  }
  return {
    getClient,
    getAllClient,
    getExtract,
    setIncome,
    client,
    usersClient,
    loading,
    extractClient
  }
}
