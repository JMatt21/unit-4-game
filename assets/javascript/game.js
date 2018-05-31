
//Keeps track of character ID's for divs
var counter = 0;
//these will be stored as a number to point into the character array
var playerID; 
var defenderID;
//array to hold character objects
var character = [];
//functions
function newCharacter(name, health, attack, weaponType, image) {
    var retObject = {
        name: name,
        health: health,
        attack: attack,
        counter: attack,
        weapon: weaponType,
        imgSource: '<img src="assets/images/' + image + '" > '
    }
    return retObject;
};

function addCharacterToDiv(characterObject, divID) {
    var newDiv = $("<div>");
    newDiv.html('<h2>' + characterObject.name + '</h2> ' + characterObject.imgSource +
        '<p>' + characterObject.health + '</p> </div>');
    newDiv.attr({
        name: characterObject.name,
        class: "character",
        characterID: counter++
    });
    $(divID).append(newDiv);
}

function combat(player, defender) {
    var playerDamageMult = defenderDamageMult = 1;
    if ((player.weapon == "sword" && defender.weapon == "axe") || (player.weapon == "axe" && defender.weapon == "lance") || (player.weapon == "lance" && defender.weapon == "sword")) {
        playerDamageMult = 1.2;
        defenderDamageMult = 0.8;
    }
    else if ((player.weapon == "axe" && defender.weapon == "sword") || (player.weapon == "sword" && defender.weapon == "lance") || (player.weapon == "lance" && defender.weapon == "axe")) {
        playerDamageMult = 0.8;
        defenderDamageMult = 1.2;
    }       
    defender.health -= player.attack * playerDamageMult; //player always attacks first
    if (defender.health > 0){ //defender shouldn't do damage if they are already dead.
        player.health -= defender.attack * defenderDamageMult; //defender attacks afterwards
    }
    player.attack += player.counter;  //adds players attack by their counter
    
    $("#defender > .character > p").text(defender.health); //you can select specific children inside an id/div/etc.. using '>'
    $("#yourCharacter > .character > p").text(player.health);
}

function reset() {
    console.log("------New Game------");
    $("#resetbutton").hide();
    console.log("Reset Button hidden");
    $("#results").empty();
    console.log("Hiding results");
    counter = 0;
    console.log("counter set to 0.");
    character[0] = newCharacter("Oboro", 100, 30, "lance", "Oboro.PNG");
    character[1] = newCharacter("Hector", 125, 25, "axe", "Hector.png");
    character[2] = newCharacter("Marth", 120, 45, "sword", "thatguyfromsmash.png");
    character[3] = newCharacter("Ephraim", 80, 50, "lance", "Ephraim.png");
    character[4] = newCharacter("Black Knight", 170, 20, "sword", "BlackKnight.png");
    console.log("characters re-added to character array.");
    $("#yourCharacter").html("");
    $("#enemies").html("");
    $("#defender").html("");
    console.log("All divs emptied.");
    character.forEach(function (character) {
        addCharacterToDiv(character, "#yourCharacter");
        console.log(character.name + " was added.")
    });
}
//onstartup
reset();



$("document").ready(function () {
    //main functions
    $("#attack").on("click", function () {
        if (character[playerID].health > 0 && character[defenderID].health > 0) {
            combat(character[playerID], character[defenderID]);
            if (character[playerID].health <= 0) {
                //reset game entirely
                console.log("Player's character, " + character[playerID].name + ", has died and the game was reset.")
                $("#results").html("<h1>" + character[playerID].name + " has died. </h1>");
                $("#resetbutton").show();
            }
            else if (character[defenderID].health <= 0) {
                //continue to the next dude
                //remove dead man from defender
                console.log(character[defenderID].name + " has died and was removed from the #defender div.")
                $("#defender").html("");
                if ($("#enemies").html() == ""){//if there are no more opponents then the game is over
                    $("#results").html("<h1>" + character[playerID].name + " has triumphed over everyone.");
                    $("#resetbutton").show();
                }
            }
        }
    });

    $("#yourCharacter").on("click", ".character", function () {
        console.log($(this).attr("name") + " was clicked in #yourCharacter div.");
        if ($("#enemies").html() == "") {
            console.log("Everyone else was moved.");
            var selected = $(this);
            playerID = selected.attr("characterID");
            $(".character").each(function () {
                if ($(this).attr("characterID") != selected.attr("characterID")) {
                    $("#enemies").append($(this));
                }
            });
        }
    });

    $("#enemies").on("click", ".character", function () {
        console.log($(this).attr("name") + " was clicked in #enemies div.");
        if ($("#defender").html() == "") {
            defenderID = $(this).attr("characterID");
            $("#defender").append($(this));
        }
    });

});

