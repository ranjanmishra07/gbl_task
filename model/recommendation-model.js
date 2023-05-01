export const SouthIndian = 1;
export const NorthIndian = 2;
export const Chinese = 3;
export const Indian = 4;
export const Italian = 5;

export class Restaurant {
  constructor(id, cuisine, costBracket, rating, isRecommended, onboardedTime) {
    this.ID = id;
    this.Cuisine = cuisine;
    this.CostBracket = costBracket;
    this.Rating = rating;
    this.IsRecommended = isRecommended;
    this.OnboardedTime = onboardedTime;
  }
}

export class CuisineTracking {
  constructor(type, noOfOrders) {
    this.type = type;
    this.noOfOrders = noOfOrders;
  }
}

export class CostTracking {
  constructor(type, noOfOrders) {
    this.type = type;
    this.noOfOrders = noOfOrders;
  }
}

export class User {
  constructor(cuisines, costBrackets) {
    this.cuisines = cuisines;
    this.costBrackets = costBrackets;
  }
}