# solo-project

My First solo-project

## ゆるキャラデータ

### GET /api/yuruchara

ゆるキャラデータを取得します  
クエリパラメータ limit=n を指定した場合、n 件の結果を返します  
limit を指定しない場合は、最大 100 件を返却します

レスポンス例  
`[{
"id": 1,
"name": "name1",
"prefectureId": 1,
"affiliation": "affiliation1",
"discription": "discription1"
},
{
"id": 2,
"name": "name2",
"prefectureId": 2,
"affiliation": "affiliation2",
"discription": "discription2"
}]`

### GET /api/yuruchara/:id

ゆるキャラデータを ID 指定で取得します

レスポンス例  
`{
"id": 2,
"name": "name2",
"prefectureId": 2,
"affiliation": "affiliation2",
"discription": "discription2"
}`

### POST /api/yuruchara 　

ゆるキャラデータを登録します

リクエストボディ例  
`{
"id": 100,
"name": "aaa",
"prefectureId": 10,
"affiliation": "bbb",
"discription": "ccc"
}`

### PATCH /api/yuruchara/:id

ゆるキャラデータを ID 指定で更新します

リクエストボディ例  
`{
"name": "bbb",
"prefectureId": 11
}`

指定していないパラメータがあった場合は、元のままとします

### PUT /api/yuruchara/:id 　

ゆるキャラデータを ID 指定で置き換えます

リクエストボディ例  
`{
"name": "bbb",
"prefectureId": 11
}`

指定していないパラメータがあった場合は、null で上書きされます

### DELETE /api/yuruchara/:id 　

ゆるキャラデータを ID 指定で削除します

##　都道府県データ

### GET /api/pref 　

都道府県データを取得します

### GET /api/pre/:id 　

都道府県データを ID 指定で取得します

レスポンス例  
`{ "id": 2, "name": "青森県" }`
