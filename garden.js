const getYieldForPlant = (plant, environmentFactors = null) => {
    
    let plantYield = plant.yield;

    if (environmentFactors) {

        Object.entries(environmentFactors).forEach((entry) => {
            if (entry[0] in plant.factors) {
                let multiplication = plant.factors[entry[0]][entry[1]];
                plantYield = plantYield + ((multiplication / 100) * plantYield);
            };
        });     
    };

    return +(plantYield).toFixed(2);
};

const getYieldForCrop = (input) => {
  
    return +(getYieldForPlant(input.crop, input.environmentFactors) * input.numCrops).toFixed(2);
};

const getTotalYield = ({ crops }) => {

    return crops.map((crop) => {
        return getYieldForCrop(crop);
    }).reduce((prev, curr) => {
        return prev + curr;
    }, 0);
};

const getCostForCrop = (input) => {
   
    return input.numCrops;
};

const getRevenueForCrop = (input) => {

    return input.crop.salePrice * getYieldForCrop(input);
};

const getProfitForCrop = (input) => {
    
    return getRevenueForCrop(input) - getCostForCrop(input);
};

const getTotalProfit = ({ crops }) => {
  
    return crops.map((crop) => {
        return getProfitForCrop(crop);
    }).reduce((prev, curr) => {
        return prev + curr;
    }, 0);
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};
