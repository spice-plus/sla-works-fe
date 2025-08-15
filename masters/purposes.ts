// 目的マスタデータ
export interface Purpose {
  purposeId: number;
  purposeName: string;
  purposeNameRoman: string;
  description: string;
}

export const purposes: Purpose[] = [
  {
    purposeId: 1,
    purposeName: "新規事業・サービス立ち上げ",
    purposeNameRoman: "new-business",
    description: "新しいビジネスやサービスの立ち上げを支援するシステム開発",
  },
  {
    purposeId: 2,
    purposeName: "売上拡大",
    purposeNameRoman: "sales-expansion",
    description: "売上向上や収益拡大を目的としたシステム導入・改善",
  },
  {
    purposeId: 3,
    purposeName: "顧客体験向上",
    purposeNameRoman: "customer-experience",
    description: "顧客満足度向上やユーザー体験改善のためのシステム構築",
  },
  {
    purposeId: 4,
    purposeName: "業務生産性向上",
    purposeNameRoman: "productivity",
    description: "業務効率化や生産性向上を目的としたシステム導入",
  },
  {
    purposeId: 5,
    purposeName: "データ活用",
    purposeNameRoman: "data-utilization",
    description: "データ分析や活用による意思決定支援システムの構築",
  },
  {
    purposeId: 6,
    purposeName: "DX推進",
    purposeNameRoman: "dx-promotion",
    description: "デジタルトランスフォーメーションの推進と実現",
  },
  {
    purposeId: 7,
    purposeName: "セキュリティ対策",
    purposeNameRoman: "security",
    description: "情報セキュリティ強化やリスク対策のためのシステム導入",
  },
  {
    purposeId: 8,
    purposeName: "働き方改革",
    purposeNameRoman: "work-style-reform",
    description: "働き方改革や労働環境改善を支援するシステム構築",
  },
  {
    purposeId: 9,
    purposeName: "レガシーシステム刷新",
    purposeNameRoman: "legacy-renewal",
    description: "既存システムの近代化や刷新プロジェクト",
  },
  {
    purposeId: 10,
    purposeName: "グローバル展開対応",
    purposeNameRoman: "global-expansion",
    description: "海外展開や国際化対応のためのシステム構築",
  },
];

// ユーティリティ関数
export const getPurposeById = (purposeId: number): Purpose | undefined => {
  return purposes.find((p) => p.purposeId === purposeId);
};

export const getPurposeByRoman = (roman: string): Purpose | undefined => {
  return purposes.find((p) => p.purposeNameRoman === roman);
};

export const getPurposeByName = (name: string): Purpose | undefined => {
  return purposes.find((p) => p.purposeName === name);
};

export const getAllPurposes = (): Purpose[] => {
  return purposes;
};
