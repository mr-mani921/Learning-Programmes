// Problem 1: Data Transformation Pipeline
// Scenario
// You are building a generic Data Transformation Pipeline for processing large sets of user data. The goal is to dynamically apply a series of transformation functions (e.g., converting names to uppercase, filtering by age, etc.) to the dataset. Each function should be modular and composable.

// Requirements
// Implement a class DataPipeline<T> that:

// Stores a dataset of type T[].
// Allows adding transformation functions.
// Applies transformations sequentially to the dataset.
// Create at least three transformation functions:

// filterByKey: Filters items based on a specific key and value.
// mapToUpperCase: Converts a specified string key’s values to uppercase.
// addProperty: Adds a new property with a default value to all items.
// Use the pipeline with a dataset of users (User type) and demonstrate how transformations are applied step by step.

type AllPossibleDataTypes = number | string | boolean;
type Transformation<T> = {
  func: (data: T[], ...args: any[]) => T[];
  args: any[];
};

class DataPipeline<T> {
  private dataset: T[] = [];
  private transformations: Transformation<T>[] = [];

  addData(data: T[]): void {
    this.dataset.push(...data);
  }

  addTransformation(
    func: (data: T[], ...args: any[]) => T[],
    ...args: any[]
  ): void {
    this.transformations.push({ func, args });
  }

  process(): T[] {
    this.transformations.forEach(({ func, args }) => {
      this.dataset = func(this.dataset, ...args);
    });
    console.log("Final dataset:", this.dataset); // Log the final dataset for verification
    return this.dataset;
  }

  static filterByKey<K extends keyof U, U>(
    data: U[],
    key: K,
    value: U[K]
  ): U[] {
    return data.filter((item) => item[key] === value);
  }

  static mapToUpperCase<K extends keyof U, U>(data: U[], key: K): U[] {
    return data.map((item) => {
      if (typeof item[key] === "string") {
        return { ...item, [key]: (item[key] as string).toUpperCase() };
      }
      return item;
    });
  }

  static addProperty<U>(
    data: U[],
    propName: string,
    propValue: AllPossibleDataTypes
  ): (U & Record<string, AllPossibleDataTypes>)[] {
    return data.map((item) => ({ ...item, [propName]: propValue }));
  }
}

// Interface for User
interface User {
  id: number;
  name: string;
  field: string;
}

// Sample Dataset
const users: User[] = [
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
const pipeline = new DataPipeline<User>();

// addData is not a part of data transformation process so that's why we instantiated it seperatly
pipeline.addData(users);

// Add Transformations
pipeline.addTransformation(DataPipeline.mapToUpperCase, "name");
pipeline.addTransformation(DataPipeline.filterByKey, "id", 2);
pipeline.addTransformation(DataPipeline.filterByKey, "id", 2);
pipeline.addTransformation(DataPipeline.addProperty, "isActive", true);

// Process the Pipeline
pipeline.process();
