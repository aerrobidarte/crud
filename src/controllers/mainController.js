const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: function(req, res){
		let pvisited=products.filter(function(pr){
			return pr.category=='visited';
		});
		let offers=products.filter(function(pr){
			return pr.category=='in-sale';
		});

		res.render('index',{pvisited:pvisited,offers:offers});
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;

