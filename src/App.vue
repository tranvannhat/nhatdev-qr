<template>
  <div id="app">
    <router-link to="/">
      <img class="qr--logo" src="./assets/logo.png" alt="logo" />
    </router-link>
    <div id="nav">
      <router-link to="/scan" class="mr-3">Scan QR</router-link>
      <router-link to="/genrate">Generate QR</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .qr--logo {
    margin-top: 25px;
    width: 125px;
  }
}

#nav {
  padding: 30px;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
      border-bottom: 2px solid #42b983;
    }
  }
}
</style>
