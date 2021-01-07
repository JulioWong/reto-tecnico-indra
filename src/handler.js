'use strict';

const { peopleService } = require('./services')
const people = new peopleService()

module.exports.addPeople = async (event) => {
  const peopleId = event.pathParameters.peopleId || 1;
  const response = await people.registerPeople(peopleId)
  return {
    statusCode: response ? 200 : 400,
    body: JSON.stringify(
      {
        success: response
      }
    ),
  }
};

module.exports.getPeople = async (event) => {
  const peopleId = event.pathParameters.peopleId || 1;
  const response = await people.getPeopleFromDynamoDB(peopleId)

  return {
    statusCode: 201,
    body: JSON.stringify(
      response,
      null,
      2,
    ),
  };
};
