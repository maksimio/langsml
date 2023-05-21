import * as d3 from 'd3'
import fs from 'fs'
import plotly from 'plotly'


// ----- 1. Чтение из файла и вывод в консоли
const f = fs.readFileSync('../dataset.csv')
let df = d3.csvParse(String(f))
console.log(df)

// ----- 2. Выборка по 2 условиям
const length = df.length
df = df.filter((v) => v['Age'] > 10 && v['Embarked'] === 'S')
console.log('Количество до и после фильтрации:', length, df.length)

// ----- 3. Расчет новой колонки и удаление старой
df = df.map((v) => ({ ...v, 'Embarked': undefined }))
df = df.map((v) => ({ ...v, 'NameLen': v['Name'].length }))

// ----- 4. Построение графика точек зависимости 2 величин (scatter plot)
const x = df.map((v) => v['Age'])
const y = df.map((v) => v['Fare'])
const pl = plotly({ "username": "DemoAccount", "apiKey": "lr1c37zw81", "host": "127.0.0.1", "port": 3010 })

var data = [{x:[0,1,2], y:[3,2,1], type: 'bar'}];

var layout = {fileopt : "overwrite", filename : "simple-node-example"};


pl.plot(data, layout, function (err, msg) {

	if (err) return console.log(err);

	console.log(msg);

});

 

// ----- 5. Сортировка по 2 столбцам
df = df.sort((a, b) => {
  if (a['Sex'] === b['Sex']) {
    return Number(a['Fare']) > Number(b['Fare']) ? -1 : 1
  }
  return a['Sex'] > b['Sex'] ? -1 : 1
})

// ----- 6. Сохранение в файл
const out = d3.csvFormat(df)
fs.writeFileSync('./out.csv', out)