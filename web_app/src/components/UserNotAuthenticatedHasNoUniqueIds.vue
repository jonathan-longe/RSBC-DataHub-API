<template>
  <div class="card bg-light border-secondary mb-3">
      <div class="card-body text-dark">
        <span class="font-weight-bold">Welcome!</span>
        it looks like you haven't used this app before.

        <router-link to="/login" class="font-weight-bold">
          <div class="btn btn-primary">Login</div>
        </router-link>
      </div>
  </div>
</template>

<script>
export default {
name: "UserNotAuthenticatedHasNoUniqueIds"
}
</script>

<style scoped>

</style>