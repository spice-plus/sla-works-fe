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
    prefectureNameRoman: "Hokkaido",
  },
  {
    prefectureCode: "02",
    areaCode: "1",
    prefectureName: "青森県",
    prefectureNameRoman: "Aomori",
  },
  {
    prefectureCode: "03",
    areaCode: "1",
    prefectureName: "岩手県",
    prefectureNameRoman: "Iwate",
  },
  {
    prefectureCode: "04",
    areaCode: "1",
    prefectureName: "宮城県",
    prefectureNameRoman: "Miyagi",
  },
  {
    prefectureCode: "05",
    areaCode: "1",
    prefectureName: "秋田県",
    prefectureNameRoman: "Akita",
  },
  {
    prefectureCode: "06",
    areaCode: "1",
    prefectureName: "山形県",
    prefectureNameRoman: "Yamagata",
  },
  {
    prefectureCode: "07",
    areaCode: "1",
    prefectureName: "福島県",
    prefectureNameRoman: "Fukushima",
  },

  // 関東エリア
  {
    prefectureCode: "08",
    areaCode: "2",
    prefectureName: "茨城県",
    prefectureNameRoman: "Ibaraki",
  },
  {
    prefectureCode: "09",
    areaCode: "2",
    prefectureName: "栃木県",
    prefectureNameRoman: "Tochigi",
  },
  {
    prefectureCode: "10",
    areaCode: "2",
    prefectureName: "群馬県",
    prefectureNameRoman: "Gunma",
  },
  {
    prefectureCode: "11",
    areaCode: "2",
    prefectureName: "埼玉県",
    prefectureNameRoman: "Saitama",
  },
  {
    prefectureCode: "12",
    areaCode: "2",
    prefectureName: "千葉県",
    prefectureNameRoman: "Chiba",
  },
  {
    prefectureCode: "13",
    areaCode: "2",
    prefectureName: "東京都",
    prefectureNameRoman: "Tokyo",
  },
  {
    prefectureCode: "14",
    areaCode: "2",
    prefectureName: "神奈川県",
    prefectureNameRoman: "Kanagawa",
  },

  // 中部エリア
  {
    prefectureCode: "15",
    areaCode: "3",
    prefectureName: "新潟県",
    prefectureNameRoman: "Niigata",
  },
  {
    prefectureCode: "16",
    areaCode: "3",
    prefectureName: "富山県",
    prefectureNameRoman: "Toyama",
  },
  {
    prefectureCode: "17",
    areaCode: "3",
    prefectureName: "石川県",
    prefectureNameRoman: "Ishikawa",
  },
  {
    prefectureCode: "18",
    areaCode: "3",
    prefectureName: "福井県",
    prefectureNameRoman: "Fukui",
  },
  {
    prefectureCode: "19",
    areaCode: "3",
    prefectureName: "山梨県",
    prefectureNameRoman: "Yamanashi",
  },
  {
    prefectureCode: "20",
    areaCode: "3",
    prefectureName: "長野県",
    prefectureNameRoman: "Nagano",
  },
  {
    prefectureCode: "21",
    areaCode: "3",
    prefectureName: "岐阜県",
    prefectureNameRoman: "Gifu",
  },
  {
    prefectureCode: "22",
    areaCode: "3",
    prefectureName: "静岡県",
    prefectureNameRoman: "Shizuoka",
  },
  {
    prefectureCode: "23",
    areaCode: "3",
    prefectureName: "愛知県",
    prefectureNameRoman: "Aichi",
  },

  // 関西エリア
  {
    prefectureCode: "24",
    areaCode: "4",
    prefectureName: "三重県",
    prefectureNameRoman: "Mie",
  },
  {
    prefectureCode: "25",
    areaCode: "4",
    prefectureName: "滋賀県",
    prefectureNameRoman: "Shiga",
  },
  {
    prefectureCode: "26",
    areaCode: "4",
    prefectureName: "京都府",
    prefectureNameRoman: "Kyoto",
  },
  {
    prefectureCode: "27",
    areaCode: "4",
    prefectureName: "大阪府",
    prefectureNameRoman: "Osaka",
  },
  {
    prefectureCode: "28",
    areaCode: "4",
    prefectureName: "兵庫県",
    prefectureNameRoman: "Hyogo",
  },
  {
    prefectureCode: "29",
    areaCode: "4",
    prefectureName: "奈良県",
    prefectureNameRoman: "Nara",
  },
  {
    prefectureCode: "30",
    areaCode: "4",
    prefectureName: "和歌山県",
    prefectureNameRoman: "Wakayama",
  },

  // 中国エリア
  {
    prefectureCode: "31",
    areaCode: "5",
    prefectureName: "鳥取県",
    prefectureNameRoman: "Tottori",
  },
  {
    prefectureCode: "32",
    areaCode: "5",
    prefectureName: "島根県",
    prefectureNameRoman: "Shimane",
  },
  {
    prefectureCode: "33",
    areaCode: "5",
    prefectureName: "岡山県",
    prefectureNameRoman: "Okayama",
  },
  {
    prefectureCode: "34",
    areaCode: "5",
    prefectureName: "広島県",
    prefectureNameRoman: "Hiroshima",
  },
  {
    prefectureCode: "35",
    areaCode: "5",
    prefectureName: "山口県",
    prefectureNameRoman: "Yamaguchi",
  },

  // 四国エリア
  {
    prefectureCode: "36",
    areaCode: "6",
    prefectureName: "徳島県",
    prefectureNameRoman: "Tokushima",
  },
  {
    prefectureCode: "37",
    areaCode: "6",
    prefectureName: "香川県",
    prefectureNameRoman: "Kagawa",
  },
  {
    prefectureCode: "38",
    areaCode: "6",
    prefectureName: "愛媛県",
    prefectureNameRoman: "Ehime",
  },
  {
    prefectureCode: "39",
    areaCode: "6",
    prefectureName: "高知県",
    prefectureNameRoman: "Kochi",
  },

  // 九州・沖縄エリア
  {
    prefectureCode: "40",
    areaCode: "7",
    prefectureName: "福岡県",
    prefectureNameRoman: "Fukuoka",
  },
  {
    prefectureCode: "41",
    areaCode: "7",
    prefectureName: "佐賀県",
    prefectureNameRoman: "Saga",
  },
  {
    prefectureCode: "42",
    areaCode: "7",
    prefectureName: "長崎県",
    prefectureNameRoman: "Nagasaki",
  },
  {
    prefectureCode: "43",
    areaCode: "7",
    prefectureName: "熊本県",
    prefectureNameRoman: "Kumamoto",
  },
  {
    prefectureCode: "44",
    areaCode: "7",
    prefectureName: "大分県",
    prefectureNameRoman: "Oita",
  },
  {
    prefectureCode: "45",
    areaCode: "7",
    prefectureName: "宮崎県",
    prefectureNameRoman: "Miyazaki",
  },
  {
    prefectureCode: "46",
    areaCode: "7",
    prefectureName: "鹿児島県",
    prefectureNameRoman: "Kagoshima",
  },
  {
    prefectureCode: "47",
    areaCode: "7",
    prefectureName: "沖縄県",
    prefectureNameRoman: "Okinawa",
  },
];

// エリア情報
export interface Area {
  areaCode: string;
  areaName: string;
  areaNameRoman: string;
}

export const areas: Area[] = [
  { areaCode: "1", areaName: "北海道・東北", areaNameRoman: "Hokkaido-Tohoku" },
  { areaCode: "2", areaName: "関東", areaNameRoman: "Kanto" },
  { areaCode: "3", areaName: "中部", areaNameRoman: "Chubu" },
  { areaCode: "4", areaName: "関西", areaNameRoman: "Kansai" },
  { areaCode: "5", areaName: "中国", areaNameRoman: "Chugoku" },
  { areaCode: "6", areaName: "四国", areaNameRoman: "Shikoku" },
  { areaCode: "7", areaName: "九州・沖縄", areaNameRoman: "Kyushu-Okinawa" },
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
