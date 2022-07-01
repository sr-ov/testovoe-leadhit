import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { LOCAL_STORAGE_KEY } from '@/constants'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/analytics',
			name: 'analytics',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AnalyticsView.vue'),
		},
	],
})

router.beforeEach(async (to) => {
	if (to.name === 'analytics') {
		if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
			return { name: 'home' }
		}
	}
})

export default router
