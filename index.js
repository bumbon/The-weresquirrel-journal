// Переменные типа object (объект) – коллекции произвольных свойств, и мы можем добавлять и удалять свойства объекта по желанию. 
// Один из способов создать объект – использовать фигурные скобки:

var day1 = {
  squirrel: false,
  events: ["работа", "тронул дерево", "пицца", "пробежка", "телевизор"]
};
console.log(day1.squirrel);
// → false
console.log(day1.wolf);
// → undefined
day1.wolf = false;
console.log(day1.wolf);
// → false
console.log(day1.events);
//["работа", "тронул дерево", "пицца", "пробежка", "телевизор"]

// Если имя свойства не является допустимым именем переменной, его нужно заключать в кавычки:
var descriptions = {
  work: "Пошёл на работу",
  "тронул дерево": "Дотронулся до дерева"
};
          // Получается, у фигурных скобок в JavaScript два значения. 
          // Употреблённые в начале инструкции, они начинают новый блок инструкций. В любом другом месте они описывают объект. 
          
          // Оператор delete отрезает щупальце. Это унарный оператор, применяемый к выражению доступа к свойству. 
          // Это делается редко, но вполне возможно.
          // var anObject = {left: 1, right: 2};
          // console.log(anObject.left);
          // // → 1
          // delete anObject.left;
          // console.log(anObject.left);
          // // → undefined
          // console.log("left" in anObject);
          // // → false
          // console.log("right" in anObject);
          // // → true
          
          // ---- Выражение typeof [1, 2] вернёт “object”. 
          // Их можно рассматривать как длинных плоских осьминогов, 
          // у которых все щупальца расположены ровным рядом и размечены номерами.
          
          // Поэтому журнал Жака можно представить в виде массива объектов:
          var journal = [
            {events: ["работа", "тронул дерево", "пицца", "пробежка", "телевизор"],
             squirrel: false},
            {events: ["работа ", "мороженое", "цветная капуста", "лазанья", " тронул дерево ", "почистил зубы"],
             squirrel: false},
            {events: ["выходной", "велик", "перерыв", "арахис", "пивасик"],
             squirrel: true},
            /* и так далее... */
          ];
          
          // // Если у нас есть два числа, 120 и 120, мы можем рассматривать их как одно и тоже, независимо от того, хранятся ли они в памяти в одном и том же месте. Но когда мы имеем дело с объектами, есть разница, есть ли у нас две ссылки на один объект или же у нас есть два разных объекта, содержащих одинаковые свойства. Рассмотрим пример:
          
          // var object1 = {value: 10};
          // var object2 = object1;
          // var object3 = {value: 10};
          
          // console.log(object1 == object2);
          // // → true
          // console.log(object1 == object3);
          // // → false
          
          // object1.value = 15;
          // console.log(object2.value);
          // // → 15
          // console.log(object3.value);
          // // → 10

// Итак, Жак запускает свой любимый интерпретатор JavaScript и создаёт окружение, необходимое для хранения журнала.
var journal = [];
function addEntry(events, didITurnIntoASquirrel) {
  journal.push({
    events: events,
    squirrel: didITurnIntoASquirrel
  });
}

// Каждый вечер, часов в десять,– а иногда и назавтра утром, спускаясь с верхней полки шкафа,- он записывает свой день.
addEntry(["работа", "тронул дерево", "пицца", "пробежка", "телевизор"], false);
addEntry(["работа ", "мороженое", "цветная капуста", "лазанья", " тронул дерево ", "почистил зубы"], false);
addEntry(["выходной", "велик", "перерыв", "арахис", "пивасик"], true);

// Как только у него будет достаточно данных, он собирается вычислить корреляцию между его 
// оборачиваниями и событиями каждого из дней, и в идеале узнать из их корреляций что-то полезное.

// Корреляция – это мера зависимости между переменными величинами (переменными в статистическом смысле, а не в смысле JavaScript).
// Она обычно выражается в виде коэффициента, принимающего значения от -1 до 1. Нулевая корреляция обозначает, что переменные вообще не связаны, а корреляция 1 означает, что они полностью связаны – если вы знаете одну, вы автоматически знаете другую. 
// Минус один также означает прочную связь переменных, но и их противоположность – когда одна true, вторая всегда false.

// Для измерения корреляции булевских переменных хорошо подходит коэффициент фи (ϕ), к тому же, его сравнительно легко подсчитать.
// Для этого нам нужна таблица, содержащая количество раз, когда наблюдались различные комбинации двух переменных.
// К примеру, мы можем взять события «поел пиццы» и «обращение» и представить их в таблице
// Функция, вычисляющая коэффициент ϕ из такого массива:
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}
// Таблицу 2х2 можно представить массивом из четырёх элементов ([76, 9, 4, 1]), массивом из двух элементов, 
// каждый из которых является также двухэлементным массивом ([76, 9], [4, 1]])
console.log("phi([76, 9, 4, 1]):",phi([76, 9, 4, 1]));
// → 0.068599434

