import pandas as pd
from matplotlib import pyplot as plt

# ----- 1. Чтение из файла и вывод в консоли
df = pd.read_csv('../dataset.csv')
print(df)

# ----- 2. Выборка по 2 условиям
length = df.shape[0]
df = df[(df['Age'] > 10) & (df['Embarked'] == 'S')]
print('Количество до и после фильтрации:', length, df.shape[0]) # 891 503

# ----- 3. Расчет новой колонки и удаление старой
df.drop('Embarked', axis=1, inplace=True)
df['NameLen'] = df['Name'].str.len()

# ----- 4. Построение графика точек зависимости 2 величин (scatter plot)
df.plot.scatter(x='Age', y='Fare', c='DarkBlue')
plt.savefig('out.png')

# ----- 5. Сортировка по 2 столбцам
df = df.sort_values(by=['Sex', 'Fare'], ascending=False).reset_index(drop=True)

# ----- 6. Сохранение в файл
df.to_csv('./out.csv', index=False)
