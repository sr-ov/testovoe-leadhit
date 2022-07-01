import { LENGTH_24 } from '@/constants'

export function isLength24(value: string): string | boolean {
	if (value && value.trim().length === LENGTH_24) {
		return true
	}

	return 'id сайта должен содержать 24 символа'
}
