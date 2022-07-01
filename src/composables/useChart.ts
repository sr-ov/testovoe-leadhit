import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5locales_ru_RU from '@amcharts/amcharts5/locales/ru_RU'
import { ref, onMounted, shallowRef, onUnmounted } from 'vue'

export const useChart = (chartData: { date: number; visits: number }[]) => {
	const chartRef = ref<HTMLElement>()
	const chartRoot = shallowRef<am5.Root>()

	onMounted(() => {
		const root = am5.Root.new(chartRef.value as HTMLElement)
		root.locale = am5locales_ru_RU
		root.setThemes([am5themes_Animated.new(root)])
		root.interfaceColors.set('grid', am5.color('#181818'))
		root.interfaceColors.set('text', am5.color('#fff'))

		// Create chart
		// https://www.amcharts.com/docs/v5/charts/xy-chart/
		const chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panX: true,
				panY: true,
				wheelX: 'panX',
				wheelY: 'zoomX',
			})
		)

		chart.get('colors')!.set('colors', [am5.color('#9500fc')])

		// Create axes
		// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
		const xAxis = chart.xAxes.push(
			am5xy.DateAxis.new(root, {
				maxDeviation: 0.1,
				groupData: false,
				baseInterval: {
					timeUnit: 'day',
					count: 1,
				},
				renderer: am5xy.AxisRendererX.new(root, {
					minGridDistance: 100,
				}),
				tooltip: am5.Tooltip.new(root, {}),
			})
		)

		const yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				maxDeviation: 0.1,
				renderer: am5xy.AxisRendererY.new(root, {}),
			})
		)

		// Add series
		// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
		const series = chart.series.push(
			am5xy.LineSeries.new(root, {
				minBulletDistance: 10,
				xAxis,
				yAxis,
				valueYField: 'visits',
				valueXField: 'date',
				tooltip: am5.Tooltip.new(root, {
					pointerOrientation: 'horizontal',
					labelText: '{valueY}',
				}),
			})
		)

		series.data.setAll(chartData)
		series.fills.template.setAll({
			visible: true,
			fillOpacity: 0.3,
		})

		series.bullets.push(function () {
			return am5.Bullet.new(root, {
				sprite: am5.Circle.new(root, {
					radius: 5,
					fill: series.get('fill'),
					stroke: series.get('fill'),
					strokeWidth: 2,
				}),
			})
		})

		// Add cursor
		// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
		const cursor = chart.set(
			'cursor',
			am5xy.XYCursor.new(root, {
				xAxis,
			})
		)
		cursor.lineY.set('visible', false)

		chartRoot.value = root
	})

	onUnmounted(() => {
		chartRoot.value?.dispose()
	})

	return {
		chartRef,
		chartRoot,
	}
}
