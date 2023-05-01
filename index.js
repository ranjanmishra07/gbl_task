import { Chinese, CostTracking, CuisineTracking, Indian, Italian, User } from "./model/recommendation-model.js";
import { GetRestaurantRecommendations } from "./services/recommendation/recommendation.js";

const cusineTracking = [];

cusineTracking.push(new CuisineTracking(Indian, 10));
cusineTracking.push(new CuisineTracking(Chinese, 5));
cusineTracking.push(new CuisineTracking(Italian, 3));
const costBracket = [];

costBracket.push(new CostTracking(1, 15));
costBracket.push(new CostTracking(2, 8));
costBracket.push(new CostTracking(3, 5));

const user = new User(cusineTracking, costBracket);

const restaurants = [
    {
        id:            "1",
        cuisine:       Indian,
        costBracket:   1,
        rating:        4.5,
        isRecommended: true,
        onboardedTime: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
    },
    {
        id:            "2",
        cuisine:       Chinese,
        costBracket:   2,
        rating:        4.6,
        isRecommended: false,
        onboardedTime: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
    },
    {
        id:            "3",
        cuisine:       Italian,
        costBracket:   3,
        rating:        3.5,
        isRecommended: true,
        onboardedTime: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
    },
    {
        id:            "4",
        cuisine:       Indian,
        costBracket:   2,
        rating:        4.0,
        isRecommended: true,
        onboardedTime: new Date(new Date().getTime() - (48 * 60 * 60 * 1000)),
    },
    {
        id:            "5",
        cuisine:       Chinese,
        costBracket:   3,
        rating:        3.5,
        isRecommended: false,
        onvoardedTime: new Date(new Date().getTime() - (48 * 60 * 60 * 1000)),
    },
    {
        id:            "6",
        cuisine:      Indian,
        costBracket:   3,
        rating:        4.8,
        isRecommended: true,
        onboardedTime: new Date(new Date().getTime() - (12 * 60 * 60 * 1000)),
    },
];


// console.log("restaurants", restaurants);

const recommendedRestaurants = GetRestaurantRecommendations(user, restaurants);


console.log("------------------input ---------------------");
console.log("user--------> ", user);
console.log("restaurants---->", restaurants)

console.log("-----------------output--------------")
console.log("recommendedRestaurants", recommendedRestaurants);