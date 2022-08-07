const axios = require('axios');
const Orders = require('../../model/Orders');

describe('api/add_to_cart API Endpoint', () => {

    it('should return model Orders', async () =>{
        const response = await axios.post('http://localhost:3000/api/add_to_cart');

        const articles = [
            {
                description: "Bibita",
                name: "Coca Cola",
                price: 2,
                _id: "62ecffe4a53abc2ae864f2f0",
            }
        ]

        // expect(response.status).toBe(200);
        expect(response.data[0]).toEqual(articles);            
        
    })
})
