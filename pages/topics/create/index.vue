<template>
	<div class="container col-md-6 mt-4">
		<div class="">
			<h2>Create New Topic</h2>
			<br>
			<form @submit.prevent="create">
				<div class="form-group">
					<label>Title</label>
					<input type="text" v-model="topic.title" class="form-control" placeholder="Enter Title">
					<small class="form-text text-danger" v-if="errors.title">{{ errors.title[0] }}</small>
				</div>
				<div class="form-group">
					<label>Post</label>
					<textarea v-model="topic.body" class="form-control" rows="5"></textarea>
					<small class="form-text text-danger" v-if="errors.body">{{ errors.body[0] }}</small>
				</div>
				<button type="submit" class="btn btn-outline-primary">Create</button>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		middleware: 'auth',

		data() {
			return {
				topic: {
					title: '',
					body: ''
				}
			}
		},
		methods: {
			async create() {
				try {
					const {data} = await this.$axios.$post('/topics', this.topic)

					this.$router.push("/topics")
				} catch(error) {
					// console.log(error);
					this.$store.dispatch('validations/setErrors', error.response.data.errors)
				}
			}
		}
	}
</script>