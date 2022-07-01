import { ref, type UnwrapRef } from 'vue'

export const useAsync = <T, E = string>(
	asyncFunction: (...args: any[]) => Promise<T>
) => {
	const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle')
	const value = ref<T | null>(null)
	const error = ref<E | null>(null)

	const execute = (...args: any[]) => {
		status.value = 'pending'
		value.value = null
		error.value = null

		return asyncFunction(...(args ? args : []))
			.then((response: T) => {
				value.value = response as UnwrapRef<T>
				status.value = 'success'
			})
			.catch((error: any) => {
				error.value = error
				status.value = 'error'
			})
	}

	return { execute, status, value, error }
}
