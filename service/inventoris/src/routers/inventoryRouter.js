const express = require('express');
const {inventorisController} =require('../controllers/inventorisController.js')
const inventoryFindAll =require('../controllers/findAll.js')
const updateInventory =require('../controllers/inventoryUpdate.js')
const deleteInventory = require('../controllers/inventoryDelete.js')
const  findSingle = require('../controllers/inventoryFindOne.js')
const inventoryRouter = express.Router();
inventoryRouter.post('/',inventorisController)
inventoryRouter.get('/',inventoryFindAll);
inventoryRouter.get('/:id',findSingle);
inventoryRouter.put('/:id',updateInventory);
inventoryRouter.delete('/:id',deleteInventory);
module.exports = inventoryRouter;