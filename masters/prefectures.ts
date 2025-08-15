// 都道府県マスタデータ
export interface Prefecture {
  prefectureCode: string;
  areaCode: string;
  prefectureName: string;
  prefectureNameRoman: string;
}

export const prefectures: Prefecture[] = [
  // 北海道・東北エリア
  {
    prefectureCode: "01",
    areaCode: "1",
    prefectureName: "北海道",
    prefectureNameRoman: "hokkaido",
  },
  {
    prefectureCode: "02",
    areaCode: "1",
    prefectureName: "青森県",
    prefectureNameRoman: "aomori",
  },
  {
    prefectureCode: "03",
    areaCode: "1",
    prefectureName: "岩手県",
    prefectureNameRoman: "iwate",
  },
  {
    prefectureCode: "04",
    areaCode: "1",
    prefectureName: "宮城県",
    prefectureNameRoman: "miyagi",
  },
  {
    prefectureCode: "05",
    areaCode: "1",
    prefectureName: "秋田県",
    prefectureNameRoman: "akita",
  },
  {
    prefectureCode: "06",
    areaCode: "1",
    prefectureName: "山形県",
    prefectureNameRoman: "yamagata",
  },
  {
    prefectureCode: "07",
    areaCode: "1",
    prefectureName: "福島県",
    prefectureNameRoman: "fukushima",
  },

  // 関東エリア
  {
    prefectureCode: "08",
    areaCode: "2",
    prefectureName: "茨城県",
    prefectureNameRoman: "ibaraki",
  },
  {
    prefectureCode: "09",
    areaCode: "2",
    prefectureName: "栃木県",
    prefectureNameRoman: "tochigi",
  },
  {
    prefectureCode: "10",
    areaCode: "2",
    prefectureName: "群馬県",
    prefectureNameRoman: "gunma",
  },
  {
    prefectureCode: "11",
    areaCode: "2",
    prefectureName: "埼玉県",
    prefectureNameRoman: "saitama",
  },
  {
    prefectureCode: "12",
    areaCode: "2",
    prefectureName: "千葉県",
    prefectureNameRoman: "chiba",
  },
  {
    prefectureCode: "13",
    areaCode: "2",
    prefectureName: "東京都",
    prefectureNameRoman: "tokyo",
  },
  {
    prefectureCode: "14",
    areaCode: "2",
    prefectureName: "神奈川県",
    prefectureNameRoman: "kanagawa",
  },

  // 中部エリア
  {
    prefectureCode: "15",
    areaCode: "3",
    prefectureName: "新潟県",
    prefectureNameRoman: "niigata",
  },
  {
    prefectureCode: "16",
    areaCode: "3",
    prefectureName: "富山県",
    prefectureNameRoman: "toyama",
  },
  {
    prefectureCode: "17",
    areaCode: "3",
    prefectureName: "石川県",
    prefectureNameRoman: "ishikawa",
  },
  {
    prefectureCode: "18",
    areaCode: "3",
    prefectureName: "福井県",
    prefectureNameRoman: "fukui",
  },
  {
    prefectureCode: "19",
    areaCode: "3",
    prefectureName: "山梨県",
    prefectureNameRoman: "yamanashi",
  },
  {
    prefectureCode: "20",
    areaCode: "3",
    prefectureName: "長野県",
    prefectureNameRoman: "nagano",
  },
  {
    prefectureCode: "21",
    areaCode: "3",
    prefectureName: "岐阜県",
    prefectureNameRoman: "gifu",
  },
  {
    prefectureCode: "22",
    areaCode: "3",
    prefectureName: "静岡県",
    prefectureNameRoman: "shizuoka",
  },
  {
    prefectureCode: "23",
    areaCode: "3",
    prefectureName: "愛知県",
    prefectureNameRoman: "aichi",
  },

  // 関西エリア
  {
    prefectureCode: "24",
    areaCode: "4",
    prefectureName: "三重県",
    prefectureNameRoman: "mie",
  },
  {
    prefectureCode: "25",
    areaCode: "4",
    prefectureName: "滋賀県",
    prefectureNameRoman: "shiga",
  },
  {
    prefectureCode: "26",
    areaCode: "4",
    prefectureName: "京都府",
    prefectureNameRoman: "kyoto",
  },
  {
    prefectureCode: "27",
    areaCode: "4",
    prefectureName: "大阪府",
    prefectureNameRoman: "osaka",
  },
  {
    prefectureCode: "28",
    areaCode: "4",
    prefectureName: "兵庫県",
    prefectureNameRoman: "hyogo",
  },
  {
    prefectureCode: "29",
    areaCode: "4",
    prefectureName: "奈良県",
    prefectureNameRoman: "nara",
  },
  {
    prefectureCode: "30",
    areaCode: "4",
    prefectureName: "和歌山県",
    prefectureNameRoman: "wakayama",
  },

  // 中国エリア
  {
    prefectureCode: "31",
    areaCode: "5",
    prefectureName: "鳥取県",
    prefectureNameRoman: "tottori",
  },
  {
    prefectureCode: "32",
    areaCode: "5",
    prefectureName: "島根県",
    prefectureNameRoman: "shimane",
  },
  {
    prefectureCode: "33",
    areaCode: "5",
    prefectureName: "岡山県",
    prefectureNameRoman: "okayama",
  },
  {
    prefectureCode: "34",
    areaCode: "5",
    prefectureName: "広島県",
    prefectureNameRoman: "hiroshima",
  },
  {
    prefectureCode: "35",
    areaCode: "5",
    prefectureName: "山口県",
    prefectureNameRoman: "yamaguchi",
  },

  // 四国エリア
  {
    prefectureCode: "36",
    areaCode: "6",
    prefectureName: "徳島県",
    prefectureNameRoman: "tokushima",
  },
  {
    prefectureCode: "37",
    areaCode: "6",
    prefectureName: "香川県",
    prefectureNameRoman: "kagawa",
  },
  {
    prefectureCode: "38",
    areaCode: "6",
    prefectureName: "愛媛県",
    prefectureNameRoman: "ehime",
  },
  {
    prefectureCode: "39",
    areaCode: "6",
    prefectureName: "高知県",
    prefectureNameRoman: "kochi",
  },

  // 九州・沖縄エリア
  {
    prefectureCode: "40",
    areaCode: "7",
    prefectureName: "福岡県",
    prefectureNameRoman: "fukuoka",
  },
  {
    prefectureCode: "41",
    areaCode: "7",
    prefectureName: "佐賀県",
    prefectureNameRoman: "saga",
  },
  {
    prefectureCode: "42",
    areaCode: "7",
    prefectureName: "長崎県",
    prefectureNameRoman: "nagasaki",
  },
  {
    prefectureCode: "43",
    areaCode: "7",
    prefectureName: "熊本県",
    prefectureNameRoman: "kumamoto",
  },
  {
    prefectureCode: "44",
    areaCode: "7",
    prefectureName: "大分県",
    prefectureNameRoman: "oita",
  },
  {
    prefectureCode: "45",
    areaCode: "7",
    prefectureName: "宮崎県",
    prefectureNameRoman: "miyazaki",
  },
  {
    prefectureCode: "46",
    areaCode: "7",
    prefectureName: "鹿児島県",
    prefectureNameRoman: "kagoshima",
  },
  {
    prefectureCode: "47",
    areaCode: "7",
    prefectureName: "沖縄県",
    prefectureNameRoman: "okinawa",
  },
];

