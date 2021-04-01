<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="#" class="navbar-brand">VueJS</a>
      <div class="navbar-nav mr-auto">

        <li class="nav-item">
        <a href="/cacCodes" class="nav-link">CAC Codes</a>
      </li>
        <li class="nav-item">
          <a href="/addCAC" class="nav-link">Add CAC</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
