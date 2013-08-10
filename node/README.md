Окружение для запуска test.it под nodejs
===================

#### Установка окружения
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

#### Запуск тестов
```bash
$ node load.js ../example/example.js
```

#### Выходные данные
  + Полный вывод консоли
  + exit code процесса равен количеству ошибок (0 - успешно, нет ошибок)
