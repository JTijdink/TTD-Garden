
const { 
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield, 
    getCostForCrop, 
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit 
} = require("./garden");

const corn = {
    name: "corn",
    yield: 3,
    salePrice: 5,
    factors: {
        sun: {
            low: -50,
            medium: 0,
            high: 50,
        },
        wind: {
            low: 0,
            medium: -30,
            high: -60,
        },
        soil: {
            bad: -40,
            standard: 0,
            good: 40,
        },
        insecticide: {
            none: -25,
            standard: 0,
            biological: 25,
        },
    },
};

const pumpkin = {
    name: "pumpkin",
    yield: 4,
    salePrice: 10,
    factors: {
        sun: {
            low: -25,
            medium: 0,
            high: 25,
        },
        wind: {
            low: 0,
            medium: -15,
            high: -30,
        },
        temperature: {
            low: 0,
            medium: 25,
            high: 50,
        },
        insecticide: {
            none: -25,
            standard: 0,
            biological: 25,
        },
    },
};

describe("getYieldForPlant", () => {
    
    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(3);
    });

    
    test("Get yield for plant with a low sun environment", () => {
        const environmentFactors = {
            sun: "low",
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(1.5);
    });

    // 2 factors
    test("Get yield for plant with two enviromental factors", () => {
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(3.15);
    });


    test("Get yield for plant with three enviromental factors", () => {
        const environmentFactors = {
            sun: "high",
            wind: "low",
            soil: "good",
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(6.3);
    });

    test("Get yield for plant with unused enviromental factors", () => {
        const environmentFactors = {
            sun: "medium",
            wind: "high",
            temperature: "high",
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(1.2);
    });
});

describe("getYieldForCrop", () => {
 
    test("Get yield for crop, simple", () => {
        const input = {
            crop: corn,
            numCrops: 10,
        };

        expect(getYieldForCrop(input)).toBe(30);
    });

    test("Get yield for crop, with one environmental factor", () => {
        const environmentFactors = {
            sun: "high",
        };

        const input = {
            crop: corn,
            environmentFactors: environmentFactors,
            numCrops: 10,
        };

        expect(getYieldForCrop(input)).toBe(45);
    });

    test("Get yield for crop, with two environmental factors", () => {
        const environmentFactors = {
            sun: "high",
            wind: "high",
        };

        const input = {
            crop: corn,
            environmentFactors: environmentFactors,
            numCrops: 10,
        };

        expect(getYieldForCrop(input)).toBe(18);
    });

    test("Get yield for crop, with three environmental factors", () => {
        const environmentFactors = {
            sun: "high",
            wind: "high",
            insecticide: "biological",
        };

        const input = {
            crop: corn,
            environmentFactors: environmentFactors,
            numCrops: 10,
        };

        expect(getYieldForCrop(input)).toBe(22.5);
    });
    
    test("Get yield for crop, with unused environmental factors", () => {
        const environmentFactors = {
            sun: "high",
            wind: "high",
            insecticide: "biological",
            temperature: "high",
        };

        const input = {
            crop: corn,
            environmentFactors: environmentFactors,
            numCrops: 10,
        };

        expect(getYieldForCrop(input)).toBe(22.5);
    });
});

describe("getTotalYield", () => {
   
    test("Calculate total yield with multiple crops", () => {
        const crops = [
            { 
                crop: corn, 
                numCrops: 5,
            }, 
            { 
                crop: pumpkin, 
                numCrops: 2 
            },
        ];

        expect(getTotalYield({ crops })).toBe(23);
    });

    
    test("Calculate total yield with 0 amount", () => {
        const crops = [{ crop: corn, numCrops: 0 }];

        expect(getTotalYield({ crops })).toBe(0);
    });

    test("Calculate total yield with multiple crops and one environmental factor", () => {
        const environmentFactors = {
            sun: "high",
        };

        const crops = [
            { 
                crop: corn, 
                environmentFactors: environmentFactors,
                numCrops: 10,
            }, 
            { 
                crop: pumpkin, 
                environmentFactors: environmentFactors,
                numCrops: 5, 
            },
        ]; 

        expect(getTotalYield({ crops })).toBe(70);
    });

   
    test("Calculate total yield with multiple crops and two environmental factors", () => {
        const environmentFactors = {
            sun: "high",
            wind: "high",
        };

        const crops = [
            { 
                crop: corn, 
                environmentFactors: environmentFactors,
                numCrops: 10,
            }, 
            { 
                crop: pumpkin, 
                environmentFactors: environmentFactors,
                numCrops: 5, 
            },
        ]; 

        expect(getTotalYield({ crops })).toBe(35.5);
    });

    test("Calculate total yield with multiple crops and three environmental factors", () => {
        const environmentFactors = {
            sun: "high",
            soil: "good",
            temperature: "low",
        };

        const crops = [
            { 
                crop: corn, 
                environmentFactors: environmentFactors,
                numCrops: 10,
            }, 
            { 
                crop: pumpkin, 
                environmentFactors: environmentFactors,
                numCrops: 5, 
            },
        ]; 

        expect(getTotalYield({ crops })).toBe(88);
    });
});

describe('getCostForCrop', () => {
    
    const corn = {
        name: "corn",
        yield: 3,
    };

    test("Get cost for one crop", () => {
        const input = {
            crop: corn,
            numCrops: 10,
        };
    
        expect(getCostForCrop(input)).toBe(10);
    });
});

describe('getRevenueForCrop', () => {


    test("Get revenue for one crop without environmental factors", () => { 
        const input = {
            crop: corn,
            numCrops: 10,
        };
    
        expect(getRevenueForCrop(input)).toBe(150);
    });

    test("Get revenue for one crop with environmental factors", () => {
        const environmentFactors = {
            sun: "high",
            wind: "high",
        };
    
        const input = {
            crop: corn,
            environmentFactors: environmentFactors,
            numCrops: 10,
        };
    
        expect(getRevenueForCrop(input)).toBe(90);
    });
});

describe('getProfitForCrop', () => {

    test("Get profit for one crop without environmental factors", () => { 
            const input = {
                crop: corn,
                numCrops: 10,
            };
        
            expect(getProfitForCrop(input)).toBe(140);
    });


    test("Get profit for one crop with environmental factors", () => {
        const environmentFactors = {
            sun: "high",
            wind: "high",
        };
    
        const input = {
            crop: corn,
            environmentFactors: environmentFactors,
            numCrops: 10,
        };
    
        expect(getProfitForCrop(input)).toBe(80);
    });
});

describe('getTotalProfit', () => {

    test("Get total profit for two crops without environmental factors", () => {
        const crops = [
            { 
                crop: corn, 
                numCrops: 10,
            }, 
            { 
                crop: pumpkin, 
                numCrops: 10, 
            },
        ];
    
        expect(getTotalProfit({ crops })).toBe(530);
    });

    test("Get total profit for two crops with environmental factors", () => {
        const environmentFactors = {
            sun: "high",
            wind: "high",
            soil: "good",
        };

        const crops = [
            { 
                crop: corn, 
                environmentFactors: environmentFactors,
                numCrops: 10,
            }, 
            { 
                crop: pumpkin, 
                environmentFactors: environmentFactors,
                numCrops: 8, 
            },
        ]; 
    
        expect(getTotalProfit({ crops })).toBe(388);
    });
});