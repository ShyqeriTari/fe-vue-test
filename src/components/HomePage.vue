<template>
<div class="d-flex justify-content-end">
<div class="border-container text-center p-2 mt-2 me-2 pointer bg-primary text-white" @click="this.$router.push('/ClubCreation')">Add club</div>
<div class="border-container text-center p-2 mt-2 me-2 pointer" @click="remove" >Logout</div>
</div>

<h1 class="text-primary text-center ">Clubs</h1>

<div>
  <div class="img-container">
  <img src="" /> 
  </div>
</div>


  <div class="row">
<div v-for="club in clubs" :key="club._id"  class="card col-4 ms-3 mb-3" style="width: 12rem;">
<div class="image-container mb-3" style="height: 250px;">
  <img class="card-img-top" :src="club.image" alt="Card image cap">
  </div>
  <div class="card-body">
    <p class="card-text">{{club.name}}</p>
  </div>
</div>
</div>
</template>

<script>
export default {
  data(){
  return {clubs : []}
},
  name: 'HomePage',
  props: {
    msg: String
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
    });
  },
  methods:{remove(){
    localStorage.removeItem("token")
    this.$router.push('/')
  },
  async getData(){
     try {
        const res = await fetch(`${process.env.VUE_APP_BE_URL}/auth/getClubs`, {
          method: "get",
          headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            
          },
          
        });
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          alert("Something went wrong, please try to logIn again")
          throw new Error(message);
        }
        const data = await res.json();
        console.log(data)
        if(data){
          this.clubs = data
        }
        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          data: data,
        };
        this.postResult = this.formatResponse(result);
      } catch (err) {
        this.postResult = err.message;
        
      }
  }}
}
</script>


<style scoped>
.border-container{
  border: 1px solid blue;
  border-radius: 15px;
  width: 100px;
}

.pointer{
  cursor: pointer;
}
.image-container{
  object-fit: contain;
}

</style>
