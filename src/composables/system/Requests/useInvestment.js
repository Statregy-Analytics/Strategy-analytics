import useStates from 'src/composables/useStates';
import useNotify from '../../useNotify'
import { api, axios } from "boot/axios";
import { ref } from 'vue';

const INVESTMENT_EXPORT_CACHE_KEY = 'investment_export_cache';

export default function uuseInvestment() {

  const { showLoading, hideLoading } = useStates()
  const { errorNotify, successNotify, multError } = useNotify()
  const step = ref('Inicializando envio ....')


  const importInvestment = async (file) => {
    step.value = 'Enviando documentos ....'
    showLoading(step.value);
    let formData = new FormData();
    formData.append('file', file, file.name);
    try {
      const response = await api.post('investment/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      successNotify(response.data.message)

      setTimeout(() => {
        window.location.reload()
      }, 500)

    } catch (e) {
      if (e.response?.data?.errors) {
        multError(e.response.data.errors)
      } else {
        errorNotify(e.response?.data?.message || 'Erro ao importar investimentos');
      }
    } finally {
      hideLoading()
    }
  }
  const exportInvestment = async () => {
    step.value = 'Gerando arquivo de investimentos ....'
    showLoading(step.value)
    try {
      // Verifica se já existe um arquivo gerado hoje em cache
      const today = new Date().toISOString().slice(0, 10)
      let cached
      try {
        const raw = localStorage.getItem(INVESTMENT_EXPORT_CACHE_KEY)
        if (raw) {
          cached = JSON.parse(raw)
        }
      } catch (e) {
        cached = null
      }

      if (cached && cached.date === today && cached.downloadUrl) {
        const linkCached = document.createElement('a')
        linkCached.href = cached.downloadUrl
        linkCached.target = '_blank'
        if (cached.filename) {
          linkCached.setAttribute('download', cached.filename)
        }
        document.body.appendChild(linkCached)
        linkCached.click()
        document.body.removeChild(linkCached)

        successNotify('Usando arquivo já gerado hoje.')
        return
      }

      // A API está retornando um JSON com download_url e file_name
      const response = await api.get('investment/export')

      const downloadUrl = response.data.download_url || response.data.downloadUrl
      const filename = response.data.file_name || response.data.fileName || 'wallet-export.xlsx'

      if (!downloadUrl) {
        throw new Error('URL de download não encontrada na resposta da API')
      }

      const link = document.createElement('a')
      link.href = downloadUrl
      link.target = '_blank'
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // salva no cache para reutilizar no mesmo dia
      try {
        localStorage.setItem(INVESTMENT_EXPORT_CACHE_KEY, JSON.stringify({
          date: today,
          downloadUrl,
          filename
        }))
      } catch (e) {
        // se não conseguir salvar no localStorage, apenas ignora
      }

      successNotify('Arquivo exportado com sucesso.')
    } catch (e) {
      errorNotify(e.response?.data?.message || 'Erro ao exportar investimentos')
    } finally {
      hideLoading()
    }
  }

  return { importInvestment, exportInvestment }
}
