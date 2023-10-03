

const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../models/todoModel.js');

const router = express.Router();


router.get('/', async(req, res)=>{
	//get search query from url
	const query = req.query.q;
	try{
		const results = await Todo.find({
			$or: [
 				{ title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
      			]
		});
		res.json(results);
	}catch(error){
		console.log(error);
		res.status(500).json({ error: "Error occured in during searching" })
	}
});

module.exports = router;