var lunr = require('../node_modules/lunr/lunr.js')
exports.handler = function(event, context, callback) {
    const documents = [
        {
            "title": "Twelfth-Night",
            "body": "If music be the food of love, play on: Give me excess of it…",
            "author": "William Shakespeare",
            "id": "2"
        },

    ]
    var idx = lunr( () => {
        this.field('title')
        this.field('body')
        documents.forEach( (doc, i) => {
            const d = Object.assign(doc, {id:i})
            this.add(d)
        })
    })
    const needle = event.queryStringParameters.s;
    const results = idx.search(needle);
    const firstResult = documents[results[0].ref].title
    callback(null, {
        statusCode: 200,
        body: `
            <h1>You Searched for ${event.queryStringParameters.s}</h1>
            <ul>
                <li>${firstResult}</li>
            </ul>
            `
    });
}