
//variables
var counter = 0;
//characters
var character = [], characterReset = [];
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

    defender.health -= player.attack; //player always attacks first
    if (defender.health > 0){ //defender shouldn't do damage if they are already dead.
        player.health -= defender.attack; //defender attacks afterwards
    }
    player.attack += player.counter;  //adds players attack by their counter
    
    $("#defender > .character > p").text(defender.health); //you can select specific children inside an id/div/etc.. using '>'
    $("#yourCharacter > .character > p").text(player.health);
}

function reset() {
    console.log("------New Game------");
    counter = 0;
    console.log("counter set to 0.");
    character[0] = newCharacter("Oboro", 120, 40, "Spear", "Oboro.PNG");
    character[1] = newCharacter("Hector", 180, 45, "Axe", "Hector.png");
    character[2] = newCharacter("Marth", 150, 35, "Sword", "thatguyfromsmash.png");
    character[3] = newCharacter("Ephraim", 100, 50, "Spear", "Ephraim.png");
    character[4] = newCharacter("Black Knight", 200, 60, "Sword", "BlackKnight.png");
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

var playerID; //these will be stored as a number to point into the character array
var defenderID;

$("document").ready(function () {
    //main functions
    $("button").on("click", function () {
        if (character[playerID].health > 0 && character[defenderID].health > 0) {
            combat(character[playerID], character[defenderID]);
            if (character[playerID].health <= 0) {
                //reset game entirely
                console.log("Player's character, " + character[playerID].name + ", has died and the game was reset.")
                reset();
            }
            else if (character[defenderID].health <= 0) {
                //continue to the next dude
                //remove dead man from defender
                console.log(character[defenderID].name + " has died and was removed from the #defender div.")
                $("#defender").html("");
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

