<template>
	<div class="container">
		<div class="bg-light py-3 mt-5 mb-2 px-2" v-for="(topic, index) in topics" :key="topic.id">
			<h2><nuxt-link :to="{ name: 'topics-id', params: {id: topic.id} }">{{ topic.title }}</nuxt-link></h2>
			
			<div v-if="authenticated">
				<div class="float-right" v-if="user.id === topic.user.id">
					<nuxt-link class="btn btn-outline-primary" :to="{ name: 'topics-id-edit', params: {id: topic.id} }">Edit</nuxt-link>
					<a href="javascript:void(0)" class="btn btn-outline-danger" @click="deleteTopic(topic.id)">Delete</a>
				</div>
			</div>
			<p class="text-muted">Created by {{ topic.user.name }} on {{ topic.created_at }}</p>

			<div class="ml-5" v-for="(post, index) in topic.posts" :key="post.id">
				<h3>{{ post.body }}</h3>
				<p class="text-muted">Written by {{ post.user.name }} on {{ post.created_at }}</p>
				<div class="btn btn-outline-primary ml-5 mb-2" @click="likePost(topic.id, post)">
					<span class="badge">{{ post.likes_count }}</span>
				</div>
			</div>
		</div>

		<nav class="my-4">
			<ul class="pagination justify-content-center">
				<li v-for="(key, value) in links" class="page-item">
					<a href="javascript:;" @click="loadMore(key)" class="page-link">{{ value }}</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
	export default {
		middleware: 'auth',
		async asyncData({ $axios }) {
			try {
				const {data, links} = await $axios.$get('/topics')
				return {
					topics: data,
					links
				}
			} catch(e) {
				// statements
				console.log(e);
			}
		},
		data() {
			return {
				topics: [],
				links: []
			}
		},
		methods: {
			async loadMore(key) {
				const {data, links} = await this.$axios.$get(key)
					this.topics = {...this.topics, ...data},
					this.links = {...this.links, ...links}
			},
			async deleteTopic(id) {
				await this.$axios.delete(`/topics/${id}`)
				// this.$router.push('/topics')
				window.location.reload();
			},
			async likePost(topicId, post) {
				const userFromVuex = this.$store.getters['user'];
				if (userFromVuex) {
					if (userFromVuex.id === post.user.id) {
						return alert("You cant like your post!!")
					}

					//check if user has liked the post
					if (post.users) {
						if(post.users.some(user => user.id === userFromVuex.id)) {
							alert("Already like the post")
						}
						else {
							await this.$axios.$post(`/topics/${topicId}/posts/${post.id}/likes`)
								.catch(error => console.log(error))
							let {data, links} = await this.$axios.$get(`/topics`)
							this.topics = data
							this.links = links
						}
					}
				}
				else {
					this.$router.push("/login");
				}
			}
		}
	}
</script>