<template>
  <h1>Block Num {{ blockNum }}</h1>
  <div class="card">
  <div class="card-header">
    Quote
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <ul>
        <li>Hash: {{ block.hash }} </li>
        <li>Parent Hash: {{ block.parentHash }} </li>
        <li>Difficulty: {{ block.difficulty }} </li>
        <li>Gas Used: {{ block.gasUsed }} </li>
      </ul>
      <footer class="blockquote-footer">Validator: {{ block.miner }}<cite></cite></footer>
    </blockquote>
  </div>
</div>
</template>

<script>

import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
    apiKey: process.env.VUE_APP_ALCHEMY_API_KEY,
    network: Network.ETH_GOERLI,
}
const alchemy = new Alchemy(settings);


export default {
    
    data() {
        return {
            blockNum : this.$route.params.blockNumber,
            block: null
        }
    },
    async created() {
        const requestedBlock = await alchemy.core.getBlock(parseInt(this.blockNum))
        this.block = requestedBlock
    }
}
</script>

<style>

</style>