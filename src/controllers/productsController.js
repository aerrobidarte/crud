const { json } = require('express/lib/response');
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
	store: function (req, res) {
		let usuario={
			id: req.body.id,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.body.image,
		}
		products.push(usuario);
		let ptos=JSON.stringify(products);
		fs.writeFileSync(productsFilePath,ptos);

		console.log(products);
		res.redirect("/products");
		//res.send("Soy UN post")
		// Do the magic
	},

	// Update - Form to edit
	edit: function (req,res){
		let pto=products.find(function(pr){
			return pr.id==req.params.id;
		});
		res.render("product-edit-form",{pto:pto});
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		let pto=products.find(function(pr){
			return pr.id==req.params.id;
		});
		let i=products.indexOf(pto);
		// console.log(pto);
		products[i].name=req.body.name;
		products[i].price=req.body.price;
		products[i].discount=req.body.discount;
		products[i].category=req.body.category;
		products[i].description=req.body.description;

		res.redirect("/products");
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let pto=products.find(function(pr){
			return pr.id==req.params.id;
		});
		let i=products.indexOf(pto);
		products.splice (i, 1);
		res.redirect("/products");
		//products.splice
		//products.splice
		// Do the magic
	}
};

module.exports = controller;