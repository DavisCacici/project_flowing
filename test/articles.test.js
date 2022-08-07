const axios = require('axios');

describe('api/articles API Endpoint', () => {

    it('should return model Articles', async () =>{
        const response = await axios.get('http://localhost:3000/api/articles');

        const articles = [
            {
                description: "Bibita",
                name: "Coca Cola",
                price: 2,
                _id: "62ecffe4a53abc2ae864f2f0",
            },
            {
                description: "Caffetteria",
                name: "Coffé",
                price: 1,
                _id: "62ed02b79c408cf78d388366",
            },
            {
                description: "Coktail",
                name: "Aperol Spritz",
                price: 5,
                _id: "62ed13c7346fd6a6a8f5c813",
            }
        ]

        expect(response.status).toBe(200);
        expect(response.data).toEqual(articles);            
        
    });
})
