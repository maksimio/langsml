-- 1. Чтение из файла и вывод в консоли
/*Файл --> Импорт --> Таблицы из файла CSV...*/
SELECT * from dataset;

-- 2. Выборка по 2 условиям
ALTER TABLE dataset ADD COLUMN Age_num INTEGER;
UPDATE dataset SET Age_num = CAST(Age as Age_num);
CREATE TABLE IF NOT EXISTS dataset1 AS SELECT * from dataset WHERE Age_num > 10 AND Embarked == 'S';
ALTER TABLE dataset DROP COLUMN Age_num;
ALTER TABLE dataset1 DROP COLUMN Age_num;

-- 3. Расчет новой колонки и удаление старой
ALTER TABLE dataset1 DROP COLUMN Embarked;

CREATE TABLE IF NOT EXISTS dataset2 AS SELECT *, length(Name) FROM dataset1;

-- 4. Построение графика точек зависимости 2 величин (scatter plot)
/*
1. Перейдите на вкладку Данные и откройте нужную таблицу
2. Нажмите в верхнем правом углу Вид и убедитесь, что напротив График стоит галочка
3. В нижнем правом углу откройте график, переключаясь между вкладками доп. окон при необходимости
4. Выберите столбец Age в X и столбец Fare в Y1. На этом этапе вы должны увидеть график
5. Выберите Линия - Нет и Отрисовка точек - Круг для лучшей визуализации
6. Нажмите рядом на кнопку Сохранить текущий график
*/

-- 5. Сортировка по 2 столбцам
CREATE TABLE out AS 
SELECT * from dataset2
ORDER BY Sex DESC, Fare DESC;

-- 6. Сохранение в файл
/*Файл --> Экспорт --> Таблицы в файл CSV...*/