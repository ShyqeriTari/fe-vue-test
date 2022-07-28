<template>
<div class="m-auto text-center border-container mt-5">
  <div class="d-flex flex-column">
    <h3 class="mt-3 text-primary">Sign In</h3>
    <input type="text" placeholder="Insert email..." ref="user_email" required class="w-70 m-auto mt-2">
    <input type="text" placeholder="Insert password..." ref="user_password" required class="w-70 m-auto mt-2">
    <button class="mt-3 mb-2 m-auto border-container bg-primary text-white" @click="submit">Submit</button>
    <span class="mb-3">Not registered? <router-link to="/SignUp">SignUp here</router-link></span>
  </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
export default{
  name: "SignIn",
  data() {
    return {
      
    }
  },
  methods: {
    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },
    async submit() {
      const postData = {
        email: this.$refs.user_email.value,
        password: this.$refs.user_password.value,
      };
      try {
        const res = await fetch(`http://localhost:3001/auth/login`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify(postData),
          
        });
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }
        const data = await res.json();
        console.log(data)
        localStorage.setItem("token", data.token)
        const router = useRouter()
        router.push('/Home')
        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          data: data,
        };
        this.postResult = this.fortmatResponse(result);
      } catch (err) {
        this.postResult = err.message;
        
      }
    }
  }
}
</script>


<style scoped>
.border-container{
  border: 1px solid blue;
  border-radius: 15px;
  width: 40%;
}
.w-70{
  width: 70%
}

a{
  text-decoration: none
}
</style>
