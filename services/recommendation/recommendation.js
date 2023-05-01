export function GetRestaurantRecommendations(user, restaurants) {
  // user.cuisines and user.costBrackets are sorted by NoOfOrders in descending order and consists of at least 3 elements - first element is the primary cuisine/cost, second and third element is the secondary cuisine/cost

  // sorting orders
  const orders = [
    {
      name: "Featured restaurants of primary cuisine and primary cost bracket",
      condition: function (restaurant, previousCount) {
        return [
          -1,
          restaurant.isRecommended &&
            restaurant.cuisine === user.cuisines[0].type &&
            restaurant.costBracket === user.costBrackets[0].type,
        ];
      },
    },
    {
      name:
        "If none, then all featured restaurants of primary cuisine, secondary cost and secondary cuisine, primary cost",
      condition: function (restaurant, previousCount) {
        if (previousCount > 0) {
          return [-1, false];
        }
        return [
          -1,
          restaurant.IsRecommended &&
            ((restaurant.cuisine === user.cuisines[0].type &&
              (restaurant.costBracket === user.costBrackets[1].type ||
                restaurant.costBracket === user.costBrackets[2].type)) ||
              ((restaurant.cuisine === user.cuisines[1].type ||
                restaurant.cuisine === user.cuisines[2].type) &&
                restaurant.costBracket === user.costBrackets[0].type)),
        ];
      },
    },
    {
      name: "All restaurants of Primary cuisine, primary cost bracket with rating >= 4",
      condition: function (restaurant, previousCount) {
        return [
          -1,
          restaurant.cuisine === user.cuisines[0].type &&
            restaurant.costBracket === user.costBrackets[0].type &&
            restaurant.rating >= 4,
        ];
      },
    },
    {
      name:
        "All restaurants of Primary cuisine, secondary cost bracket with rating >= 4.5",
      condition: function (restaurant, previousCount) {
        return [
          -1,
          restaurant.cuisine === user.cuisines[0].type &&
            (restaurant.costBracket === user.costBrackets[1].type ||
              restaurant.costBracket === user.costBrackets[2].type) &&
            restaurant.rating >= 4.5,
        ];
      },
    },
    {
      name: 'All restaurants of secondary cuisine, primary cost bracket with rating >= 4.5',
      condition: function (restaurant, previousCount) {
        return [
            -1 ,
             (restaurant.cuisine === user.cuisines[1].type || restaurant.cuisine === user.cuisines[2].type)
              && restaurant.costBracket === user.costBrackets[0].type
               && restaurant.rating >= 4.5
            ];
      },
    },
    {
      name: 'Top 4 newly created restaurants by rating',
      condition: function (restaurant, previousCount) {
        return [-1 , 
            previousCount < 4 && Date.now() - restaurant.onboardedTime < 48 * 60 * 60 * 1000
        ];
      },
    },
    {
      name: 'All restaurants of Primary cuisine, primary cost bracket with rating < 4',
      condition: function (restaurant, previousCount) {
        return [-1,
             restaurant.cuisine === user.cuisines[0].type && restaurant.costBracket === user.costBrackets[0].type && restaurant.rating < 4
            ];
      },
    },
    {
      name: 'All restaurants of Primary cuisine, secondary cost bracket with rating < 4.5',
      condition: function (restaurant, previousCount) {
        return [-1, 
            restaurant.cuisine === user.cuisines[0].type
             && (restaurant.costBracket === user.costBrackets[1].type || restaurant.costBracket === user.costBrackets[2].type)
              && restaurant.rating < 4.5
        ];
      },
    },
    {
      name: 'All restaurants of secondary cuisine, primary cost bracket with rating < 4.5',
      condition: function (restaurant, previousCount) {
        return [-1, 
            (restaurant.cuisine === user.cuisines[1].type || restaurant.cuisine === user.cuisines[2].type)
             && restaurant.costBracket === user.costBrackets[0].type
              && restaurant.rating < 4.5
        ];
      },
    },
  ]

  // Iterate through each sorting order and add the matching restaurants to the recommendations
  const recommendations = [];
  const recommendationsMap = {};
  let previousCount = 0;
  for (let order of orders) {
    const matchingRestaurants = [];
    for (let restaurant of restaurants) {
      if (!(restaurant.id in recommendationsMap)) {
        const [count, add] = order.condition(restaurant, previousCount);
        if (add) {
          matchingRestaurants.push(restaurant);
          if (count > 0 && matchingRestaurants.length >= count) {
            break;
          }
        }
      }
    }


    previousCount = 0;
//     // Add the matching restaurants to the recommendations
    for (const restaurant of matchingRestaurants) {
      if (!(restaurant.id in recommendationsMap)) {
        recommendationsMap[restaurant.id] = true;
        recommendations.push(restaurant.id);
        previousCount++;
      }
    }
  }

  // add rest all restaurants
  for (const restaurant of restaurants) {
    if (!(restaurant.id in recommendationsMap)) {
      recommendationsMap[restaurant.id] = true;
      recommendations.push(restaurant.id);
    }
  }

  return recommendations;
}