db = connect('mongodb://192.168.101.20/airbnb_bar')



let results = db.det_listings.aggregate([
   {
      $match:
      {
         price: { $ne: '' },
         review_scores_rating: { $gte: 4 },
      }
   },

   {
      $addFields: { // Eliminamos el símbolo de  "$" del campo price.
         price: { $substr: ['$price', 1, -1] }, // el valor de -1 indica que se toma hasta el final.
         ratings: '$review_scores_rating'
      }
   },

   {
      $addFields: { // Eliminamos el símbolo de "," del campo price.
         price: {
            $toDecimal: {
               $replaceAll: { input: '$price', find: ',', replacement: '' }
            }
         },
      }
   },
   {
      $addFields: { // Convertimos el campo price a decimal.
         price:
         {
            $toDecimal: '$price'
         }
      }
   },
   {
      $group:
      {
         _id: "$neighbourhood_cleansed",
         avg_price: { $avg: "$price" },
         min_rating: { $min: "$ratings" }
      }
   }
])

results.forEach(printjson)

// print(results.explain('executionStats'))