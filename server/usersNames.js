// Keep track of which names are used so that there are no duplicates
var usersNames = (function () {
    var names = {};

    var getUserById = function (id){
        if (!id || !names[id]) {
            return false;
        } else {
            return names[id];
        }
    }
    var getNames = function () {
        return names;
    };
    
    var claim = function (name,id) {
        if (!name) {
            return false;
        }
        user=searchName(name)
        //console.log(user);
        if(user && user.id!==id){
            return false;
        }
           // {user: newName, color: [colorInvert, color]}
           var color = getRandomColor();
           var colorInvert = getInvertColor(color);
           var  conf = require("../variables.js");
           if (name.length > conf.maxUserLength) {
               name = name.substring(0, conf.maxUserLength);
           }
            names[id] = {
                "name":name, 
                "color": [colorInvert, color],
                "datlogin":new Date().getTime()}
           // searchName(name)
            return true;
        
    };
    var searchName =  function(name){
        for (key in names) {
            if(names[key].name===name){
                //names.id=key
                var current=names[key];
                current.id=key;
                return current;
            }
        }
        return false;
    }
    // find the lowest unused "guest" name and claim it
    var getGuestName = function () {
        var name,
                nextUserId = 1;

        do {
            name = 'Guest ' + nextUserId;
            nextUserId += 1;
        } while (!claim(name));

        return name;
    };

    // serialize claimed names as an array
    var getUsersName = function () {
        var res = [];
        for (id in names) {
            var user={"name":names[id].name,
                  "color":names[id].color}
            res.push(user);
        }

        return res;
    };

    var free = function (id) {
        if (names[id]) {
            delete names[id];
        }
    };
    var getInvertColor = function(hexTripletColor) {
        var color = hexTripletColor;
        color = color.substring(1);           // remove #
        color = parseInt(color, 16);          // convert to integer
        color = 0xFFFFFF ^ color;             // invert three bytes
        color = color.toString(16);           // convert to hex
        color = ("000000" + color).slice(-6); // pad with leading zeros
        color = "#" + color;                  // prepend #
        return color;
    }
    var getRandomColor = function() {
        var letters = 'BCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    return {
        getNames: getNames,
        getUserById:getUserById,
        claim: claim,
        free: free,
        getUsersName: getUsersName,
        getGuestName: getGuestName
    };
}());
module.exports = usersNames;