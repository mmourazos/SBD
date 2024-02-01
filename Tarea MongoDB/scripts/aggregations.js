db = connect('mongodb://localhost/airbnb_ams')



// let result = db.listings.aggregate([
//     { 
//         $group: {
//             _id: "$neighbourhood",
//             num_alojamientos: { $count: {} } 
//         }
//     },
//     {
//         $sort: { num_alojamientos: -1 }
//     },
//     {
//         $limit: 5
//     }
// ])

// printjson(result)

// let results = db.det_listings.aggregate([
//     {
//         $group: {
//             _id: "$neighbourhood_cleansed",
//             puntuacion_media: { $avg: "$review_scores_rating" }
//         }
//     },
//     {
//         $sort: { puntuacion_media: -1 }
//     },
//     {
//         $limit: 5
//     }
// ])

// let results = db.det_listings.aggregate([
//     {
//         $match: {
//             review_scores_rating: { $gte: 4 }
//         }
//     },
//     {
//         $addFields: {
//             price: { $toDecimal: { 
//                 $replaceAll: { input: { 
//                     $substr: ["$price", 1, -1] }, find: ",", replacement: "" } 
//                 }
//             }
//         }
//     },  
//     {
//         $limit: 5
//     }
// ])

let results = db.det_reviews.aggregate([
    {
        $group: {
            _id: "$reviewer_id",
            name: { $first: "$reviewer_name" },
            num_reviews: { $count: {} }
        }
    },
    {
        $match: {
            num_reviews: { $gte: 5 }
        }
    },
    {
        $limit: 5
    }
])

results.forEach(printjson)
