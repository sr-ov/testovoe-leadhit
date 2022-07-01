import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAsync } from '@/composables/useAsync'
import { sendLeadhitSiteId } from '@/api'
import { ID_VALUE, LOCAL_STORAGE_KEY } from '@/constants'

export const useSendLeadhitSiteId = () => {
	const idValue = ref('')
	const router = useRouter()
	const { execute, status } = useAsync(sendLeadhitSiteId)

	const onSubmit = async () => {
		await execute(idValue.value)

		if (status.value === 'error') alert('произошла ошибка!!!')
		if (status.value !== 'success') return

		localStorage.setItem(LOCAL_STORAGE_KEY, ID_VALUE)
		router.push({ name: 'analytics' })
	}

	return {
		onSubmit,
		idValue,
		status,
	}
}
