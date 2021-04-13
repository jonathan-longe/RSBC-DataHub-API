<template>
  <div class="row">
    <div class="card w-100">
      <div class="card-body text-dark">
        <div class="form-row align-items-center">
          <div class="col-sm-8">
            <label class="d-flex">Select a Prohibition to Serve</label>
            <select class="form-control">
              <option>- select a prohibition -</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary mt-4">Go</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "IssueProhibitions"
}
</script>

<style scoped>

</style>