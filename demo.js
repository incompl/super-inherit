window.onload = function() {

    var Animal = {}.inherit({
        getName: function(prefix) {
            return (prefix || '') + this.name;
        }
    });

    var Mammal = Animal.inherit({
        
    });
        
    var Dog = Mammal.inherit({
        getName: function() {
            return this._super('getName', "Introducing a cool dog: ");
        }
    });

    var spot = Dog.inherit({name:'Spot'});

    var puppy = spot.inherit({
        getName: function() {
            return this._super('getName') + ' Jr.';
        }
    });

    document.getElementById('output').innerHTML = puppy.getName();

    var rover = Dog.inherit({name:'Rover'});

    puppy = rover.inherit(puppy);

    document.getElementById('output2').innerHTML = puppy.getName();

};
