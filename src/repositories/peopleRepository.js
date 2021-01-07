const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB({
    apiVersion: '2012-08-10',
})
const DY_TABLE = `${process.env.DY_TABLE}`

class PeopleRepository{
    
    async put(id, people) {
        people.partitionKey = `People.${id.toString()}`
        people.sortKey = 'People'
        const marshalled = AWS.DynamoDB.Converter.marshall(people);

        const item = {
            TableName: DY_TABLE,
            Item: marshalled,
            ReturnValues: 'NONE',
            ReturnConsumedCapacity: 'NONE',
            ReturnItemCollectionMetrics: 'NONE',
        }

        return await dynamodb.putItem(item).promise()
    }

    async get(id) {
        const partitionKey = `People.${id.toString()}`
        const sortKey = 'People'
 
        const params = {
            TableName: DY_TABLE,
            KeyConditionExpression: '#pk = :pk and #sk = :sk',
            ExpressionAttributeNames: {
                '#pk': 'partitionKey',
                '#sk': 'sortKey'
            },
            ExpressionAttributeValues: {
                ':pk': { S: partitionKey },
                ':sk': { S: sortKey},
            },
        }

        const response = await dynamodb.query(params).promise()
        const unmarshalled = AWS.DynamoDB.Converter.unmarshall(response.Items[0])
        return unmarshalled
    }
}

module.exports = PeopleRepository