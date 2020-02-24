<template>
	<div class="container col-md-6 mt-4">
		<br>
		<h2>Login</h2>
		<br>
		<form @submit.prevent="login">
			<div class="form-group">
				<label>Email address</label>
				<input type="email" v-model="form.email" class="form-control" placeholder="Enter email">
				<small class="form-text text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
			</div>
			<div class="form-group">
				<label>Password</label>
				<input type="password" v-model="form.password" class="form-control" id="exampleInputPassword1" placeholder="Password">
				<small class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
			</div>
			<button type="submit" class="btn btn-outline-primary">Login</button>
		</form>
	</div>
</template>

<script>
	export default {
		middleware: 'guest',
		data () {
			return {
				form: {
					email: '',
					password: ''
				}
			}
		},
		methods: {
			async login() {
				try {
					await this.$auth.loginWith('local', {
						data: {
							email: this.form.email,
							password: this.form.password,
						}
					})

					this.$router.push({
						path: this.$route.query.redirect
					})
				} catch(error) {
					// console.log(error);
					this.$store.dispatch('validations/setErrors', error.response.data.errors)
				}
			}
		}
	}
</script>