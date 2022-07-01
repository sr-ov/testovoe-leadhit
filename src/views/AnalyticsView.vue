<script setup lang="ts">
import { ThePageTitle, TheChart } from '@/components'
</script>

<template>
	<main class="h-screen py-4 md:py-10 px-4 max-w-5xl mx-auto">
		<the-page-title class="mb-4 md:mb-10">Аналитика</the-page-title>

		<div>
			<h2 class="text-xl mb-6 md:mb-10">Аналитика по визитам</h2>
			<the-chart></the-chart>
		</div>
	</main>
</template>

<style></style>
