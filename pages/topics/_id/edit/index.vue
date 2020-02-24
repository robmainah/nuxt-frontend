<template>
	<div class="container col-md-6 mt-4">
		<div class="">
			<h2>Edit Topic</h2>
			<br>
			<form @submit.prevent="update">
				<div class="form-group">
					<label>Title</label>
					<input type="text" v-model="topic.title" class="form-control" placeholder="Enter Title">
					<small class="form-text text-danger" v-if="errors.title">{{ errors.title[0] }}</small>
				</div>
				<button type="submit" class="btn btn-outline-primary">Update</button>
			</form>
		</div>

		<div class="mt-5">
			<nuxt-link class="btn btn-outline-primary" to="/topics">Back to Topics </nuxt-link>
		</div>
	</div>
</template>

<script>
	export default {
		middleware: 'auth',
		async asyncData({$axios, params}) {
			try {
				const {data} = await $axios.$get(`/topics/${params.id}`)
				return {
					topic: data
				}
			} catch(e) {
				// statements
				console.log(e);
			}
		},
		data() {
			return {
				topic: {
					title: '',
				}
			}
		},
		methods: {
			async update() {
				try {
					const {data} = await this.$axios.$put(`/topics/${this.$route.params.id}`, this.topic)

					this.$router.push("/topics")
				} catch(error) {
					console.log(error);
					// this.$store.dispatch('validations/setErrors', error.response.data.errors)
				}
			}
		}
	}
</script>