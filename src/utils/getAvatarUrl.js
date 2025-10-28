import { api } from 'src/boot/axios'

// Recebe um path retornado pelo backend (p.ex. "/storage/clients/...")
// e retorna uma URL absoluta adequada para uso em <img src="...">.
export default function getAvatarUrl(raw) {
    if (!raw) return ''
    try {
        if (typeof raw !== 'string') return ''
        // já é URL absoluta?
        if (/^https?:\/\//i.test(raw)) return raw
        // protocol-relative //host/path
        if (/^\/\//.test(raw)) return window.location.protocol + raw

        // Priorizar uma URL dedicada a storage (opcional)
        const storageEnv = process.env.STORAGE_URL || process.env.API_STORAGE || null
        if (storageEnv && /^https?:\/\//i.test(storageEnv)) {
            const s = storageEnv.replace(/\/$/, '')
            return `${s}${raw}`
        }

        const base = api?.defaults?.baseURL || process.env.API_URL || ''
        if (base && /^https?:\/\//i.test(base)) {
            // remover /api ou /api/ final para chegar na origem dos arquivos
            let origin = base.replace(/\/api\/?$/i, '').replace(/\/$/, '')
            origin = origin.replace('host.docker.internal', 'localhost')
            return `${origin}${raw}`
        }

        // fallback: retornar o path relativo
        return raw
    } catch (e) {
        return raw || ''
    }
}
