import prisma from '../config/prisma.js';

export class ItemService {
  static async getItems() {
    return prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  static async createItem(data: any) {
    if (!data.title) {
      throw new Error('Title is required');
    }

    return prisma.item.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category || 'Craft',
        price: Number(data.price || 0),
      },
    });
  }

  static async deleteItem(id: string) {
    return prisma.item.delete({
      where: { id },
    });
  }
}
