db = connect('mongodb://192.168.101.20/airbnb_bar')

let results = db.det_listings.aggregate([
   {
      $match: {
         $and: [
            { price: { $ne: '' } },
            { first_review: { $ne: '' } },
            { last_review: { $ne: '' } },
            { minimum_nights: { $ne: '' } },
            { maximum_nights: { $ne: '' } },
            { neighbourhood: { $ne: '' } }
         ]
      }
   },
   {
      $set: { price: { $replaceAll: { input: '$price', find: '$', replacement: '' } } }
   },
   {
      $set: {
         price: { $toDecimal: { $replaceAll: { input: '$price', find: ',', replacement: '' } } },
         first_review: { $toDate: '$first_review' },
         last_review: { $toDate: '$last_review' }
      }
   },
   {
      $group: {
         _id: '$neighbourhood',
         avg_price: { $avg: '$price' },
         min_nights: { $min: '$minimum_nights' },
         max_nights: { $max: '$maximum_nights' },
         avg_first_review: { $avg: '$first_review' },
         avg_last_review: { $avg: '$last_review' }
      }
   }
])

results.forEach(doc => {
   printjson(doc)
})

// print(results.explain('executionStats'))