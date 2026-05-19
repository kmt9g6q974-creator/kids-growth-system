export interface BreakfastMenuItem {
  mainDish: string
  sideDish: string
  drink: string
  fruit: string
  prepTime: string
  nutrition: string[]
}

export const BREAKFAST_MENU: Record<number, BreakfastMenuItem> = {
  0: {
    mainDish: '牛奶燕麦粥',
    sideDish: '煮鸡蛋',
    drink: '牛奶',
    fruit: '香蕉',
    prepTime: '10分钟',
    nutrition: ['蛋白质', '膳食纤维', '钙质'],
  },
  1: {
    mainDish: '全麦面包',
    sideDish: '煎蛋',
    drink: '牛奶',
    fruit: '苹果',
    prepTime: '8分钟',
    nutrition: ['蛋白质', '碳水化合物', '维生素'],
  },
  2: {
    mainDish: '小米粥',
    sideDish: '鸡蛋饼',
    drink: '豆浆',
    fruit: '圣女果',
    prepTime: '12分钟',
    nutrition: ['蛋白质', '维生素', '膳食纤维'],
  },
  3: {
    mainDish: '燕麦牛奶',
    sideDish: '三明治',
    drink: '牛奶',
    fruit: '蓝莓',
    prepTime: '10分钟',
    nutrition: ['蛋白质', '抗氧化剂', '膳食纤维'],
  },
  4: {
    mainDish: '小馄饨',
    sideDish: '煮鸡蛋',
    drink: '牛奶',
    fruit: '橙子',
    prepTime: '15分钟',
    nutrition: ['蛋白质', '维生素C', '碳水化合物'],
  },
  5: {
    mainDish: '包子',
    sideDish: '茶叶蛋',
    drink: '豆浆',
    fruit: '葡萄',
    prepTime: '12分钟',
    nutrition: ['蛋白质', '碳水化合物', '维生素'],
  },
  6: {
    mainDish: '吐司',
    sideDish: '炒蛋',
    drink: '果汁',
    fruit: '草莓',
    prepTime: '10分钟',
    nutrition: ['蛋白质', '维生素C', '碳水化合物'],
  },
}

export const BREAKFAST_ALTERNATIVES: BreakfastMenuItem[] = [
  {
    mainDish: '面条',
    sideDish: '荷包蛋',
    drink: '豆浆',
    fruit: '梨',
    prepTime: '12分钟',
    nutrition: ['蛋白质', '碳水化合物', '维生素'],
  },
  {
    mainDish: '粥',
    sideDish: '咸菜',
    drink: '牛奶',
    fruit: '桃子',
    prepTime: '15分钟',
    nutrition: ['蛋白质', '维生素', '膳食纤维'],
  },
  {
    mainDish: '煎饼',
    sideDish: '鸡蛋',
    drink: '豆浆',
    fruit: '猕猴桃',
    prepTime: '10分钟',
    nutrition: ['蛋白质', '维生素C', '碳水化合物'],
  },
  {
    mainDish: '馒头',
    sideDish: '煮蛋',
    drink: '牛奶',
    fruit: '樱桃',
    prepTime: '8分钟',
    nutrition: ['蛋白质', '碳水化合物', '维生素'],
  },
  {
    mainDish: '蛋糕',
    sideDish: '酸奶',
    drink: '牛奶',
    fruit: '芒果',
    prepTime: '5分钟',
    nutrition: ['蛋白质', '益生菌', '维生素'],
  },
]
