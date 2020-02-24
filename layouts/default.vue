<template>
  <div>
  	<Navbar/>
    <nuxt />
  </div>
</template>

<script>
	import Navbar from '@/layouts/navbar.vue'

	export default {
		components: {
			Navbar
		}
	}
</script>