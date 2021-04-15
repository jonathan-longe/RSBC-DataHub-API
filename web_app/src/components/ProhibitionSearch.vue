<template>
  <div class="card w-100 mt-3 mb-3">
      <div class="card-body text-secondary">
        <form>
          <div class="form-row align-items-center">
            <div class="col-sm-8 my-1">
              <label class="sr-only" for="prohibitionSearch">Prohibition Number</label>
              <input type="text" class="form-control" id="prohibitionSearch" placeholder="Prohibition Number">
            </div>
            <div class="col-auto my-1">
              <button type="submit" disabled class="btn btn-primary">Search</button>
            </div>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
export default {
name: "ProhibitionSearch"
}
</script>

<style scoped>
  .card {
    background-color: lightgray;
  }
</style>