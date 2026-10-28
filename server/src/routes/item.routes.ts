import { Router } from 'express';
import { ItemController } from '../controllers/item.controller.js';

const router = Router();

router.get('/', ItemController.getItems);
router.post('/', ItemController.createItem);
router.delete('/:id', ItemController.deleteItem);

export default router;
