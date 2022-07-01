import axios from 'axios'
import { API_KEY, API_URL, HEADER_KEY } from '@/constants'

const api = axios.create({
	baseURL: API_URL,
})

api.interceptors.request.use(
	function (config) {
		config.headers = {
			...config.headers,
			'Api-Key': API_KEY,
		}
		return config
	},
	function (error) {
		return Promise.reject(error)
	}
)

export const sendLeadhitSiteId = async (id: string) => {
	await api.get('', {
		headers: {
			[HEADER_KEY]: id,
		},
	})
}
