console.log( // look how test.typeof() works
    test.typeof(1)
   ,test.typeof("text")
   ,test.typeof([1,2,3])
   ,test.typeof({a:1,b:2})
   ,test.typeof()
   ,test.typeof(document)
   ,test.typeof(document.getElementsByTagName("body"))
   ,test.typeof(window)
   ,test.typeof(/yes it is RegExp/));

(function firstFunction() { // look how test.trace() works
    (function secondFunction() {
        (function lastFunction() {
            console.log(test.trace());
        })();
    })();
})();

var Family = { // Here comes the complex object
    name: "Desiderio",
    pet: {
        type: "dog",
        name: "google"
    },
    members: [
        {
            name: "Titulus",
            age: 23
        },
        {
            name: "Dude",
            age: Infinity
        }
    ]
}
var myIQ = 100; // and the number
var Nothing; // and the empty variable

test.it("Hello world"); // Lets add some simple tests
test.it(2+2==5).comment("I badly taught algebra at school"); // with comment
test.it(Infinity>Infinity-1).comment("Philosophically, isn't it?"); // with expression
// check equality
test.it(myIQ,"genius").comment("Am I a genius?");
test.it(myIQ,(1+10)*12 - 34 + 5*5*5 - 123).comment("Check if my IQ is OK");
// try some chain staff
if (test.it(Family).comment("Is Family exist? Is it not empty?").result()) {
    console.info("by if: ","Yep! Here it is!");
} else {
    console.warn("by if: ","ALARM! there is no Family");
}
// do it again in better way
test.it(Nothing).comment("Is it not empty?").callback(
    function(){console.info("by callback: ","Yep! Here it is!");}
   ,function(){console.warn("by callback: ","ALARM! 'Nothing' is empty");});

test.group("Empty group",function(){}); // try to make a group
test.group('Family tests',function(){ // let's unite them!
    test.it(Family.name,"Zukerberg").comment("Is it Zukerberg's family?");
    test.it(Family.name,"Desiderio").comment("Or Desiderio's?");
}).comment("unite!");
test.group("Family tests",function(){ // and add some test after
    test.it(Family.pet).comment("Do we have a pet?")
        .callback(function(){
            // I add test in your test, so you can test while you test
            test.it(Family.pet,{type:"dog", name:"google"}).comment("Is it right pet?");
        });
    test.it(Family.house).comment("Do we have a House?")
        .callback(function(){
            // next test will not be executed
            test.it(Family.pet,{type:"Huge", color:"green"}).comment("Is it right House?"); 
        });
});
test.group("here comes strange tests",function(){
    // test existance of most important Family properties
    test.them([Family.pet, Family.members])
        .comment("It should contains at least one member with a pet to be called 'a family'");
    // test type of names
    test.types([Family.pet.name, Family.name],"string")
        .comment("Are names strings?");
    // here comes some magic
    var numberOfMembers = test.type(Family.members,"Array")
        .comment("Are there more than one member here?")
        .arguments()[0].length;
    test.it(numberOfMembers>5).comment("Is it a big family?");
    // As we know there are members here, lets check their age
    test.group("Members age",function(){
        for (i=0;i<numberOfMembers;i++) {
            test.it(Family.members[i].age>25)
                .comment(Family.members[i].name+" should be older than 25");
        }
        test.it().comment("yep, here is an error"); // add an error to see the trace
    });
});
// add a final test deep into groups
test.group("here comes strange tests").group("Members age",function(){
    test.it("bye").comment("good");
});

test.done();
