import * as d3 from 'd3'
import fs from 'fs'
import { plot } from 'nodeplotlib'

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

const data2 = [{ x, y, type: 'scatter', mode: 'markers' }]
plot(data2)

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