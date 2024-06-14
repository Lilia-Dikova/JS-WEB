const { request } = require("express");
const { createPart, getPartById, updatePart } = require("../services/parts");


module.exports = {
    createController: {
        get: (req, res) => {
            res.render('create');
        },
        post: (req, res) =>{
            const {name, price, description} = req.body;

            if (!name || !price || !description) {
                //Missing fields
                res.render('create', {name, price, description, error: { name: !name, price: !price, description: !description}});
                return;
            }

            const result = createPart(req.body);
            res.redirect('/catalog/' + result.id);
        }
    },
    editController: {
        get: (req, res) => {
            const { id } = req.params;
            const part = getPartById(id);

            if (!part) {
                res.redirect('/404');
            }
            res.render('edit', part);
        },
        post: (req, res)=> {
            const { id } = req.params;
            const {name, price,stock, description} = req.body;

            if (!name || !price || !description || !stock) {
                //Missing fields
                res.render('edit', {name, price, description, error: { name: !name, price: !price, description: !description, stock: !stock}});
                return;
            }
            const result = updatePart(id, req.body);
            res.redirect('/catalog/'+ result.id);

        }

    }
};