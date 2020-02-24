<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="#">Systemia</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<nuxt-link class="nav-link" to="/">Home</nuxt-link>
					</li><li class="nav-item">
						<nuxt-link class="nav-link" to="/topics/create">Create</nuxt-link>
					</li>
					<li class="nav-item">
						<nuxt-link class="nav-link" to="/topics">Topics</nuxt-link>
					</li>
				</ul>

				<ul class="navbar-nav float-right" v-if="!authenticated">
					<li class="nav-item active">
						<nuxt-link class="nav-link" to="/login">Login</nuxt-link>
					</li><li class="nav-item active">
						<nuxt-link class="nav-link" to="/register">Register</nuxt-link>
					</li>
				</ul>

				<div class="navbar-nav ml-auto" v-if="authenticated">
					</li><li class="nav-item">
						<a class="nav-link">{{ user.name }}</a>
					</li>
					</li><li class="nav-item">
						<a class="nav-link" href="javascript:;" @click="logout">Logout</a>
					</li>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
	export default {
		methods: {
			logout(){
				this.$auth.logout()
			}
		}
	}
</script>