export default function({ $axios, store }) {
	$axios.onError(error => {
		if (error.response.status === 422) {
			// console.log("error -- - "+error);
			
		}
	})
}