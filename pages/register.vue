<template>
	<div class="container col-md-6 mt-4">
		<br>
		<h2>Register</h2>
		<br>
		<form @submit.prevent="register">
			<div class="form-group">
				<label>Name</label>
				<input type="text" v-model="form.name" class="form-control" placeholder="Enter Name">
				<small class="form-text text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
			</div>
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
			<button type="submit" class="btn btn-outline-primary">Register</button>
		</form>
	</div>
</template>

<script>
// import axios from 'axios'

export default {

	data () {
		return {
			form: {
				name: '',
				email: '',
				password: ''
			}
		}
	},
	methods: {
		async register($axios) {
			try {
				let {data} = await this.$axios.post("/register", this.form)

				await this.$auth.loginWith('local', {
					data: {
						email: this.form.email,
						password: this.form.password,
					}
				})

			} catch(error) {
				this.$store.dispatch('validations/setErrors', error.response.data.errors)
			}
		}
	}
}
</script>