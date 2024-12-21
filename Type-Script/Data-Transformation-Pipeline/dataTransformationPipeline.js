"use strict";
// Problem 1: Data Transformation Pipeline
// Scenario
// You are building a generic Data Transformation Pipeline for processing large sets of user data. The goal is to dynamically apply a series of transformation functions (e.g., converting names to uppercase, filtering by age, etc.) to the dataset. Each function should be modular and composable.
class DataPipeline {
    constructor() {
        this.dataset = [];
        this.transformations = [];
    }
    addData(data) {
        this.dataset.push(...data);
    }
    addTransformation(func, ...args) {
        this.transformations.push({ func, args });
    }
    process() {
        this.transformations.forEach(({ func, args }) => {
            this.dataset = func(this.dataset, ...args);
        });
        console.log("Final dataset:", this.dataset); // Log the final dataset for verification
        return this.dataset;
    }
    static filterByKey(data, key, value) {
        return data.filter((item) => item[key] === value);
    }
    static mapToUpperCase(data, key) {
        return data.map((item) => {
            if (typeof item[key] === "string") {
                return Object.assign(Object.assign({}, item), { [key]: item[key].toUpperCase() });
            }
            return item;
        });
    }
    static addProperty(data, propName, propValue) {
        return data.map((item) => (Object.assign(Object.assign({}, item), { [propName]: propValue })));
    }
}
// Sample Dataset
const users = [
    {
        id: 1,
        name: "mani",
        field: "computer Science",
    },
    {
        id: 2,
        name: "Professor",
        field: "AI\\ML",
    },
];
// Initialize the Pipeline
const pipeline = new DataPipeline();
// addData is not a part of data transformation process so that's why we instantiated it seperatly
pipeline.addData(users);
// Add Transformations
pipeline.addTransformation(DataPipeline.mapToUpperCase, "name");
pipeline.addTransformation(DataPipeline.filterByKey, "id", 2);
pipeline.addTransformation(DataPipeline.filterByKey, "id", 2);
pipeline.addTransformation(DataPipeline.addProperty, "isActive", true);
// Process the Pipeline
pipeline.process();
