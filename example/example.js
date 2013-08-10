var Family = { // Here some complex object
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

test.group("Empty group",function(){}); // try to make a group
test.group('Family tests',function(){ // let's unite it!
    test.it(Family.name,"Zukerberg").comment("Do we test Zukerberg's family?");
    test.it(Family.name,"Desiderio").comment("Or Desiderio's?");
}).comment("unite!");
test.group("Family tests",function(){ // and add some test after
    test.it(Family.pet).comment("Do we have a pet?")
        .callback(function(){
            // I add test in your test, so you can test while you testing
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
        .comment("There must be memebers with pet, to call it a 'Family'");
    // test types of names
    test.types([Family.pet.name, Family.name],"string")
        .comment("Is names are string type");
    // here some magic
    var numberOfMembers = test.type(Family.members,"Array")
        .comment("Is it a several members, nor a single member?")
        .arguments()[0].length;
    test.it(numberOfMembers>5).comment("Is it big family?");
    // So if we know how many members there, lets check their age
    test.group("Members age",function(){
        for (i=0;i<numberOfMembers;i++) {
            test.it(Family.members[i].age>25)
                .comment("Is "+Family.members[i].name+" older then 25?");
        }
        test.it().comment("yep, here is error"); // add some error to see the trace
    });
});
// add final test deep in group
test.group("here comes strange tests").group("Members age",function(){
    test.it("bye").comment("good");
});

test.done();