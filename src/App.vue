<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info" id="nav">
      <b-navbar-brand>Crystal Snow</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/about">Admin</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
    <footer>
    <b-navbar variant="info">
      <b-container class="justify-content-md-center">
        <b-row>
          <b-col ><img src="./assets/facebook.png" width="30px"></b-col>
          <b-col><img src="./assets/instagram.png" width="30px"></b-col>
          <b-col><img src="./assets/snapchat.png" width="30px"></b-col>
          <b-col><img src="./assets/twitter.png" width="30px"></b-col>
        </b-row>
      </b-container>
    </b-navbar>
    </footer>
  </div>
</template>

<style>
html, body, #app{
  height: 100%
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #38A5C5;
}

footer .row{
  margin-top: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 15px;
  background-color: #38A5C5;
}

#nav a {
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  color: white;
}

#nav a:hover{
  transform: scale(1.1);
}

#nav a.router-link-exact-active {
  font-weight:bold;
  transform: scale(1.1);
}

</style>
