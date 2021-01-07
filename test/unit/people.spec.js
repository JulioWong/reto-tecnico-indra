const { peopleService } = require('../../src/services')
const { peopleRepository } = require('../../src/repositories')
const BaseApi = require('../../src/core/base.api')
const {DYNAMO, SWAPI} = require('./mock')
const sinon = require('sinon')
const people = new peopleService()

describe('validatePeople/response', () => {

    it('should define "service" class', () => {
      expect(peopleService).toBeDefined()
    })

    sinon.stub(BaseApi.prototype, 'get').callsFake(args => {
      return SWAPI
    })
    
    sinon.stub(peopleRepository.prototype, 'put').callsFake(args => {
      return true
    })

    sinon.stub(peopleRepository.prototype, 'get').callsFake(args => {
      return DYNAMO
    })

    it('service registerPeople should return true', async () => {
      const response = await people.registerPeople(1)
      expect(response).toBe(true)
    })

    it('service getPeopleFromDynamoDB should return Object', async () => {
      const response = await people.getPeopleFromDynamoDB(1)
      expect(Object.keys(response)).toEqual(
        expect.arrayContaining(
          [
            "altura", 
            "anioNacimiento", 
            "colorCabello", 
            "colorOjo", 
            "colorPiel", 
            "especies", 
            "fechaCreacion", 
            "fechaEdicion", 
            "genero", 
            "masa", 
            "mundoNatal", 
            "navesEstelares", 
            "nombre", 
            "partitionKey", 
            "peliculas", 
            "sortKey", 
            "url", 
            "vehiculos"
          ]
        )
      )
    })
});