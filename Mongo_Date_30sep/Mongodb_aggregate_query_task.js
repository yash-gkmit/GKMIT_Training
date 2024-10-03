// Query1 - 
// Write a query to find all movies that share at least one cast member with "Blacksmith Scene."

db.movies.find(//for finding cast
	{cast:
	   { $in: db.movies.findOne( // having title 'Blacksmith Scene' 
	   	    {title: 'Blacksmith Scene'}, 
	   	    {cast:1}).cast
	   }
	}
)

// Query2 - 
// Write a query to find the top 5 movies with the highest IMDb ratings that were released before the year 1900.
db.movies.aggregate([
     {$match: {year: {$lt: 1900}}}, //for getting result match year 1900
     {$sort: {"imdb.rating":-1}}, //for sorting movies according to imdb rating descending
     {$skip: 0},//for getting result for page 1
     {$limit:5} //for getting result till 5
])

// Query3 - 
// Write a query to find all movies directed by "William K.L. Dickson." Return the titles, release years, and IMDb ratings of the movies.

//make group and represent single output
db.movies.aggregate([
      {$match: {directors: 'William K.L. Dickson'}},//for getting result match with director name 'William K.L. Dickson'
      {$facet: {"directedByWilliam": [ //making facet for getting more than one column
      	{$group: {
      		_id: "$directors", 
      	    title: {$push: "$title"}, 
      	    release_years: {$push: "$year"}, 
      	    imdb_rating: {$push: "$imdb.rating"}
      	         }
      	}]}
      }
])

//output - 
 [
  {
    directedByWilliam: [
      {
        _id: [ 'William K.L. Dickson' ],
        title: [
          'Blacksmith Scene',
          'Dickson Experimental Sound Film',
          'Newark Athlete'
        ],
        release_years: [ 1893, 1894, 1891 ],
        imdb_rating: [ 6.2, 6.8, 4.9 ]
      }
    ]
  }
]

//other way
db.movies.aggregate([
      {$match: {directors: 'William K.L. Dickson'}},//for getting result match with director name 'William K.L. Dickson'
      {$project: {directors: 1, year: 1, "imdb.rating":1}}//then projecting output having director name and year and imdb rating too.
])   

//output - 
[
  {
    _id: ObjectId('573a1390f29313caabcd4135'),
    directors: [ 'William K.L. Dickson' ],
    year: 1893,
    imdb: { rating: 6.2 }
  },
  {
    _id: ObjectId('573a139ef29313caabcfe4f1'),
    directors: [ 'William K.L. Dickson' ],
    year: 1894,
    imdb: { rating: 6.8 }
  },
  {
    _id: ObjectId('573a13a3f29313caabd0d5a4'),
    directors: [ 'William K.L. Dickson' ],
    year: 1891,
    imdb: { rating: 4.9 }
  }
]   


Query4 - 
Write an aggregation query to find the top 3 directors who have directed the most movies in the "Short" genre. Return the directors' names and the number of movies.

db.movies.aggregate([
   {$match: {genres: 'Short'}}, // for getting all movie with genre short
   {$unwind: "$directors"}, // for separating director array into single-single documents
   {$group: {_id: "$directors", movie_total: {$sum:1}}},//for grouping director with movie total
   {$sort: {movie_total: -1}},//for sorting the movies according to movie_count descending
   {$limit: 3},//for getting top 3
   {$project: {director:"$_id", movie_total: 1, _id:0}}//for projecting only name and movie_total not id
])

//Query5 - 
//Write a query to find movies where the number of reviews in `tomatoes.viewer.numReviews` has increased by at least 10% over the past year. Return the titles and the number of reviews.

db.movies.aggregate([{
	$group: {
		_id: "$year",
		numreviews: {
			$push: "$tomatoes.viewer.numReviews"
		}
	}},
	{
	   $addFields:{
	   	 averagerevies: {$avg: "$numreviews"}
	   }
    },
     {
    $setWindowFields: {
      sortBy: { _id: 1 },
      output: {
        prevAvgNumReviews: {
          $shift: {
            output: "$avgNumReviews",
            by: -1
          }
        }
      }
    }
   },
   {
    $addFields: {
      percentageIncrease: {
        $cond: {
          if: { $gt: ["$prevAvgNumReviews", 0] },
          then: {
            $multiply: [
              { $divide: [{ $subtract: ["$avgNumReviews", "$prevAvgNumReviews"] }, "$prevAvgNumReviews"] },
              100
            ]
          },
          else: null
        }
      }
    }
  },
  {
    $match: {
      percentageIncrease: { $gte: 10 }
    }
  },
  {
    $sort: { percentageIncrease: 1 }
  }
])

// Query6 - 
// Write an aggregation query to find the pair of actors who have appeared together in the most number of movies. Return their names and the number of movies they've co-starred in.

db.movies.aggregate([    
    {
    $match: {
      "cast": {
      $exists: true
      }

    }
    },

    {
      $project: {
        castPairs: {
          $reduce: {
            input: { $range: [0, { $subtract: [{ $size: "$cast" }, 1] }] },
            initialValue: [],
            in: {
              $concatArrays: [
                "$$value",
                {
                  $map: {
                    input: { $slice: ["$cast", { $add: ["$$this", 1] }, { $size: "$cast" }] },
                    as: "pairActor",
                    in: [{ $arrayElemAt: ["$cast", "$$this"] }, "$$pairActor"]
                  }
                }
              ]
            }
          }
        }
      }
    },
    {
      $unwind: "$castPairs"
    },
    {
      $project: {
        actorPair: {
          $let: {
            vars: {
              first: { $arrayElemAt: ["$castPairs", 0] },
              second: { $arrayElemAt: ["$castPairs", 1] }
            },
            in: {
              $cond: { if: { $lt: ["$$first", "$$second"] }, then: ["$$first", "$$second"], else: ["$$second", "$$first"] }
            }
          }
        }
      }
    },
    {
      $group: {
        _id: "$actorPair",
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
 ])
