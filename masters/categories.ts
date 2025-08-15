// カテゴリマスタデータ
export interface Category {
  categoryId: number;
  categoryName: string;
  categoryNameRoman: string;
  description: string;
}

export const categories: Category[] = [
  {
    categoryId: 1,
    categoryName: "基幹業務",
    categoryNameRoman: "core-business",
    description: "ERP、財務会計、人事給与などの基幹業務システム",
  },
  {
    categoryId: 2,
    categoryName: "顧客・営業",
    categoryNameRoman: "customer-sales",
    description:
      "CRM、SFA、マーケティングオートメーションなどの顧客・営業支援システム",
  },
  {
    categoryId: 3,
    categoryName: "Web・EC",
    categoryNameRoman: "web-ec",
    description: "ECサイト、予約システム、CMSなどのWeb・EC関連システム",
  },
  {
    categoryId: 4,
    categoryName: "店舗・施設",
    categoryNameRoman: "store-facility",
    description: "POS、決済、ホテル管理などの店舗・施設運営システム",
  },
  {
    categoryId: 5,
    categoryName: "情報共有・業務支援",
    categoryNameRoman: "collaboration",
    description:
      "グループウェア、ワークフロー、文書管理などの情報共有・業務支援システム",
  },
  {
    categoryId: 6,
    categoryName: "データ・AI",
    categoryNameRoman: "data-ai",
    description: "BI、データ分析、AI・機械学習などのデータ活用システム",
  },
  {
    categoryId: 7,
    categoryName: "物流・運輸",
    categoryNameRoman: "logistics",
    description: "物流管理、配送管理、車両管理などの物流・運輸システム",
  },
  {
    categoryId: 8,
    categoryName: "業界特化",
    categoryNameRoman: "industry-specific",
    description: "医療、介護、建設などの業界特化システム",
  },
  {
    categoryId: 9,
    categoryName: "インフラ・基盤",
    categoryNameRoman: "infrastructure",
    description:
      "ネットワーク、サーバー、クラウド、セキュリティなどのITインフラ・基盤システム",
  },
  {
    categoryId: 10,
    categoryName: "先端技術",
    categoryNameRoman: "advanced-tech",
    description:
      "IoT、VR・AR、ブロックチェーン、フィンテックなどの先端技術システム",
  },
];

// ユーティリティ関数
export const getCategoryById = (categoryId: number): Category | undefined => {
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
