

var newCharacter = function(name, health, attack, image) {
    var retObject = {
        name: name,
        health: health,
        attack: attack,
        imgSource: image
    }
    return retObject;
}

function addCharacterToDiv(characterObject) {
    var newDiv = $("<div>");
    newDiv.html('<p>' + name + '</p> ' +
        '<img src="assets/images/' + imgSource + '" > ' +
        '<p id="' + name + 'healthID">' + health + '</p> </div>');
    newDiv.attr({
        name: name,
        health: health,
        attack: attack,
        counter: attack,
        class: "character"
    });
    $(divID).append(newDiv);
}

function divCombat(firstDiv, secondDiv) {
    firstDiv.attr("health", (firstDiv.attr("health") - secondDiv.attr("counter")));
    $("#" + firstDiv.attr("name") + "healthID").html(firstDiv.attr("health"));

    secondDiv.attr("health", (secondDiv.attr("health") - firstDiv.attr("attack")));
    $("#" + secondDiv.attr("name") + "healthID").html(secondDiv.attr("health"));

    firstDiv.attr("attack", parseInt(firstDiv.attr("attack")) + parseInt(firstDiv.attr("counter")));
}

function reset() {
    $("#yourCharacter").html("");
    $("#enemies").html("");
    $("#defender").html("");
    addCharacter("me", "angrycat.png", 100, 50, "#yourCharacter");
    addCharacter("matt", "asdasdasd.png", 200, 30, "#yourCharacter");
    addCharacter("dane", "dinke.png", 300, 20, "#yourCharacter");
}
//onstartup
reset();

var playerCharacter;
var enemyCharacter;
$("document").ready(function () {
    //main functions
    $("button").on("click", function () {
        if (playerCharacter.attr("health") > 0 && enemyCharacter.attr("health") > 0){
            divCombat(playerCharacter, enemyCharacter);
            if(playerCharacter.attr("health") <= 0){
                //reset game entirely
                reset();
            }
            else if (enemyCharacter.attr("health") <= 0){
                //continue to the next dude
                //remove dead man from defender
                enemyCharacter.remove();
                console.log($("#defender").html());
            }
        }
    });

    $("#yourCharacter").on("click", ".character", function () {
        if ($("#enemies").html() == "") {
            var selected = $(this);
            playerCharacter = selected;
            // console.log($(this));
            // console.log($(this).attr("attack"));
            $(".character").each(function () {
                console.log($(this).attr("name"));
                if ($(this).attr("name") != selected.attr("name")) {
                    console.log("move");
                    $("#enemies").append($(this));
                }
            });
        }
    });

    $("#enemies").on("click", ".character", function () {
        if ($("#defender").html() == "") {
            enemyCharacter = $(this);
            console.log(enemyCharacter.attr("name"));
            $("#defender").append(enemyCharacter);
        }
    });

});

