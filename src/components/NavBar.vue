<template>
  <nav>
    <h3>Blog App</h3>
    <div class="link-container">
      <ul>
        <li>
          <router-link to="/" exact-active-class="active-link" class="nav-link">Home</router-link>
        </li>
        <li>
          <router-link to="/about" exact-active-class="active-link" class="nav-link"
            >About</router-link
          >
        </li>
        <li>
          <router-link to="/posts" exact-active-class="active-link" class="nav-link"
            >Posts</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
<style scoped>
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3rem;
  width: 100%;
  box-shadow: 0 4px 6px rgb(200, 237, 245);
  height: 6rem;
}
nav h3 {
  color: rgb(8, 150, 182);
}
nav div.link-container ul {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 20px;
}
nav div.link-container ul li {
  list-style-type: none;
  font-size: large;
  font-weight: 800;
  cursor: pointer;
}
.nav-link {
  text-decoration: none;
  color: gray;
}
.active-link {
color: rgb(8, 150, 182);
}
</style>
