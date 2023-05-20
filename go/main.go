package main

import (
	"fmt"
	"image"
	"image/png"
	"log"
	"os"
	"strconv"

	"github.com/go-gota/gota/dataframe"
	"github.com/go-gota/gota/series"
	"gonum.org/v1/plot"
	"gonum.org/v1/plot/plotter"
	"gonum.org/v1/plot/vg/draw"
	"gonum.org/v1/plot/vg/vgimg"
)

func main() {
	// ----- 1. Чтение из файла и вывод в консоли
	file, err := os.Open("../dataset.csv")
	defer file.Close()
	if err != nil {
		log.Fatal(err)
	}
	df := dataframe.ReadCSV(file)
	fmt.Println(df)

	// ----- 2. Выборка по 2 условиям
	lenBefore, _ := df.Dims()

	df = df.FilterAggregation(
		dataframe.And,
		dataframe.F{-1, "Age", series.Greater, 10},
		dataframe.F{-1, "Embarked", series.Eq, "S"},
	)

	lenAfter, _ := df.Dims()
	fmt.Printf("Количество до и после фильтрации: %d %d\n", lenBefore, lenAfter)

	// ----- 3. Расчет новой колонки и удаление старой
	df = df.Drop("Embarked")
	df = df.Mutate(
		series.New(df.Col("Name").Map(func(e series.Element) series.Element {
			e.Set(len(e.String()))
			return e
		}), series.Int, "NameLen"),
	)

	// ----- 4. Построение графика точек зависимости 2 величин (scatter plot)
	x := df.Col("Age").Records()
	y := df.Col("Fare").Records()

	p := plot.New()
	p.X.Label.Text = "Age"
	p.Y.Label.Text = "Fare"

	xys := plotter.XYs{}
	for i, v := range x {
		fmt.Println(v, y[i])
		xV, _ := strconv.ParseFloat(v, 64)
		xY, _ := strconv.ParseFloat(y[i], 64)
		xys = append(xys, plotter.XY{X: xV, Y: xY})
	}
	l, err := plotter.NewScatter(xys)
	if err != nil {
		panic(err)
	}
	p.Add(l)

	fmt.Println(xys)

	dpi := 200
	img := image.NewRGBA(image.Rect(0, 0, 3*dpi, 3*dpi))
	c := vgimg.NewWith(vgimg.UseImage(img))
	p.Draw(draw.New(c))

	f, err := os.Create("out.png")
	defer f.Close()
	if err != nil {
		log.Fatal(err)
	}
	if err := png.Encode(f, c.Image()); err != nil {
		log.Fatal(err)
	}

	// ----- 5. Сортировка по 2 столбцам
	df = df.Arrange(
		dataframe.RevSort("Sex"),
		dataframe.RevSort("Fare"),
	)

	// ----- 6. Сохранение в файл
	fmt.Println(df)
	out, err := os.Create("./out.csv")
	defer out.Close()
	if err != nil {
		log.Fatal(err)
	}
	df.WriteCSV(out)
}
