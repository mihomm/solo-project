/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("yuruchara").del();
  await knex("yuruchara").insert([
    {
      id: 1,
      name: "くまモン",
      prefecture_id: 43,
      affiliation: "熊本県",
      discription: "くまモン元気だモン",
    },
    {
      id: 2,
      name: "いまばり　バリィさん",
      prefecture_id: 38,
      affiliation: "第一印刷株式会社",
      discription: "バリィさん",
    },
    {
      id: 3,
      name: "にしこくん",
      prefecture_id: 13,
      affiliation: "にしこくんプロジェクト",
      discription: "武蔵国・国分寺跡から発掘されたあぶみ瓦の妖精",
    },
    {
      id: 4,
      name: "ふっかちゃん",
      prefecture_id: 11,
      affiliation: "深谷市役所",
      discription: "埼玉県深谷市イメージキャラクターのふっかちゃんだよぉ",
    },
    {
      id: 5,
      name: "滝の道ゆずる",
      prefecture_id: 27,
      affiliation: "大阪府箕面市",
      discription:
        "ゆずと紅葉の里・箕面をPRするために生まれたゆずのキャラクター",
    },
    {
      id: 6,
      name: "ぐんまちゃん",
      prefecture_id: 10,
      affiliation: "群馬県",
      discription: "",
    },
    {
      id: 7,
      name: "さのまる",
      prefecture_id: 9,
      affiliation: "佐野市",
      discription: "",
    },
    {
      id: 8,
      name: "しまねっこ",
      prefecture_id: 32,
      affiliation: "島根県観光連盟",
      discription: "島根県観光キャラクターの「しまねっこ」にゃ！",
    },
    {
      id: 9,
      name: "みきゃん",
      prefecture_id: 38,
      affiliation: "愛媛県",
      discription: "みきゃんは柑橘王国えひめ生まれなんよ〜♪",
    },
    {
      id: 10,
      name: "ポテくまくん",
      prefecture_id: 11,
      affiliation: "埼玉県秩父市",
      discription: "秩父のソウルフードみそポテトが大好きなクマの妖精",
    },
  ]);
};
