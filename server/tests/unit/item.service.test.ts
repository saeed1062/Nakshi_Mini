import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ItemService } from '../../src/services/item.service.js';
import prisma from '../../src/config/prisma.js';

// Mock prisma client for isolated unit testing
vi.mock('../../src/config/prisma.js', () => ({
  default: {
    item: {
      findMany: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('ItemService Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should validate and create a valid item record', async () => {
    const mockItem = {
      id: 'uuid-1234',
      title: 'Terracotta Vase',
      description: 'Handmade clay pottery',
      category: 'Pottery',
      price: 450,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (prisma.item.create as any).mockResolvedValue(mockItem);

    const result = await ItemService.createItem({
      title: 'Terracotta Vase',
      description: 'Handmade clay pottery',
      category: 'Pottery',
      price: 450,
    });

    expect(prisma.item.create).toHaveBeenCalledTimes(1);
    expect(result.title).toBe('Terracotta Vase');
    expect(result.price).toBe(450);
  });

  it('should throw an error when title is missing or empty', async () => {
    await expect(
      ItemService.createItem({
        title: '',
        price: 100,
      })
    ).rejects.toThrow('Title is required');

    expect(prisma.item.create).not.toHaveBeenCalled();
  });

  it('should return a list of items ordered by newest first', async () => {
    const mockItems = [
      { id: '1', title: 'Nakshi Kantha 1', category: 'Textile', price: 1200 },
      { id: '2', title: 'Brass Lamp', category: 'Metalcraft', price: 800 },
    ];

    (prisma.item.findMany as any).mockResolvedValue(mockItems);

    const results = await ItemService.getItems();

    expect(prisma.item.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
    });
    expect(results).toHaveLength(2);
    expect(results[0].title).toBe('Nakshi Kantha 1');
  });
});
