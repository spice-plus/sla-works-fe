// カテゴリマスタデータ
export interface Category {
  categoryId: string;
  categoryName: string;
  categoryNameRoman: string;
  description: string;
}

export const categories: Category[] = [
  {
    categoryId: "1",
    categoryName: "システム開発",
    categoryNameRoman: "system-development",
    description: "基幹システムやWebアプリケーションの開発事例",
  },
  {
    categoryId: "2",
    categoryName: "DX",
    categoryNameRoman: "digital-transformation",
    description: "デジタルトランスフォーメーションの推進事例",
  },
  {
    categoryId: "3",
    categoryName: "セキュリティ",
    categoryNameRoman: "security",
    description: "サイバーセキュリティとデータ保護の取り組み",
  },
  {
    categoryId: "4",
    categoryName: "AI",
    categoryNameRoman: "artificial-intelligence",
    description: "人工知能と機械学習の実装事例",
  },
  {
    categoryId: "5",
    categoryName: "クラウド・インフラ",
    categoryNameRoman: "cloud-infrastructure",
    description: "クラウド移行とインフラ構築の事例",
  },
  {
    categoryId: "6",
    categoryName: "VR",
    categoryNameRoman: "virtual-reality",
    description: "バーチャルリアリティ技術の活用事例",
  },
  {
    categoryId: "7",
    categoryName: "ブロックチェーン・Web3",
    categoryNameRoman: "blockchain-web3",
    description: "ブロックチェーンとWeb3技術の実装",
  },
];

// ユーティリティ関数
export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find((c) => c.categoryId === categoryId);
};

export const getCategoryByRoman = (roman: string): Category | undefined => {
  return categories.find((c) => c.categoryNameRoman === roman);
};

export const getCategoryByName = (name: string): Category | undefined => {
  return categories.find((c) => c.categoryName === name);
};

export const getAllCategories = (): Category[] => {
  return categories;
};
