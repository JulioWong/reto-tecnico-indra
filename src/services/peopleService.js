const BaseApi = require('../core/base.api')
const { peopleAdapter } = require('../adapters') 
const { peopleRepository } = require('../repositories') 
const BASE_URI_SWAPI = `${process.env.BASE_URI_SWAPI}`
const repository = new peopleRepository()

class PeopleService extends BaseApi{
    
    async registerPeople(peopleId) {
        let data = {};
        this.url = `${BASE_URI_SWAPI}/people/${peopleId}`
        try {
            const response = await this.get()
            if (!this.isOk(response)) return false
            else data = response.data
        } catch (error) { console.log(error)}

        if (Object.entries(data).length === 0) return false
        repository.put(
            peopleId,
            peopleAdapter(data)
        )
        return true
    }

    async getPeopleFromDynamoDB(peopleId) {
        return await repository.get(peopleId)
    }
}

module.exports = PeopleService