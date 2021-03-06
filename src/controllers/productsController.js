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

		if(req.file){
			if (products==""){
				products=[];
			}
	
			let producto=req.body;
			producto.image=req.file.filename;

			products.push(producto);
			fs.writeFileSync(productsFilePath,JSON.stringify(products));
			res.redirect("/products");
		}else{
			console.log("llego");
			res.redirect("/products/create");
		}
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

		fs.writeFileSync(productsFilePath,JSON.stringify(products));

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
		fs.writeFileSync(productsFilePath,JSON.stringify(products));
		//products.splice
		//products.splice
		// Do the magic
	}
};

module.exports = controller;