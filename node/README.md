Окружение для запуска test.it под nodejs
===================

Установка окружения возможно в двух вариантах: с эмуляцией браузера под nodejs и без.

#### Установка окружения без эмуляции браузера
```bash
$ sudo su -
$ apt-get install node
$ ln -s /usr/bin/nodejs /usr/bin/node || true
$ git clone https://github.com/isaacs/npm.git
$ cd npm
$ ./confugure --prefix=/usr
$ make install
$ npm install util --global
```

#### Установка окружения с эмуляцией браузера
```bash
$ sudo su -
$ apt-get install node
$ ln -s /usr/bin/nodejs /usr/bin/node || true
$ git clone https://github.com/isaacs/npm.git
$ cd npm
$ ./confugure --prefix=/usr
$ make install
$ npm install jsdom --global
$ npm install httpxmlrequest --global
$ npm install util --global
```

#### Запуск тестов с эмуляцией браузера
```bash
$ export  NODE_PATH="/usr/lib/node_modules/"
$ node load.js ../example/jquery.js ../example/dispatcher.js ../example/dispatcher_test.js --emulate-window
```

#### Запуск тестов без эмуляциии браузера
```bash
$ export  NODE_PATH="/usr/lib/node_modules/"
$ node load.js ../example/jquery.js ../example/dispatcher.js ../example/dispatcher_test.js
```

#### Выходные данные
  + Полный вывод консоли
  + exit code процесса равен количеству ошибок (0 - успешно, нет ошибок)
