import 'tippy.js/dist/tippy.css'
import VueTippy from 'vue-tippy'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(VueTippy, 
		{
			directive: 'tippy',
			component: 'tippy',
			theme: 'light',
			componentSingleton: 'tippy-singleton',
			defaultProps: {
				placement: 'auto-end',
				allowHTML: true,
				appendTo: () => document.body,
			},
		}
	)
})
