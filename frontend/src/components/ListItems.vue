<template>
  <div class="items">
    {{ items }}
  </div>
</template>

<script>
export default {
  name: 'Items',
  data: function() {
    return {
      items: [],
    };
  },
  created: function() {
    const me = this;
    fetch("http://localhost:10001/v0/items")
      .then(res => {
        return res.json();
      })
      .then(data => {
        me.items = data;
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
