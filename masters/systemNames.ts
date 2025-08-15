// システム名マスタデータ
export interface SystemName {
  systemId: number;
  categoryId: number;
  systemName: string;
  systemNameRoman: string;
  description: string;
}

export const systemNames: SystemName[] = [
  // 基幹業務 (categoryId: 1)
  {
    systemId: 1,
    categoryId: 1,
    systemName: "ERP・基幹システム",
    systemNameRoman: "erp",
    description: "企業の基幹業務を統合管理するシステム",
  },
  {
    systemId: 2,
    categoryId: 1,
    systemName: "業務管理システム",
    systemNameRoman: "business-management",
    description: "各種業務プロセスを管理するシステム",
  },
  {
    systemId: 3,
    categoryId: 1,
    systemName: "財務・会計システム",
    systemNameRoman: "accounting",
    description: "財務・会計業務を管理するシステム",
  },
  {
    systemId: 4,
    categoryId: 1,
    systemName: "人事・給与システム",
    systemNameRoman: "hr-payroll",
    description: "人事管理・給与計算システム",
  },
  {
    systemId: 5,
    categoryId: 1,
    systemName: "勤怠管理システム",
    systemNameRoman: "attendance",
    description: "従業員の勤怠を管理するシステム",
  },
  {
    systemId: 6,
    categoryId: 1,
    systemName: "販売管理システム",
    systemNameRoman: "sales-management",
    description: "販売業務を管理するシステム",
  },
  {
    systemId: 7,
    categoryId: 1,
    systemName: "在庫管理システム",
    systemNameRoman: "inventory",
    description: "在庫の管理・最適化システム",
  },
  {
    systemId: 8,
    categoryId: 1,
    systemName: "倉庫管理システム（WMS）",
    systemNameRoman: "wms",
    description: "倉庫内の作業・在庫を管理するシステム",
  },
  {
    systemId: 9,
    categoryId: 1,
    systemName: "受発注管理システム・EDI",
    systemNameRoman: "order-edi",
    description: "受発注業務とEDI連携システム",
  },
  {
    systemId: 10,
    categoryId: 1,
    systemName: "生産管理システム",
    systemNameRoman: "production",
    description: "製造業の生産計画・実績管理システム",
  },
  {
    systemId: 11,
    categoryId: 1,
    systemName: "原価管理システム",
    systemNameRoman: "cost-management",
    description: "製品・サービスの原価を管理するシステム",
  },
  {
    systemId: 12,
    categoryId: 1,
    systemName: "調達・購買管理システム",
    systemNameRoman: "procurement",
    description: "調達・購買業務を管理するシステム",
  },
  {
    systemId: 13,
    categoryId: 1,
    systemName: "SCM（サプライチェーン管理）",
    systemNameRoman: "scm",
    description: "サプライチェーン全体を最適化するシステム",
  },

  // 顧客・営業 (categoryId: 2)
  {
    systemId: 14,
    categoryId: 2,
    systemName: "CRM・顧客管理システム",
    systemNameRoman: "crm",
    description: "顧客関係管理システム",
  },
  {
    systemId: 15,
    categoryId: 2,
    systemName: "SFA・営業支援システム",
    systemNameRoman: "sfa",
    description: "営業活動を支援・管理するシステム",
  },
  {
    systemId: 16,
    categoryId: 2,
    systemName: "MA・マーケティングオートメーション",
    systemNameRoman: "ma",
    description: "マーケティング活動を自動化するシステム",
  },
  {
    systemId: 17,
    categoryId: 2,
    systemName: "CTI・コールセンターシステム",
    systemNameRoman: "cti",
    description: "コールセンター業務を支援するシステム",
  },
  {
    systemId: 18,
    categoryId: 2,
    systemName: "会員管理システム",
    systemNameRoman: "membership",
    description: "会員情報・サービスを管理するシステム",
  },

  // Web・EC (categoryId: 3)
  {
    systemId: 19,
    categoryId: 3,
    systemName: "ECサイト・通販システム",
    systemNameRoman: "ec-site",
    description: "電子商取引サイトシステム",
  },
  {
    systemId: 20,
    categoryId: 3,
    systemName: "予約システム",
    systemNameRoman: "reservation",
    description: "予約受付・管理システム",
  },
  {
    systemId: 21,
    categoryId: 3,
    systemName: "CMS・コンテンツ管理",
    systemNameRoman: "cms",
    description: "Webコンテンツ管理システム",
  },
  {
    systemId: 22,
    categoryId: 3,
    systemName: "マッチングシステム",
    systemNameRoman: "matching",
    description: "ユーザー同士をマッチングするシステム",
  },
  {
    systemId: 23,
    categoryId: 3,
    systemName: "チャットボット",
    systemNameRoman: "chatbot",
    description: "自動応答・対話システム",
  },

  // 店舗・施設 (categoryId: 4)
  {
    systemId: 24,
    categoryId: 4,
    systemName: "POSシステム",
    systemNameRoman: "pos",
    description: "販売時点情報管理システム",
  },
  {
    systemId: 25,
    categoryId: 4,
    systemName: "決済システム",
    systemNameRoman: "payment",
    description: "各種決済処理システム",
  },
  {
    systemId: 26,
    categoryId: 4,
    systemName: "ホテル・宿泊管理システム（PMS）",
    systemNameRoman: "pms",
    description: "ホテル・宿泊施設管理システム",
  },
  {
    systemId: 27,
    categoryId: 4,
    systemName: "飲食店管理システム",
    systemNameRoman: "restaurant",
    description: "飲食店の運営管理システム",
  },
  {
    systemId: 28,
    categoryId: 4,
    systemName: "不動産管理システム",
    systemNameRoman: "real-estate",
    description: "不動産物件・契約管理システム",
  },

  // 情報共有・業務支援 (categoryId: 5)
  {
    systemId: 29,
    categoryId: 5,
    systemName: "グループウェア",
    systemNameRoman: "groupware",
    description: "組織内の情報共有・コミュニケーションシステム",
  },
  {
    systemId: 30,
    categoryId: 5,
    systemName: "ワークフローシステム",
    systemNameRoman: "workflow",
    description: "業務プロセスの自動化・管理システム",
  },
  {
    systemId: 31,
    categoryId: 5,
    systemName: "文書管理システム",
    systemNameRoman: "document-management",
    description: "文書の作成・保管・共有システム",
  },
  {
    systemId: 32,
    categoryId: 5,
    systemName: "プロジェクト管理システム",
    systemNameRoman: "project-management",
    description: "プロジェクトの計画・進捗管理システム",
  },
  {
    systemId: 33,
    categoryId: 5,
    systemName: "ナレッジ管理システム",
    systemNameRoman: "knowledge-management",
    description: "組織の知識・ノウハウ管理システム",
  },
  {
    systemId: 34,
    categoryId: 5,
    systemName: "社内ポータル・イントラネット",
    systemNameRoman: "intranet",
    description: "社内情報ポータルサイト",
  },
  {
    systemId: 35,
    categoryId: 5,
    systemName: "eラーニングシステム",
    systemNameRoman: "e-learning",
    description: "オンライン学習・研修システム",
  },

  // データ・AI (categoryId: 6)
  {
    systemId: 36,
    categoryId: 6,
    systemName: "BI・データ分析システム",
    systemNameRoman: "bi",
    description: "ビジネスインテリジェンス・データ分析システム",
  },
  {
    systemId: 37,
    categoryId: 6,
    systemName: "DWH・データウェアハウス",
    systemNameRoman: "dwh",
    description: "データ統合・蓄積システム",
  },
  {
    systemId: 38,
    categoryId: 6,
    systemName: "AI・RAG",
    systemNameRoman: "ai-rag",
    description: "人工知能・検索拡張生成システム",
  },
  {
    systemId: 39,
    categoryId: 6,
    systemName: "RPA",
    systemNameRoman: "rpa",
    description: "ロボティック・プロセス・オートメーション",
  },
  {
    systemId: 40,
    categoryId: 6,
    systemName: "画像処理・解析システム",
    systemNameRoman: "image-processing",
    description: "画像・映像の処理・解析システム",
  },
  {
    systemId: 41,
    categoryId: 6,
    systemName: "検索システム",
    systemNameRoman: "search",
    description: "高度な検索・情報検索システム",
  },

  // 物流・運輸 (categoryId: 7)
  {
    systemId: 42,
    categoryId: 7,
    systemName: "物流・配送管理システム（TMS）",
    systemNameRoman: "tms",
    description: "輸送管理システム",
  },
  {
    systemId: 43,
    categoryId: 7,
    systemName: "車両・配車管理システム",
    systemNameRoman: "fleet-management",
    description: "車両運行・配車最適化システム",
  },
  {
    systemId: 44,
    categoryId: 7,
    systemName: "地図・位置情報システム（GPS・GIS）",
    systemNameRoman: "gps-gis",
    description: "位置情報・地理情報システム",
  },

  // 業界特化 (categoryId: 8)
  {
    systemId: 45,
    categoryId: 8,
    systemName: "電子カルテ・医療システム",
    systemNameRoman: "medical",
    description: "医療機関向け電子カルテ・診療支援システム",
  },
  {
    systemId: 46,
    categoryId: 8,
    systemName: "介護システム",
    systemNameRoman: "care",
    description: "介護事業者向け管理システム",
  },
  {
    systemId: 47,
    categoryId: 8,
    systemName: "建築・建設管理システム",
    systemNameRoman: "construction",
    description: "建設プロジェクト管理システム",
  },

  // インフラ・基盤 (categoryId: 9)
  {
    systemId: 48,
    categoryId: 9,
    systemName: "ネットワーク構築",
    systemNameRoman: "network",
    description: "ネットワークインフラの構築・運用",
  },
  {
    systemId: 49,
    categoryId: 9,
    systemName: "サーバー構築・移行",
    systemNameRoman: "server",
    description: "サーバーシステムの構築・移行",
  },
  {
    systemId: 50,
    categoryId: 9,
    systemName: "クラウド移行・構築",
    systemNameRoman: "cloud-migration",
    description: "クラウド環境への移行・構築",
  },
  {
    systemId: 51,
    categoryId: 9,
    systemName: "データベース構築・移行",
    systemNameRoman: "database",
    description: "データベースシステムの構築・移行",
  },
  {
    systemId: 52,
    categoryId: 9,
    systemName: "セキュリティ対策システム",
    systemNameRoman: "security",
    description: "情報セキュリティ対策システム",
  },
  {
    systemId: 53,
    categoryId: 9,
    systemName: "バックアップ・災害対策システム",
    systemNameRoman: "backup-dr",
    description: "データバックアップ・災害復旧システム",
  },
  {
    systemId: 54,
    categoryId: 9,
    systemName: "メールシステム",
    systemNameRoman: "mail",
    description: "企業向けメールシステム",
  },
  {
    systemId: 55,
    categoryId: 9,
    systemName: "API連携・統合システム",
    systemNameRoman: "api-integration",
    description: "システム間連携・統合基盤",
  },

  // 先端技術 (categoryId: 10)
  {
    systemId: 56,
    categoryId: 10,
    systemName: "IoT・センサーシステム",
    systemNameRoman: "iot",
    description: "IoTデバイス・センサー活用システム",
  },
  {
    systemId: 57,
    categoryId: 10,
    systemName: "VR・ARシステム",
    systemNameRoman: "vr-ar",
    description: "仮想現実・拡張現実システム",
  },
  {
    systemId: 58,
    categoryId: 10,
    systemName: "ブロックチェーンシステム",
    systemNameRoman: "blockchain",
    description: "ブロックチェーン技術活用システム",
  },
  {
    systemId: 59,
    categoryId: 10,
    systemName: "動画配信システム",
    systemNameRoman: "video-streaming",
    description: "動画ストリーミング・配信システム",
  },
  {
    systemId: 60,
    categoryId: 10,
    systemName: "モバイルシステム",
    systemNameRoman: "mobile",
    description: "モバイルアプリケーション・システム",
  },
  {
    systemId: 61,
    categoryId: 10,
    systemName: "組込みシステム",
    systemNameRoman: "embedded",
    description: "組込み・制御システム",
  },
  {
    systemId: 62,
    categoryId: 10,
    systemName: "決済・フィンテックシステム",
    systemNameRoman: "fintech",
    description: "金融技術・決済システム",
  },
];

// ユーティリティ関数
export const getSystemNameById = (systemId: number): SystemName | undefined => {
  return systemNames.find((s) => s.systemId === systemId);
};

export const getSystemNameByRoman = (roman: string): SystemName | undefined => {
  return systemNames.find((s) => s.systemNameRoman === roman);
};

export const getSystemNameByName = (name: string): SystemName | undefined => {
  return systemNames.find((s) => s.systemName === name);
};

export const getSystemNamesByCategory = (categoryId: number): SystemName[] => {
  return systemNames.filter((s) => s.categoryId === categoryId);
};

export const getAllSystemNames = (): SystemName[] => {
  return systemNames;
};
