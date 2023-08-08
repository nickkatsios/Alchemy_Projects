<template>
  <table class="table table-dark table-hover">
    <thead>
        <tr>
          <th scope="col">Block Num</th>
          <th scope="col">Timestamp</th>
          <th scope="col">Total Txs</th>
          <th scope="col">Gas Used</th>
        </tr>
    </thead>
  <tbody>
    <tr v-for="block in blocks" :key="block.hash" @click="searchBlock(block.number)">
        <td>{{ block.number }}</td>
        <td>{{ block.timestamp }}</td>
        <td>{{ block.transactions.length }}</td>
        <td>{{ block.gasUsed }}</td>
    </tr>
  </tbody>
  </table>
</template>

<script>
import { Alchemy, Network } from 'alchemy-sdk';
import { on } from 'events';

const settings = {
    apiKey: process.env.VUE_APP_ALCHEMY_API_KEY,
    network: Network.ETH_GOERLI,
}
const alchemy = new Alchemy(settings);

export default {
    name: 'blockTable',
    data() {
        return {
            blocks: [],
        }
    },
    methods: {
    searchBlock(blockNum) {
      this.$router.push('./block/' + blockNum)
    }
  },
    async created() {
        for (let i = 0 ; i < 10 ; i ++) {
            this.blockNum = await alchemy.core.getBlockNumber() - i;
            const block = await alchemy.core.getBlock(this.blockNum);
            this.blocks.push(block)
        }
    }
}
</script>

<style>

</style>