<template>
  <div class="home">
    <h1>Home</h1>
    <h2>Last 10 Blocks</h2>
  </div>

  <block-table/>
</template>

<script>
import BlockTable from '@/components/BlockTable.vue'

export default {
  name: 'HomeView',
  components: {
    BlockTable
  },

}
</script>
