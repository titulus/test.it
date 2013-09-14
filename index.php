<?php 
$lang = $argv[1];
function put($ru,$en) {
    global $lang;
    switch ($lang) {
        case "ru":
            echo $ru;
            break;
        case "en":
            echo $en;
            break;
        default:
            echo "";
            break;
    }
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test.it</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="test.it-highlight.css">
    <meta name="description" content="<?php put("test.it - лёгкое тестирование javascript. Поддерживает вывод в консоль браузера или nodejs, многоуровневую вложенность и асинхронное тестирование","test.it - simple javascript testing framework. Provides console output, multi-level group nesting, async testing.");?>">
    <meta name="keywords" content="test.it, javascript, js, testing, code testing, unit-testing, unit testing, framework, TDD">
</head>
<body>
    <!-- framework -->
    <script src='test.it.js'></script>
    <script src='test.it-firebug.js'></script>
    <!-- script which is represented above -->
    <script src='example.js'></script>

    <div id="header">
        <h1 id="logo">test<span class="dot">.</span><span class="it">it</span></h1>
        <p id="description"><?php put("Лёгкое тестирование javascript","Simple javascript testing framework"); ?></p>
    </div>
    <div id="links">
        <a href="https://github.com/titulus/testit/archive/v1.1.0.zip" class="button" id="download"><?php put('Скачать','Download') ?> v1.1.0</a>
        <span class="link"><?php put('Код на','Fork it on') ?> &nbsp;<a href="https://github.com/titulus/testit" id="github" target=_blank>GitHub</a></span>
        <span class="link"><?php put('Мануал на','Read manual on') ?> &nbsp;<a href="https://github.com/titulus/testit/wiki" id="wiki" target=_blank>Wiki</a></span>
    </div>
    <div id="code">
        <div>
            <h2><a href="#introduction" id="introduction"><?php put("Введение","Introduction");?></a></h2>
            <?php put('<p><i>test.it</i> - фреймворк для юнит-тестирования javascript кода по методологии <abbr title="Test Driven Development">TDD</abbr>  <i>(Разработка Через Тестирование)</i>.
            Хотя его можно использовать для тестирования js в scrum и в agile техниках.</p>
            <p>На текущий момент поддерживается вывод в <i>веб консоль</i> и <i>консоль node.js</i></p>
            <p>Этот гайд работает на версии <i>1.2.0</i></p>
            <p>Откройте <i>веб консоль</i> что бы увидеть примеры.</p>','<p><i>test.it</i> - <abbr title="Test Driven Development">TDD</abbr> framework for javascript unit testing.
            TDD is not the only application for <i>test.it</i>. You can also use it in agile or scrum metodologies though.</p>
            <p>Output into the <i>Web Console</i> and <i>OS console from node.js</i> are availible.</p>
            <p>This guide is running on v1.2.0</p>
            <p>Open <i>Web Console</i> to see the examples.</p>');?>
        </div>
        
        <div>
            <h2><a href="#link-up" id="link-up"><?php put('Подключение','Setup');?></a></h2>
            <?php put('<p>Подключение зависит от среды, в которой будет проходить тестирование.</p>','<p>There are differences in setup, dependent on used environment.</p>');?>
        </div>
        <div class="part">
            <div class="description">
                <h3><a href="#link-browser" id="link-browser"><?php put('Тестирование javascript в браузере','Testing javascript in a browser');?></a></h3>
                <?php put('<p>Фреймворк <i>test.it</i> подключается как любой другой javascript на странице. Просто добавьте тег <i>&lt;script></i> с адрессом к <i>test.it.js</i>.</p>
                <p>Но это не всё. Точнее не совсем всё. Для того что бы увидеть наглядный результат тестов, необходимо подключить ещё и модуль вывода в консоль. Он подключается так же как библиотека, следующей строкой.</p>
                <p>А в начало файла тестов добавьте <b>firebugConsole</b>  в качестве модуля вывода по-умолчанию через <b>test.printer()</b>.</p>
                <p>Вывод в консоль удобен в современных браузерах, с качественной поддержкой <i>console API</i>. Это:</p>
                <ul>
                    <li><i>Firefox</i> <u>с плагином <i>Firebug</i></u>,</li>
                    <li><i>Google Chrome</i> и все браузеры на основе <i>Chromium</i>,</li>
                    <li>а так же <i>Safari</i>.</li>
                </ul>
                <p>Если у вас другой браузер - ждите релиза модуля вывода в DOM.</p>','<p><i>test.it</i> includes like other javascript files on the page. Just add <i>&lt;script></i> tag with path to <i>test.it.js</i>.</p>
                <p>But it is only the core. To see results output, include <i>firebug output module</i>, and use <b>firebugConsole</b> as default printer via <b>test.printer()</b>.</p>
                <p>Console output is very convenient in browsers with total <i>console API</i> support. They are:</p>
                <ul>
                    <li><i>Firefox</i> <u>with <i>Firebug</i> plugin</u>,</li>
                    <li><i>Google Chrome</i> and other <i>Chromium</i>-based,</li>
                    <li><i>Safari</i> as well.</li>
                </ul>
                <p>If you are unfortunate enough to use other browser - waits for <i>DOM output module</i> release please.</p>');?>
            </div>
            <div class="code">
                <pre><code class="html">&lt;script src='path/to/test.it.js'>&lt;/script>
&lt;script src='path/to/test.it-firebug.js'>&lt;/script></code></pre>
                <br/>
                <pre><code class="javascript">test.printer(firebugConsole);</code></pre>
            </div>
        </div>
        <div class="part last">
            <div class="description">
                <h3><a href="#link-nodejs" id="link-nodejs"><?php put('Тестирование javascript в node.js','Testing Javascript in node.js');?></a></h3>
                <?php put('<p>Первым делом, необходимо установить соответствующий пакет: <i>test.it</i></p>
                <p>В <i>node.js</i>, подключение <i>test.it</i> ничем не отличается от подключения большинства сторонних пакетов. Для этого предназначена функция <i>require</i>, результат которой нужно поместить в переменную <b>test</b>.</p>
                <p>Как и в браузере, одного только ядра фреймворка, как правило, не достаточно. Хотя для <abbr title="Continuous Integration">CI</abbr> хватит и его. Но если вам нужен наглядный вывод - придётся установить и подключить модуль вывода в консоль node.js: <i>test.it-nodejs</i>.</p>
                <p>После установки не достаточно просто использовать <i>require</i> с имененем модуля. Но так же необходимо добавить его в качестве стандартного вывода через <b>test.printer</b>.</p>','<p>First of all you need to install <i>test.it</i></p>
                <p>After that - include in into your tests file with <b>require</b>.</p>
                <p>That enough for <abbr title="Continuous Integration">CI</abbr>. But if you want pretty output for results - install and include <i>test.it-nodejs</i> output module. And set it as default output module with <b>test.printer</b>.</p>');?>
            </div>
            <div class="code">
                <pre><code>npm install 'test.it'
npm install 'test.it-nodejs'</code></pre>
                <br/>
                <pre><code class="javascript">test = require('test.it');
nodeConsole = require('test.it-nodejs');
test.printer(nodeConsole);</code></pre>
                <br/>&nbsp;<?php put('Или сокращённый вариант','Or shorter');?><br/><br/>
                <pre><code class="javascript">(test = require('test.it')).printer(require('test.it-nodejs'));</code></pre>
            </div>
        </div>

        <div class="part">
            <div class="description">
                <h2><a href="#tests" id="tests"><?php put('Тесты','Tests');?></a></h2>
                <?php put('<p>Фреймворк <i>test.it</i> задуман для написания модульных тестов <i>(unit testing)</i>. И использования c применением методологии <abbr title="Test Driven Development">TDD</abbr> <i>(Разработка Через Тестирование)</i>. А это предполагает тесты на истинность значения или выражения, ревенство значений и тип.</p>
                <p>Все тесты являются методами объекта <b>test</b> и являются интерпретациями в коде названных ваше понятий. Обычно они принимают от одного до трёх аргументов. Так же существуют несколько множественных форм этих методов - они первым аргументом принимают массив, элементы которого и будут тестироваться.</p>','<p><i>test.it</i> framework is designed for unit testing. And usage with <abbr title="Test Driven Development">TDD</abbr> methodology. This implies tests for validity, equality and type.</p>
                <p>All tests are methods of <b>test</b> object and means interpretations of the above concepts. They usually takes from one to three arguments. Так же существуют несколько множественных форм - they takes array as first argument, and test every element in it.</p>');?>
            </div>
        </div>

        <div class="part">
            <div class="description">
                <p>Вот два распространённых варианта записи тестов:</p>
                <p>Здесь первый тест проверяет больше ли <i>a</i> чем <i>10</i> и, соответственно, не проходит. А второй сравнивает ту же переменную <i>a</i> уже с <i>2</i> и, соответственно, проходит.</p>
                <p>Это два однотипных теста, которые только записанны слегка по-разному. Оба способа записи приветствуются, но второй лучше подходит для случаев с более сложными тестами. Мы ещё встретимся с ними на этой странице.</p>

                <p>Here are two common variants writing the tests:</p>
                <p>First check</p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="classic_test_1" data-clicktext="кликните что бы запустить"><script>
function classic_test_1 () {
var a = 5;
test.it( a>10 ).comment('is `a` greater than 10?');

test.it( a>2 )
    .comment('is `a` greater than 2?');
}
process(classic_test_1);
                </script></code></pre>
            </div>
        </div>

        <div class="part">
            <div class="description">
                <p><b>test.it( value )</b> - проверяет истинность аргумента <i>value</i></p>
                <p>Под <i>истинным</i> подразумевается значение, которое пройдёт <i>if</i>. Это любая не пустая строка, любое не-нулевое число и т.п.</p>
                <p>У этого теста есть множественная форма.</p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="non_false" data-clicktext="кликните что бы запустить"><script>
function non_false () {
test.it( "hello world" ); // pass
test.it( 0 ); // fail
};
process(non_false);
                </script></code></pre>
            </div>
        </div>
        <div class="part">
            <div class="description">
                <p><b>test.them( values )</b> - проверяет истинность всех элементов в массиве <i>values</i></p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="them" data-clicktext="кликните что бы запустить"><script>
function them () {
test.them( [1,'text',true] ); // pass
test.them( [1,'text',false] ); // fail
}
process(them);
</script></code></pre>
            </div>
        </div>
        <div class="part">
            <div class="description">
                <p><b>test.it( value1, value2 )</b> - проверяет равенство аргументов <i>value1</i> и <i>value2</i></p>
                <p>При этом используется не просто сравнение <i>value1 == value2</i>, а функция <i>deepCompare()</i>, представленная <a href="http://stackoverflow.com/a/1144249/1771942" target=_blank>сдесь</a></p>
            </div>
            <div class="code">
                <br/>
                <pre><code class="javascript" id="equal" data-clicktext="кликните что бы запустить"><script>
function equal () {
test.it( 1, 1 ); // pass
test.it( 1, 2 ); // fail
}
process(equal);
</script></code></pre>
            </div>
        </div>
        <div class="part">
            <div class="description">
                <p><b>test.is( value, constructor )</b> - Проверяет тип (конструктор) <i>value</i>.</p>
                <p>Этот тест можно использовать, как для проверки стандартных типов, так и самописных.</p>
                <p>У этого теста есть множественная форма.</p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="is" data-clicktext="кликните что бы запустить"><script>
function is () {
test.is( 1, Number ); // pass
function constr () {};
var a = new constr;
test.is( a, constr ); // pass

test.is( 2, String ); // fail
var b = new Object;
test.is( b, constr ); // fail
}
process(is);
</script></code></pre>
            </div>
        </div>
        <div class="part">
            <div class="description">
                <p><b>test.are( values [, constructor] )</b> - проверяет совпадение типов (конструкторов) всех элементов массива <i>values</i> друг с другом и с <i>constructor</i>, если указан.</p>
            </div>
            <div class="code">
                <br/>
                <pre><code class="javascript" id="are" data-clicktext="кликните что бы запустить"><script>function are () {
test.are( [1,2] ); // pass
test.are( [1,2], Number ); // pass

test.are( [1,'text']); //fail
test.are( [1,2], String ); //fail
}
process(are);</script></code></pre>
            </div>
        </div>
        

        <div>
            <h2><a href="#groups" id="groups">Группы</a></h2>
            <p>Методология <abbr title="Test Driven Development">TDD</abbr> предполагает разделение кода на отдельные модули, и их разделное юнит-тестирование. Следовательно тесты необходимо объеденять в группы, соответствующие модулям, их подмодулям и т.д. Древовидная структура групп в <i>test.it</i> подходит для этого как нельзя лучше.</p>
            <p>Все операции с группами осуществляются через метод <b>.group()</b>. Далее рассмотрим различные способы его использования.</p>
        </div>
        <div class="part">
            <div class="description">
                <p><b>test.group( name, function(){ ... } )</b> - объединяет все тесты (и группы) внутри функции <i>function</i> в группу с именем <i>name</i></p>
                <p>В случае, когда группа с таким именем уже существует, новые тесты (и группы) из <i>function</i> просто добавляются в неё.</p>
                <p>Обратите внимание, что группы в <i>test.it</i> поддерживают многоуровневую вложенность.</p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="group_nesting" data-clicktext="кликните что бы запустить"><script>
function group_nesting () {
test.group('first level group',function(){
    test.it('test in first level group');

    test.group('second level group',function(){
        test.it(false);
    });
});
test.group('first level group',function(){
    test.it('another test in first level group');
});
};
process(group_nesting);</script></code></pre>
            </div>
        </div>
        <div class="part last">
            <div class="description">
                <p><b>test.group( name )</b> - возвращает ссылку на созданную ранее группу по её имени <i>name</i>.</p>
                <p>Эту конструкцию удобно использовать в цепочных вызовах. Например для вывода результатов указанной группы или добавления к ней комментария.</p>
                <p>Но самым распространённым способам её применения является добавление новых тестов в глубоко вложенные группы.</p>
            </div>
            <div class="code">
                <br/>
                <pre><code class="javascript" id="group_link" data-clicktext="кликните что бы запустить"><script>
function group_link () {
test.group('first level group',function(){
    test.group('second level group',function(){
        test.it(false);
    });
});
test.group('first level group')
    .group('second level group',function(){
        test.it('another test in second level group');
    });
};
process(group_link);</script></code></pre>
            </div>
        </div>
        
        <div>
            <h2><a href="#modes" id="modes">Модификаторы</a></h2>
            <p>Как тесты, так и группы можно "усилять" дополнительными функциями - <i>модификаторами</i>.</p>
            <p>Все эти модификаторы записываются в цепочке вместе с тестом или группой, котурую они призваны дополнить. При этом, некоторые должны идти до теста/группы, а некоторые после. В одной цепочке могут использоваться сразу несколько модификаторов.</p>
        </div>

        <div class="part">
            <div class="description">
                
                <p>В приведённом примере, к результату теста сначала, при помощи метода <i>.addTime()</i>, добавляется время на его исполнение, затем, с <i>.addTrace()</i>, стек вызовов и, в самом конце, через <i>.comment()</i>, комментарий.</p>
                <p>Дальше мы рассмотрим все возможные модификаторы, чуть-чуть подробнее.</p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="few_addition" data-clicktext="кликните что бы запустить"><script>
function few_addition () {
test.addTime().it('test with some','additional methods')
    .addTrace()
    .comment('time, trace and comment added');
}
process(few_addition);
                </script></code></pre>
            </div>
        </div>

        <div class="part">
            <div class="description">
                <h3><a href="#comments" id="comments">Комментарии</a></h3>
                <p>Для того что бы сделать вывод более наглядным, рекомендуется добавлять комментарии, описывающие тест или группу.</p>
                <p>Используйте для этого метод <b>.comment( text )</b>, который добавит <i>text</i> в вывод.</p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="comment" data-clicktext="кликните что бы запустить"><script>
function comment () {
test.group('commented group',function(){
    test.it(false)
        .comment('commented test');
}).comment('has it\'s own comment');
}
process(comment);
            </script></code></pre>
            </div>
        </div>
        
        <div class="part">
            <div class="description">
                <h3><a href="#addtime" id="addtime">Добавление времени выполнения</a></h3>
                <p>В группы время выполнения добавляется автоматически. Если вам потребуется подобное в тесте, просто добавьте <b>.addTime()</b> перед его вызовом</p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="test_time" data-clicktext="кликните что бы запустить"><script>
function test_time () {
var longfunction = function () {
    for (var i=0;i<10000000;i++);
    return false;
}
test.addTime().it(longfunction());
}
process(test_time);
            </script></code></pre>
            </div>
        </div>
        <div class="part">
            <div class="description">
                <h3><a href="#addstack" id="addstack">Добавление стека вызовов</a></h3>
                <p>Если вам необходимо узнать из какой функции был вызван тот или иной тест (или группа), воспользуйтесь <b>.addTrace( [level] )</b> после него.</p>
                <p>Если <i>level</i> указан - стек будет обрезан, что бы помещаться в это значение. Другими словами <i>level</i> - это глубина, вызовов или областей видимости, на которую будет подниматься стек.</p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="addtrace" data-clicktext="кликните что бы запустить"><script>
function addtrace () {
(function firstFunction() { // look how do test.trace() work
    (function secondFunction() {
        (function lastFunction() {
            test.it(false).addTrace();
            test.it(false).addTrace(0);
        })();
    })();
})();
}
process(addtrace);
            </script></code></pre>
            </div>
        </div>

        <div class="part">
            <div class="description">
                <h3><a href="#callbacks" id="callbacks">Действия от результата</a></h3>
                <p>Для того что бы выполнить какую-либо функцию в зависимости от результата теста (или группы) - используйте метод <b>.callback()</b>.</p>
                <p>В качестве аргументов <i>callback</i> принимает от одной до трёх функций. Они запускаются соответственно при прохождении, провале или ошибочном выполнении теста.</p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="callback" data-clicktext="кликните что бы запустить"><script>
function callback () {
var ifpass = function () {console.info('test pass');}
var iffail = function () {console.info('test fail');}
var iferror = function () {console.info('test error');}
test.it(true)
    .callback(ifpass,iffail,iferror);
}
process(callback);
            </script></code></pre>
            </div>
        </div>
        
        <div class="part">
            <div class="description">
                <h3><a href="#results" id="results">Получение результата</a></h3>
                <p>Для <abbr title="Continuous Integration">CI</abbr> <i>(Непрерывная интеграция)</i> или простых ситуаций с запуском функций от результата кроме <i>.callback()</i> можно использовать <b>.result()</b>. Этот метод не принимает аргументов, и возвращает <i>true</i> если тест (или группа) пройден, а <i>false</i> в остальных случаях.</p>
                <p><i>Завершающий модификатор.</i></p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="testresult" data-clicktext="кликните что бы запустить"><script>
function testresult () {
if (test.it('pass').result()) console.log('test pass');
if (test.result()) console.log('all test pass');
}
process(testresult);
            </script></code></pre>
            </div>
        </div>
        
        <div class="part">
            <div class="description">
                <h3><a href="#arguments" id="arguments">Повторное использование аргументов</a></h3>
                <p>Для совсем экзотических ситуаций, предусмотрен метод <b>arguments()</b>, который возвращает массив аргументов переданных в тест. <u>Этот метод не работает с группами!</u></p>
                <p>Этот метод был предложен сообществом, и мне сложно придумать пример реального его использования. Но, допустим, если вам захочется проверить сперва равенство, а затем сразу истинность аргументов - он подойдёт как нельзя лучше!</p>
                <p><i>Завершающий модификатор.</i></p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="test_arguments" data-clicktext="кликните что бы запустить"><script>
function test_arguments () {
test.them(
    test.it(1,1).comment('test equal').arguments()
    ).comment('test true-like');
}
process(test_arguments);
            </script></code></pre>
            </div>
        </div>

        <div class="part">
            <div class="description">
                <h3><a href="#done" id="done">Вывод результатов</a></h3>
                <p>Для того что бы вывести все результаты или отдельных тестов или групп используется метод <b>.done()</b>.</p>
                <p>На самом деле, этот метод использовался во всех предыдущих примерах.</p>
                <p><i>Завершающий модификатор.</i></p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="test_done" onclick="console.clear();test.exclude.group('root',function(){test_done();});" data-clicktext="кликните что бы запустить"><script>
function test_done () {
test.group('groupname',function(){
    test.it(true).done();
}).done();

test.done();
}
var text = test_done.toString().split('\n');
    text.pop();
    text.shift();
    text = text.join('\n');
document.getElementById('test_done').innerHTML = text;
                </script></code></pre>
            </div>
        </div>

        <div class="part">
            <div class="description">
                <h3><a href="#excluded" id="excluded">Исключение из результата</a></h3>
                <p>Если вы хотите что бы какие-то из ваших тестов или групп не попали в общий зачёт - добавьте <i>.x()</i> перед их вызовом.</p>
                <p>Вместе с <i>.x()</i> разумно использовать какой-либо из завершающих модификаторов, иначе смысла от исключённого теста или группы не будет ни какого.</p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="exclude" data-clicktext="кликните что бы запустить"><script>
function exclude () {
test.it(false).comment('first');
test.x().it(true).comment('second');
test.it(false).comment('third');
test.x().it(true).comment('last').done();
}
process(exclude);
            </script></code></pre>
            </div>
        </div>
        

        <div class="part last">
            <div class="description">
                <h3><a href="#combination" id="combination">Комбинирование функций</a></h3>
                <p>Все модификаторы можно комбинировать в цепи вызовов. Стоит лишь учесть, что в цепи может быть только один из завершающих модификаторов, и он должен идти последним.</p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="combine" data-clicktext="кликните что бы запустить"><script>
function combine () {
var groupResult = test.group('groupname',function(){
    test.x().it(false)
        .comment('excluded test')
        .callback(function(){console.log('ex test pass')}
                 ,function(){console.log('ex test fail')})
        .done();

    console.log(test.it(1,1)
        .comment('passed test')
        .arguments());

    test.addTime()
        .it(function () {for (var i=0;i<1000000;i++);})
        .comment('test with time and trace')
        .addTrace();
}).comment('big group')
  .result();
console.log('group result:',groupResult);
}
process(combine);
            </script></code></pre>
            </div>
        </div>
        <div class="part">
            <div class="description">
                <h3><a href="#async" id="async">Асинхронное тестирование</a></h3>
                <p>Для того что бы протестировать асинхронный функционал, используйте стандартные <b>setTimeOut()</b>.</p>
                <p>При этом нету никакой необходимости ставить фреймворк на паузу. Асинхронные тесты и группы не влияют на прохождение остальных.</p>
                <p>Удобно отделять их от остальных при помощи <i>.x()</i> и <i>.done()</i>.</p>
            </div>
            <div class="code">
                <pre><code class="javascript" id="test_async" data-clicktext="кликните что бы запустить"><script>
function test_async () {
var a = false;
setTimeout(function () {a=true}, 2000)
setTimeout(function () {
     test.group('async tests',function(){
        test.it(a).comment('a must be a true');
     }).comment('async group').done();
}, 1000);
setTimeout(function () {
    test.x().it(a).comment('single async test').done();
}, 3000);
}
process(test_async);
                </script></code></pre>
            </div>
        </div>

        <div>
            <h2><a href="#additional" id="additional">Дополнительные функции</a></h2>
            <p>Внутри ядра <i>test.it</i> используется несколько функций, которые могут слегка облегчить тестирование и отладку кода.</p>
            <p>Эти функции не являются ни тестами, ни группами, ни частями цепи. Они никак не проявляются в результате, но возвращают значения которые вы можете использовать по своему усмотрению.</p>
        </div>

        <div class="part">
            <div class="description">
                <h3><a href="#typeof" id="typeof">typeof()</a></h3>
                <p>Для того что бы узнать тип какой-либо сущности, будь то функция, переменная etc. Можно воспользоваться методом <b>.typeof( value )</b>, который значительно превосходит по функционалу встроенный <b>typeof</b>.</p>
                <p>Он умеет различать : <i>Array</i>, <i>Boolean</i>, <i>Date</i>, <i>Error</i> (<i>EvalError</i>, <i>RangeError</i>, <i>ReferenceError</i>, <i>SyntaxError</i>, <i>TypeError</i>, <i>UriError</i>), <i>Function</i>, <i>NaN</i> и <i>Number</i>, <i>Object</i>, <i>RegExp</i>, <i>String</i>, <i>Window</i>, <i>HTML</i>, <i>NodeList</i>. А ещё он пустую переменную определит как <i>'undefined'</i> но в отличие от стандартного <b>typeof</b> не сможет получить в качестве аргумента не объявленную переменную. За то ответит <i>'undefined'</i> на несуществующее свойство объявленного и непустого объекта. </p>
            </div>
            <div class="code">
                <pre><code class="javascript" onclick="console.clear();test_typeof()" data-clicktext="кликните что бы запустить">console.log( // look how do test.typeof() work
    test.typeof(1)
   ,test.typeof("text")
   ,test.typeof([1,2,3])
   ,test.typeof({a:1,b:2})
   ,test.typeof()
   ,test.typeof(document)
   ,test.typeof(document.getElementsByTagName("body"))
   ,test.typeof(window)
   ,test.typeof(/yes it is RegExp/));</code><script>
function test_typeof (argument) {
console.log( // look how do test.typeof() work
    test.typeof(1)
   ,test.typeof("text")
   ,test.typeof([1,2,3])
   ,test.typeof({a:1,b:2})
   ,test.typeof()
   ,test.typeof(document)
   ,test.typeof(document.getElementsByTagName("body"))
   ,test.typeof(window)
   ,test.typeof(/yes it is RegExp/));
}
   </script></pre>
            </div>
        </div>
        <div class="part last">
            <div class="description">
                <h3><a href="#trace" id="trace">trace()</a></h3>
                <p>Для того что бы получить <i>"trace stack"</i> - список строк кода, которые были выполнены для вызова этой строки (или список областей видимости, по которым прошёл движёк Javascript) используйте метод <b>.trace()</b>.</p>
            </div>
            <div class="code">
                <pre><code class="javascript" onclick="console.clear();test_trace()" data-clicktext="кликните что бы запустить">(function firstFunction() { // look how do test.trace() work
    (function secondFunction() {
        (function lastFunction() {
            console.log(test.trace());
        })();
    })();
})();</code><script>
function test_trace () {
    (function firstFunction() { // look how do test.trace() work
        (function secondFunction() {
            (function lastFunction() {
                console.log(test.trace());
            })();
        })();
    })();
}
</script></pre>
            </div>
        </div>

</div>

    <script src="highlight.pack.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>

    <!-- Google Analitycs -->
    <script>
function addListener(element, type, callback) {
 if (element.addEventListener) element.addEventListener(type, callback);
 else if (element.attachEvent) element.attachEvent('on' + type, callback);
}
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-43063051-1', 'titulus.github.io');
ga('send', 'pageview');

addListener(document.getElementById('download'), 'click', function() {ga('send', 'event', 'link', 'click', 'download archive');});
addListener(document.getElementById('github'), 'click', function() {ga('send', 'event', 'link', 'click', 'fork on github');});
addListener(document.getElementById('wiki'), 'click', function() {ga('send', 'event', 'link', 'click', 'read manual');});
    </script>
</body>
</html>