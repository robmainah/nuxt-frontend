<template>
	<div class="container col-md-6 mt-4">
		<div class="">
			<h2>Edit Post</h2>
			<br>
			<form @submit.prevent="update">
				<div class="form-group">
					<label>Body</label>
					<textarea v-model="form.body" class="form-control" rows="5"></textarea>
					<small class="form-text text-danger" v-if="errors.body">{{ errors.body[0] }}</small>
				</div>
				<button type="submit" class="btn btn-outline-primary">Update</button>
			</form>
		</div>

		<div class="mt-5">
			<nuxt-link class="btn btn-outline-primary" to="/topics">Back</nuxt-link>
		</div>
	</div>
</template>

<script>
	export default {
		middleware: 'auth',
		async asyncData({$axios, params}) {
			try {
				const {data} = await $axios.$get(`/topics/${params.id}/posts/${params.post}`)
				return {
					form: data
				}
			} catch(e) {
				// statements
				console.log(e);
			}
		},
		data() {
			return {
				form: {
					body: '',
				}
			}
		},
		methods: {
			async update() {
				try {
					const {data} = await this.$axios.$put(`/topics/${this.$route.params.id}/posts/${this.$route.params.post}`, this.form)

					this.$router.push(`/topics/${this.$route.params.id}`);
				} catch(error) {
					console.log(error);
					// this.$store.dispatch('validations/setErrors', error.response.data.errors)
				}
			}
		}
	}
</script>