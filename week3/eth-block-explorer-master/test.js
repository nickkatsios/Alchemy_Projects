const { Alchemy, Network } = require('alchemy-sdk');

const settings = {
    apiKey: "ZvzizVyoOQPOtNwVDetVFsce48BdrLlx",
    network: Network.ETH_GOERLI,
}

const alchemy = new Alchemy(settings);


const blockNum = async () => {
    return await alchemy.core.getBlockNumber();
} 
console.log(blockNum())
