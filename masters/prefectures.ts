// 都道府県マスタデータ
export interface Prefecture {
  prefectureCode: string;
  areaCode: string;
  prefectureName: string;
  areaName: string;
  prefectureNameRoman: string;
  areaNameRoman: string;
}

export const prefectures: Prefecture[] = [
  // 北海道・東北エリア
  { prefectureCode: '01', areaCode: '1', prefectureName: '北海道', areaName: '北海道・東北', prefectureNameRoman: 'Hokkaido', areaNameRoman: 'Hokkaido-Tohoku' },
  { prefectureCode: '02', areaCode: '1', prefectureName: '青森県', areaName: '北海道・東北', prefectureNameRoman: 'Aomori', areaNameRoman: 'Hokkaido-Tohoku' },
  { prefectureCode: '03', areaCode: '1', prefectureName: '岩手県', areaName: '北海道・東北', prefectureNameRoman: 'Iwate', areaNameRoman: 'Hokkaido-Tohoku' },
  { prefectureCode: '04', areaCode: '1', prefectureName: '宮城県', areaName: '北海道・東北', prefectureNameRoman: 'Miyagi', areaNameRoman: 'Hokkaido-Tohoku' },
  { prefectureCode: '05', areaCode: '1', prefectureName: '秋田県', areaName: '北海道・東北', prefectureNameRoman: 'Akita', areaNameRoman: 'Hokkaido-Tohoku' },
  { prefectureCode: '06', areaCode: '1', prefectureName: '山形県', areaName: '北海道・東北', prefectureNameRoman: 'Yamagata', areaNameRoman: 'Hokkaido-Tohoku' },
  { prefectureCode: '07', areaCode: '1', prefectureName: '福島県', areaName: '北海道・東北', prefectureNameRoman: 'Fukushima', areaNameRoman: 'Hokkaido-Tohoku' },

  // 関東エリア
  { prefectureCode: '08', areaCode: '2', prefectureName: '茨城県', areaName: '関東', prefectureNameRoman: 'Ibaraki', areaNameRoman: 'Kanto' },
  { prefectureCode: '09', areaCode: '2', prefectureName: '栃木県', areaName: '関東', prefectureNameRoman: 'Tochigi', areaNameRoman: 'Kanto' },
  { prefectureCode: '10', areaCode: '2', prefectureName: '群馬県', areaName: '関東', prefectureNameRoman: 'Gunma', areaNameRoman: 'Kanto' },
  { prefectureCode: '11', areaCode: '2', prefectureName: '埼玉県', areaName: '関東', prefectureNameRoman: 'Saitama', areaNameRoman: 'Kanto' },
  { prefectureCode: '12', areaCode: '2', prefectureName: '千葉県', areaName: '関東', prefectureNameRoman: 'Chiba', areaNameRoman: 'Kanto' },
  { prefectureCode: '13', areaCode: '2', prefectureName: '東京都', areaName: '関東', prefectureNameRoman: 'Tokyo', areaNameRoman: 'Kanto' },
  { prefectureCode: '14', areaCode: '2', prefectureName: '神奈川県', areaName: '関東', prefectureNameRoman: 'Kanagawa', areaNameRoman: 'Kanto' },

  // 中部エリア
  { prefectureCode: '15', areaCode: '3', prefectureName: '新潟県', areaName: '中部', prefectureNameRoman: 'Niigata', areaNameRoman: 'Chubu' },
  { prefectureCode: '16', areaCode: '3', prefectureName: '富山県', areaName: '中部', prefectureNameRoman: 'Toyama', areaNameRoman: 'Chubu' },
  { prefectureCode: '17', areaCode: '3', prefectureName: '石川県', areaName: '中部', prefectureNameRoman: 'Ishikawa', areaNameRoman: 'Chubu' },
  { prefectureCode: '18', areaCode: '3', prefectureName: '福井県', areaName: '中部', prefectureNameRoman: 'Fukui', areaNameRoman: 'Chubu' },
  { prefectureCode: '19', areaCode: '3', prefectureName: '山梨県', areaName: '中部', prefectureNameRoman: 'Yamanashi', areaNameRoman: 'Chubu' },
  { prefectureCode: '20', areaCode: '3', prefectureName: '長野県', areaName: '中部', prefectureNameRoman: 'Nagano', areaNameRoman: 'Chubu' },
  { prefectureCode: '21', areaCode: '3', prefectureName: '岐阜県', areaName: '中部', prefectureNameRoman: 'Gifu', areaNameRoman: 'Chubu' },
  { prefectureCode: '22', areaCode: '3', prefectureName: '静岡県', areaName: '中部', prefectureNameRoman: 'Shizuoka', areaNameRoman: 'Chubu' },
  { prefectureCode: '23', areaCode: '3', prefectureName: '愛知県', areaName: '中部', prefectureNameRoman: 'Aichi', areaNameRoman: 'Chubu' },

  // 関西エリア
  { prefectureCode: '24', areaCode: '4', prefectureName: '三重県', areaName: '関西', prefectureNameRoman: 'Mie', areaNameRoman: 'Kansai' },
  { prefectureCode: '25', areaCode: '4', prefectureName: '滋賀県', areaName: '関西', prefectureNameRoman: 'Shiga', areaNameRoman: 'Kansai' },
  { prefectureCode: '26', areaCode: '4', prefectureName: '京都府', areaName: '関西', prefectureNameRoman: 'Kyoto', areaNameRoman: 'Kansai' },
  { prefectureCode: '27', areaCode: '4', prefectureName: '大阪府', areaName: '関西', prefectureNameRoman: 'Osaka', areaNameRoman: 'Kansai' },
  { prefectureCode: '28', areaCode: '4', prefectureName: '兵庫県', areaName: '関西', prefectureNameRoman: 'Hyogo', areaNameRoman: 'Kansai' },
  { prefectureCode: '29', areaCode: '4', prefectureName: '奈良県', areaName: '関西', prefectureNameRoman: 'Nara', areaNameRoman: 'Kansai' },
  { prefectureCode: '30', areaCode: '4', prefectureName: '和歌山県', areaName: '関西', prefectureNameRoman: 'Wakayama', areaNameRoman: 'Kansai' },

  // 中国エリア
  { prefectureCode: '31', areaCode: '5', prefectureName: '鳥取県', areaName: '中国', prefectureNameRoman: 'Tottori', areaNameRoman: 'Chugoku' },
  { prefectureCode: '32', areaCode: '5', prefectureName: '島根県', areaName: '中国', prefectureNameRoman: 'Shimane', areaNameRoman: 'Chugoku' },
  { prefectureCode: '33', areaCode: '5', prefectureName: '岡山県', areaName: '中国', prefectureNameRoman: 'Okayama', areaNameRoman: 'Chugoku' },
  { prefectureCode: '34', areaCode: '5', prefectureName: '広島県', areaName: '中国', prefectureNameRoman: 'Hiroshima', areaNameRoman: 'Chugoku' },
  { prefectureCode: '35', areaCode: '5', prefectureName: '山口県', areaName: '中国', prefectureNameRoman: 'Yamaguchi', areaNameRoman: 'Chugoku' },

  // 四国エリア
  { prefectureCode: '36', areaCode: '6', prefectureName: '徳島県', areaName: '四国', prefectureNameRoman: 'Tokushima', areaNameRoman: 'Shikoku' },
  { prefectureCode: '37', areaCode: '6', prefectureName: '香川県', areaName: '四国', prefectureNameRoman: 'Kagawa', areaNameRoman: 'Shikoku' },
  { prefectureCode: '38', areaCode: '6', prefectureName: '愛媛県', areaName: '四国', prefectureNameRoman: 'Ehime', areaNameRoman: 'Shikoku' },
  { prefectureCode: '39', areaCode: '6', prefectureName: '高知県', areaName: '四国', prefectureNameRoman: 'Kochi', areaNameRoman: 'Shikoku' },

  // 九州・沖縄エリア
  { prefectureCode: '40', areaCode: '7', prefectureName: '福岡県', areaName: '九州・沖縄', prefectureNameRoman: 'Fukuoka', areaNameRoman: 'Kyushu-Okinawa' },
  { prefectureCode: '41', areaCode: '7', prefectureName: '佐賀県', areaName: '九州・沖縄', prefectureNameRoman: 'Saga', areaNameRoman: 'Kyushu-Okinawa' },
  { prefectureCode: '42', areaCode: '7', prefectureName: '長崎県', areaName: '九州・沖縄', prefectureNameRoman: 'Nagasaki', areaNameRoman: 'Kyushu-Okinawa' },
  { prefectureCode: '43', areaCode: '7', prefectureName: '熊本県', areaName: '九州・沖縄', prefectureNameRoman: 'Kumamoto', areaNameRoman: 'Kyushu-Okinawa' },
  { prefectureCode: '44', areaCode: '7', prefectureName: '大分県', areaName: '九州・沖縄', prefectureNameRoman: 'Oita', areaNameRoman: 'Kyushu-Okinawa' },
  { prefectureCode: '45', areaCode: '7', prefectureName: '宮崎県', areaName: '九州・沖縄', prefectureNameRoman: 'Miyazaki', areaNameRoman: 'Kyushu-Okinawa' },
  { prefectureCode: '46', areaCode: '7', prefectureName: '鹿児島県', areaName: '九州・沖縄', prefectureNameRoman: 'Kagoshima', areaNameRoman: 'Kyushu-Okinawa' },
  { prefectureCode: '47', areaCode: '7', prefectureName: '沖縄県', areaName: '九州・沖縄', prefectureNameRoman: 'Okinawa', areaNameRoman: 'Kyushu-Okinawa' },
];

