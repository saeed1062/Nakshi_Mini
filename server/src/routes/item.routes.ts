import { Router, Request, Response } from 'express';
import { ItemService } from '../services/item.service.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const data = await ItemService.getItems();
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const data = await ItemService.createItem(req.body);
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await ItemService.deleteItem(id);
    res.json({ success: true, message: 'Item deleted' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
