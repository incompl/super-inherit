window.onload = function() {

    var Animal = Object.inherit({
        getName: function(prefix) {
            return (prefix || '') + this._name;
        }
    });

    var Mammal = Animal.inherit({
        
    });
        
    var Dog = Mammal.inherit({
        getName: function() {
            return this._super('getName', "Introducing a cool dog: ");
        }
    });

    var spot = Dog.inherit({_name:'Spot'});

    var puppy = spot.inherit({
        getName: function() {
            return this._super('getName') + ' Jr.';
        }
    });

    document.getElementById('output').innerHTML = puppy.getName();

    var rover = Dog.inherit({_name:'Rover'});

    puppy = rover.inherit(puppy);

    document.getElementById('output2').innerHTML = puppy.getName();

};
