import prisma from '../config/prisma.js';

export interface CreateItemDTO {
  title: string;
  description?: string;
  category?: string;
  price?: number;
}

export class ItemService {
  /**
   * Fetch all records ordered by newest first
   */
  static async getItems() {
    return prisma.item.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Create a new record in the database
   */
  static async createItem(data: CreateItemDTO) {
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('Title is required');
    }

    return prisma.item.create({
      data: {
        title: data.title.trim(),
        description: data.description?.trim() || null,
        category: data.category?.trim() || 'Craft',
        price: typeof data.price === 'number' ? data.price : parseFloat(data.price || '0'),
      },
    });
  }

  /**
   * Delete an item by ID
   */
  static async deleteItem(id: string) {
    return prisma.item.delete({
      where: { id },
    });
  }
}
