<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Eth Block Explorer</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>
        <form class="d-flex" @submit="searchBlock">
          <input class="form-control me-2" type="search" placeholder="Search for a Block" aria-label="Search" v-model="searchBlockNum">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
</nav>

  <div class="container">
    <h1>ETH Block Explorer</h1>
    <svg xmlns="http://www.w3.org/2000/svg" height="300" width="700" viewBox="-161.97 -439.65 1403.74 2637.9"><path fill="#8A92B2" d="M539.7 650.3V0L0 895.6z"/><path fill="#62688F" d="M539.7 1214.7V650.3L0 895.6zm0-564.4l539.8 245.3L539.7 0z"/><path fill="#454A75" d="M539.7 650.3v564.4l539.8-319.1z"/><path fill="#8A92B2" d="M539.7 1316.9L0 998l539.7 760.6z"/><path fill="#62688F" d="M1079.8 998l-540.1 318.9v441.7z"/></svg>
    <router-view/> 
  </div>
  
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top bg-dark site-footer fixed-bottom w-100">
    <p class="col-md-4 mb-0 text-muted">© 2022 Eth Block Explorer, Inc</p>

    <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <svg xmlns="http://www.w3.org/2000/svg" height="40" width="80" viewBox="-161.97 -439.65 1403.74 2637.9"><path fill="#8A92B2" d="M539.7 650.3V0L0 895.6z"/><path fill="#62688F" d="M539.7 1214.7V650.3L0 895.6zm0-564.4l539.8 245.3L539.7 0z"/><path fill="#454A75" d="M539.7 650.3v564.4l539.8-319.1z"/><path fill="#8A92B2" d="M539.7 1316.9L0 998l539.7 760.6z"/><path fill="#62688F" d="M1079.8 998l-540.1 318.9v441.7z"/></svg>
    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
    </ul>
    </footer>
</template>


<script>

export default {
  name: "app" ,
  data() {
    return {
      blockSearch: "",
      searchBlockNum: null
    }
  },
  methods: {
    searchBlock() {
      console.log(this.searchBlockNum) 
      this.$router.push('./block/' + this.searchBlockNum)
    }
  },

}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.site-footer {
  position: sticky;
}

</style>