// エリア情報
export interface Area {
  areaCode: string;
  areaName: string;
  areaNameRoman: string;
}

export const areas: Area[] = [
  { areaCode: '1', areaName: '北海道・東北', areaNameRoman: 'Hokkaido-Tohoku' },
  { areaCode: '2', areaName: '関東', areaNameRoman: 'Kanto' },
  { areaCode: '3', areaName: '中部', areaNameRoman: 'Chubu' },
  { areaCode: '4', areaName: '関西', areaNameRoman: 'Kansai' },
  { areaCode: '5', areaName: '中国', areaNameRoman: 'Chugoku' },
  { areaCode: '6', areaName: '四国', areaNameRoman: 'Shikoku' },
  { areaCode: '7', areaName: '九州・沖縄', areaNameRoman: 'Kyushu-Okinawa' },
];

// ユーティリティ関数
export const getPrefectureByCode = (prefectureCode: string): Prefecture | undefined => {
  return prefectures.find(p => p.prefectureCode === prefectureCode);
};

export const getPrefecturesByArea = (areaCode: string): Prefecture[] => {
  return prefectures.filter(p => p.areaCode === areaCode);
};

export const getAreaByCode = (areaCode: string): Area | undefined => {
  return areas.find(a => a.areaCode === areaCode);
};