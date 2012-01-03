window.onload = function() {

    var Animal = {
        getName: function(prefix) {
            return (prefix || '') + this.name;
        }
    };

    var Mammal = Animal.beget({
        
    });
        
    var Dog = Mammal.beget({
        getName: function() {
            return this._super('getName', "Introducing a cool dog: ");
        }
    });

    var spot = Dog.beget({name:'Spot'});

    var puppy = spot.beget({
        getName: function() {
            return this._super('getName') + ' Jr.';
        }
    });

    document.getElementById('output').innerHTML = puppy.getName();

    var rover = Dog.beget({name:'Rover'});

    puppy = rover.beget(puppy);

    document.getElementById('output2').innerHTML = puppy.getName();

};
