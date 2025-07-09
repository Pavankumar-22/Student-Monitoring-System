const express = require('express');
const router = express.Router();

router.get("/",(req,res) =>{
    res.json({"users":['user1','user2','user3','user four']})
})

module.exports = router;