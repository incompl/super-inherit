window.onload = function() {

    var Animal = Object.inherit({
        getName: function(prefix) {
            return prefix + this.name;
        }
    });

    var Mammal = Animal.inherit({
        
    });
        
    var Dog = Mammal.inherit({
        getName: function() {
            return this._super('getName', "Introducing ") + ' the dog';
        }
    });

    var rover = Dog.inherit({name:'Spot'});

    var puppy = rover.inherit({name:"Spot Jr."});

    document.getElementById('output').innerHTML = puppy.getName();

};
