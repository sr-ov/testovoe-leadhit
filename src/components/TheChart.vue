<script setup lang="ts">
import { chartData } from '@/chartData'
import { useChart } from '@/composables/useChart'

const data = chartData.map((el) => ({
	...el,
	date: new Date(el.date).getTime(),
}))

const { chartRef } = useChart(data)
</script>

<template>
	<div class="h-[500px] w-full bg-[#181818]" ref="chartRef"></div>
</template>

<style scoped></style>
