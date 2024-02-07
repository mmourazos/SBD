db = connect('mongodb://localhost/airbnb_ams')

// Nada que ver aquí amigo, solo un script para hacer pruebas con las agregaciones

// let results = db.det_listings.aggregate([
//     {
//         $match: {
//             review_scores_rating: { $gte: 4 },
//             price: { $ne: "" }
//         }
//     },
//     {
//         $addFields: { // Eliminamos el símbolo del "$"
//             precio: { $substr: ["$price", 1, -1] }
//         }
//     },
//     {
//         $addFields: { // Convertimos el precio a double
//             precio: { $replaceAll: { input: "$precio", find: ",", replacement: "" } }
//         }  
//     },
//     {
//         $addFields: {
//             precio: { $toDouble: "$precio" }
//         }
//     },
//     {
//         $group: {
//             _id: "$neighbourhood_cleansed",
//             precio_medio: { $avg: "$precio" }
//         }
//     },
//     {
//         $sort: {
//             precio_medio: -1
//         }
//     },
//     {
//         $limit: 5
//     }
// ])


let result = db.det_reviews.aggregate([
    {
        $group: {
            _id: '$reviewer_id',
            nombre: { $first: '$reviewer_name' },
        }
    }
])

results.forEach(printjson)