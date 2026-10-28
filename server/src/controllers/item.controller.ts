import { Request, Response } from 'express';
import { ItemService } from '../services/item.service.js';

export class ItemController {
  static async getItems(req: Request, res: Response): Promise<void> {
    try {
      const items = await ItemService.getItems();
      res.status(200).json({ success: true, data: items });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || 'Failed to fetch items' });
    }
  }

  static async createItem(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, category, price } = req.body;
      const newItem = await ItemService.createItem({
        title,
        description,
        category,
        price,
      });
      res.status(201).json({ success: true, data: newItem });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message || 'Failed to create item' });
    }
  }

  static async deleteItem(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await ItemService.deleteItem(id);
      res.status(200).json({ success: true, message: 'Item deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message || 'Failed to delete item' });
    }
  }
}