// Чтобы извлечь переменную 2х2 для конкретного события, нам нужно в цикле пройтись по всем записям и посчитать,
// сколько раз оно случается по отношению к обращению в белку.
function hasEvent(event, entry) {
  return entry.events.indexOf(event) != -1;
}
function tableFor(event, journal) {
  var table = [0, 0, 0, 0];
  for (var i = 0; i < journal.length; i++) {
    var entry = journal[i], index = 0;
    if (hasEvent(event, entry)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}
console.log("tableFor(\"пицца\", journal):",tableFor("пицца", journal));
// → [1, 1, 1, 0]

// Объекты как карты (map)
// Один из способов – хранить корреляции в массиве, используя объекты со свойствами name и value. 
// Однако поиск корреляций в массиве будет довольно громоздким: нужно будет пройтись по всему массиву,
// чтобы найти объект с нужным именем. Можно было бы обернуть этот процесс в функцию, но код пришлось бы писать всё равно, 
// и компьютер выполнял бы больше работы, чем необходимо.
// Способ лучше – использовать свойства объектов с именами событий. Мы можем использовать квадратные скобки для создания
// и чтения свойств и оператор in для проверки существования свойства.

var map = {};
function storePhi(event, phi) {
  map[event] = phi;
}
storePhi("пицца", 0.069);
storePhi("тронул дерево", -0.081);
console.log("\"пицца\" in map:","пицца" in map);
// → true
console.log("map[\"тронул дерево\"]:",map["тронул дерево"],"(phi)");
// → -0.081
// Карта (map) – способ связать значения из одной области (в данном случае – названия событий)
// со значениями в другой (в нашем случае – коэффициенты ϕ).


// Что, если нам надо собрать все события, для которых сохранены коэффициенты? 
// Они не создают предсказуемую последовательность, как было бы в массиве, поэтому цикл for использовать не получится. 
// JavaScript предлагает конструкцию цикла специально для обхода всех свойств объекта. 
// Она похожа на цикл for, но использует команду in.
for (var event in map)
  console.log("Кореляция для '" + event +
              "' получается " + map[event]);
// → Кореляция для 'пицца' получается 0.069
// → Кореляция для 'тронул дерево' получается -0.081


// Чтобы найти все типы событий, представленных в наборе данных, мы обрабатываем каждое вхождение по очереди, 
// и затем создаём цикл по всем событиям вхождения. Мы храним объект phis, в котором содержатся корреляционные коэффициенты 
// для всех типов событий, которые мы уже нашли. Если мы встречаем новый тип, которого ещё не было в phis, мы подсчитываем его корреляцию
// и добавляем её в объект.
function gatherCorrelations(journal) {
  var phis = {};
  for (var entry = 0; entry < journal.length; entry++) {
    var events = journal[entry].events;
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      if (!(event in phis))
        phis[event] = phi(tableFor(event, journal));
    }
  }
  return phis;
}
var correlations = gatherCorrelations(journal);
console.log("correlations.пицца:",correlations.пицца);
// → 0.068599434

// Смотрим. что получилось:
for (var event in correlations)
  console.log(event + ": " + correlations[event]);
// работа: -0.5
// тронул дерево: -0.5
// пицца: -0.5
// пробежка: -0.5
// телевизор: -0.5
// и так далее...

// Большинство корреляций лежат близко к нулю. 
// Давайте отфильтруем результаты, чтобы выводить только корреляции больше 0.1 или меньше -0.1

for (var event in correlations) {
  var correlation = correlations[event];
  if (correlation > 0.1 || correlation < -0.1)
    console.log(event + ": " + correlation);
}

// Ага! У двух факторов корреляции заметно больше остальных. 
// Арахис сильно влияет на вероятность превращения в белку, тогда как чистка зубов наоборот, препятствует этому.

// Интересно. Попробуем вот что:
for (var i = 0; i < journal.length; i++) {
  var entry = journal[i];
  if (hasEvent("арахис", entry) &&
     !hasEvent("чистка зубов", entry))
    entry.events.push("арахис зубы");
}
console.log("phi(tableFor(\"арахис зубы\", journal)):",phi(tableFor("арахис зубы", journal)));
// → 1

// Ошибки быть не может! Феномен случается именно тогда, когда Жак есть арахис и не чистит зубы. 
// Если б он только не был таким неряхой относительно оральной гигиены, он бы вообще не заметил своего несчастья.

// Зная это, Жак просто перестаёт есть арахис и обнаруживает, что трансформации прекратились.














