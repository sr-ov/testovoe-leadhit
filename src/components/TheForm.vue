<script setup lang="ts">
import {
	Field as VeeField,
	Form as VeeForm,
	ErrorMessage as VeeErrorMessage,
} from 'vee-validate'
import { isLength24 } from '@/utils/validationRules'
import { useSendLeadhitSiteId } from '@/composables/useSendLeadhitSiteId'

const { onSubmit, idValue } = useSendLeadhitSiteId()
</script>

<template>
	<VeeForm
		class="grid gap-6"
		action="/"
		v-slot="{ submitCount }"
		@submit="onSubmit"
	>
		<fieldset>
			<VeeField
				class="block w-full text-[#181818] p-2 rounded transition focus:ring-8 focus:outline-none focus:ring-[hsla(160,100%,37%,1)]"
				type="text"
				name="length-24"
				placeholder="Введите id сайта"
				:validateOnInput="Boolean(submitCount)"
				:validateOnBlur="false"
				:validateOnChange="false"
				:rules="[isLength24]"
				v-model="idValue"
			/>
			<VeeErrorMessage
				class="inline-block mt-1 text-red-400"
				name="length-24"
			></VeeErrorMessage>
		</fieldset>
		<fieldset>
			<button
				class="ring-2 rounded w-full transition hover:ring-8 ring-[hsla(160,100%,37%,1)] py-2"
				type="submit"
			>
				Войти
			</button>
		</fieldset>
	</VeeForm>
</template>

<style scoped></style>
