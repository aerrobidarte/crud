const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: function (req, res) {
		res.render('products',{products:products});
	},

	// Detail - Detail from one product
	detail: function (req,res) {
		let producto=products.find(function(pr){
			return pr.id==req.params.id;
		});
		res.render('detail',{producto:producto})
		// Do the magic
	},

	// Create - Form to create
	create: function (req,res){
		res.render('product-create-form')
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		res.send("Soy UN post")
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;