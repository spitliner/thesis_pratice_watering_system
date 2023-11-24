import express from "express";

const router = express.Router();

router.put('/', async (request, response) => {
    try {
        const {username, password, name, surname, email, phone_number} = request.body;
        if (true) {

        }

    } catch (error) {

    }
});

router.get('/',async (request, response) => {
    try {
        
    } catch (error) {
        
    }
});

router.post('/', async (request, response) => {
    try {
        const {username, password} = request.body;
        
    } catch (error) {

    }
});

module.exports = router;