// エリア情報
export interface Area {
  areaCode: string;
  areaName: string;
  areaNameRoman: string;
}

export const areas: Area[] = [
  { areaCode: "1", areaName: "北海道・東北", areaNameRoman: "hokkaido-tohoku" },
  { areaCode: "2", areaName: "関東", areaNameRoman: "kanto" },
  { areaCode: "3", areaName: "中部", areaNameRoman: "chubu" },
  { areaCode: "4", areaName: "関西", areaNameRoman: "kansai" },
  { areaCode: "5", areaName: "中国", areaNameRoman: "chugoku" },
  { areaCode: "6", areaName: "四国", areaNameRoman: "shikoku" },
  { areaCode: "7", areaName: "九州・沖縄", areaNameRoman: "kyushu-okinawa" },
];

// ユーティリティ関数
export const getPrefectureByCode = (
  prefectureCode: string
): Prefecture | undefined => {
  return prefectures.find((p) => p.prefectureCode === prefectureCode);
};

export const getPrefectureByRoman = (
  prefectureNameRoman: string
): Prefecture | undefined => {
  return prefectures.find((p) => p.prefectureNameRoman === prefectureNameRoman);
};

export const getPrefecturesByArea = (areaCode: string): Prefecture[] => {
  return prefectures.filter((p) => p.areaCode === areaCode);
};

export const getAreaByCode = (areaCode: string): Area | undefined => {
  return areas.find((a) => a.areaCode === areaCode);
};
