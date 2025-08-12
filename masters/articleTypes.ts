// 記事タイプマスタデータ
export interface ArticleType {
  articleTypeId: string;
  articleTypeName: string;
  articleTypeNameRoman: string;
  description: string;
}

export const articleTypes: ArticleType[] = [
  {
    articleTypeId: "01",
    articleTypeName: "プロセス",
    articleTypeNameRoman: "process",
    description: "開発プロセスや手法に関する事例",
  },
  {
    articleTypeId: "02",
    articleTypeName: "インタビュー",
    articleTypeNameRoman: "interview",
    description: "関係者へのインタビュー記事",
  },
  {
    articleTypeId: "03",
    articleTypeName: "成果物",
    articleTypeNameRoman: "deliverable",
    description: "プロジェクトの成果物や実装結果",
  },
  {
    articleTypeId: "04",
    articleTypeName: "調査・分析",
    articleTypeNameRoman: "survey",
    description: "市場調査や技術分析に関する記事",
  },
];

// ユーティリティ関数
export const getArticleTypeById = (
  articleTypeId: string
): ArticleType | undefined => {
  return articleTypes.find((a) => a.articleTypeId === articleTypeId);
};

export const getArticleTypeByRoman = (
  roman: string
): ArticleType | undefined => {
  return articleTypes.find((a) => a.articleTypeNameRoman === roman);
};

export const getArticleTypeByName = (name: string): ArticleType | undefined => {
  return articleTypes.find((a) => a.articleTypeName === name);
};

export const getAllArticleTypes = (): ArticleType[] => {
  return articleTypes;
};
