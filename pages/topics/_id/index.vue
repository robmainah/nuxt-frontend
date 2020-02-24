<template>
	<div class="container">
		<div class="bg-light py-3 mt-5 mb-2 px-2">
			<h2 class="display-3">{{ topic.title }}</h2>

			

			<p class="text-muted">Created by {{ topic.user.name }} on {{ topic.created_at }}</p>

			<div class="ml-5" v-for="(post, index) in topic.posts" :key="post.id">
				<h3>{{ post.body }}</h3>
				<!-- <h3><nuxt-link :to="{ name: 'topics-id-posts', params: {post: post.id} }">{{ post.body }}</nuxt-link></h3> -->

				<div v-if="authenticated">
					<div class="float-right" v-if="user.id === post.user.id">
						<nuxt-link class="btn btn-outline-primary" :to="{ name: 'topics-id-posts-post-edit', params: {post: post.id} }">Edit</nuxt-link>
						<a href="javascript:void(0)" class="btn btn-outline-danger" @click="deletePost(post.id)">Delete</a>
					</div>
				</div>

				<p class="text-muted">Written by {{ post.user.name }} on {{ post.created_at }}</p>
			</div>
		</div>

		<div class="mx-auto mt-4">
			<h2>Write New Post</h2>
			<br>
			<form @submit.prevent="create">
				<div class="form-group">
					<label><strong>Post Body</strong></label>
					<textarea v-model="post.body" class="form-control" rows="5"></textarea>
					<small class="form-text text-danger" v-if="errors.body">{{ errors.body[0] }}</small>
				</div>
				<button type="submit" class="btn btn-outline-primary">New Post</button>
			</form>
		</div>

		<div class="mt-5">
			<a class="btn btn-outline-primary" href="javascript:;" @click="$router.go(-1)">Back To Topics</a>
		</div>
	</div>
</template>

<script>
	export default {
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
				topic: '',
				post: {
					body: ''
				}
			}
		},
		methods: {
			async create() {
				try {
					const {data} = await this.$axios.$post(`/topics/${this.$route.params.id}/posts`, this.post)

					// this.$router.push(`/topics/${params.id}`)
					window.location.reload();
				} catch(error) {
					// console.log(error);
					this.$store.dispatch('validations/setErrors', error.response.data.errors)
				}
			},
			async deletePost(id) {
				await this.$axios.delete(`/topics/${this.$route.params.id}/posts/${id}`)
				// this.$router.push('/topics')
				window.location.reload();
			}
		}
	}
</script>