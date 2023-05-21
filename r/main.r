library(stringr)

# ----- 1. Чтение из файла и вывод в консоли
df <- read.csv("../dataset.csv")
print(df)

# ----- 2. Выборка по 2 условиям
length <- dim(df)[1]
print(colnames(df))
df <- df[(df$Age > 10) & (df$Embarked == "S"),]
df <- na.omit(df)
print(paste("Количество до и после фильтрации:", length, dim(df)[1]))

# ----- 3. Расчет новой колонки и удаление старой
df <- df[, !names(df) %in% c("Embarked")]
df$NameLen <- str_count(df$Name)

# ----- 4. Построение графика точек зависимости 2 величин (scatter plot)
png(filename = "out.png")
plot(df$Age, df$Fare)

# ----- 5. Сортировка по 2 столбцам
df <- df[order(df$Sex, df$Fare, decreasing = TRUE),]

# ----- 6. Сохранение в файл
write.csv(df, "out.csv", row.names = FALSE)