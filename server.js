const express = require('express');
const app = express();

let users = [
    { id : 1, name : "user 1" },
    { id : 2, name : "user 2" },
    { id : 3, name : "user 3" },
    { id : 4, name : "user 4" },
    { id : 5, name : "user 5" },
    { id : 6, name : "user 6" },
    { id : 7, name : "user 7" },
    { id : 8, name : "user 8" },
    { id : 9, name : "user 9" },
    { id : 10, name : "user 10" },
    { id : 11, name : "user 11" },
]

app.get('/users', paginatedResult(users), (req, res) => 
{
    res.json(res.paginatedResult)
});

function paginatedResult(users)
{
    return function (req, res, next) 
    {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
    
        const startIndex = (page-1) * limit;
        const endIndex = page * limit;
    
        let results = {};
    
        results.result = { page, limit };
    
        if( startIndex > 0 )
        {
            results.previouse = {
                page: page - 1,
                limit: 3
            };
        }
    
        if( endIndex < users.length)
        {
            results.next = {
                page: page + 1,
                limit: 3
            }
        }

        res.paginatedResult = results;
        next();
    }
}

app.listen(6000, () => {
    console.log("Listening on port 6000");
});