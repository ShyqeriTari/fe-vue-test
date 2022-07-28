<template>
<div class="border-container2 ms-auto text-center p-2 mt-2 me-2 pointer bg-primary text-white pointer" @click="this.$router.push('/Home')">Back home</div>
<div class="m-auto text-center border-container mt-5">
  <div class="d-flex flex-column">
    <h3 class="mt-3 text-primary">Create club</h3>
    <input type="text" placeholder="Insert name..." ref="user_name" required class="w-70 m-auto mt-2">
    <input type="text" placeholder="Insert image url..." ref="user_image" required class="w-70 m-auto mt-2">
    <button class="mt-3 mb-2 m-auto border-container bg-primary text-white" @click="submit">Submit</button>
  </div>
  </div>
</template>

<script>
export default{
  name: "ClubCreation",
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
        name: this.$refs.user_name.value,
        image: this.$refs.user_image.value,
      };
      try {
        const res = await fetch(`http://localhost:3001/auth/createClub`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
           'Authorization': `Bearer ${localStorage.token}`,
            
          },
          body: JSON.stringify(postData),
          
        });
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          alert("Wrong name or image url")
          throw new Error(message);
        }
        const data = await res.json();
        console.log(data)
          if(res.ok){
           this.$router.push('/Home')}
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

.border-container2{
  border: 1px solid blue;
  border-radius: 15px;
  width: 100px;
}
.pointer{
  cursor: pointer;
}
</style>
