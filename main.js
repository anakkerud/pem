// VARIABLES

var characters = [];
var monsters = [];
var encounter = [];

// WINDOW RELATED FUNCITONS

window.onload = function () {
	$("#addCharactersButton").click( function () { addCharacters() });
	$("#saveChangesButton").click( function () { saveChanges() });
	$("#addMonster").click( function () { addMonster() });
	$("#saveMonstersButton").click( function () { saveMonsters() });
	$("#newEncounter").click( function () { newEncounter() });
	$("#saveEncounterButton").click( function () { saveEncounter() });
	$("#hideWarning").click( function () { $("#warning").css("display", "none") });
	if (typeof(Storage) !== "undefined") {
		$("#character-output").val(localStorage.getItem("characters"));
		$("#monster-output").val(localStorage.getItem("monsters"));
		$("#encounter-output").val(localStorage.getItem("encounter"));
	} else {
		console.log("No local storage. No persistence.");
	}
};

window.onbeforeunload = function() { return "" };

// NAVIGATION
function selectView (view_id) {
	$("#mainmenu .menuitem").removeClass("selected");
	$("#menu-" + view_id).addClass("selected");
	$(".page").css("display","none");
	$(".page#" + view_id).css("display","block");
}

// VIEW

function makeCharacterList () {
	$("#character-output").empty();
	$("#character-list").empty();

	for ( i = 0; i < characters.length; i++ ) {
		var character = characters[i];

		var li = "<li class='card' id='" + character["name"] + "'>"
			+ "<p><strong>" + character["name"] + "</strong> "
			+ character["description"] + "</p><table>";

		var skills = character["skills"];
		for ( j = 0; j < skills.length; j++ ) {
			li += "<tr><th>" + skills[j]["name"] + "</th><td>"
				+ skills[j]["modifier"] + "</td><td>"
				+ "<button onclick='rollButton(this, " + parseInt(skills[j]["modifier"]) + ")'>"
				+ "Roll!</button></td></tr>";
		}

		li += "</table><button onclick='deleteCharacter(" + i + ")'>Delete</button></li>";
		$("#character-list").append(li);
	}

	$("#character-output").val(JSON.stringify(characters));
}

function rollButton (button, modifier) {
	button.innerHTML = dN(20) + modifier;
}

function makeMonsterList() {
	$("#monster-list").empty();

	for ( i = 0; i < monsters.length; i++ ) {
		var monster = monsters[i];

		var li = "<li class='card' id='" + monster["name"] + "'>"
			+ "<p><strong>" + monster["name"] + "</strong> "
			+ "HP: " + monster["hp"] + " Init: " + monster["init"]
			+ " <button onclick='deleteMonster(" + i + ")'>Delete</button></p></li>";
		$("#monster-list").append(li);
	}

	$("#monster-output").val(JSON.stringify(monsters));
}

function makeEncounterDisplay() {
	$("#encounter-output").val(JSON.stringify(encounter));
	$("#encounter").empty();

	for ( i = 0; i < encounter.length; i++ ) {
		var fighter = encounter[i];

		var li = "<li><p><strong>" + fighter["name"] + "</strong>";

		if ( i === 0 ) {
			li += " <button onclick='cycleEncounter()'>End turn</button>";
		}

		li += "</p><table><tr><td>HP</td><td><input id='hp" + i
			+ "' value='" + fighter["hp"]
			+ "' onchange='updateEncounter(" + i + ", \"hp\")'></td></tr>"
			+ "<tr><td>Misc</td><td><input id='misc" + i
			+ "' value='" + fighter["misc"]
			+ "' onchange='updateEncounter(" + i + ", \"misc\")'></td></table>";

		$("#encounter").append(li);
	}
}

// LOGIC

function addCharacters() {
	characters = characters.concat(JSON.parse(document.getElementById("character-input").value));
	makeCharacterList();
};

function saveChanges() {
	characters = JSON.parse(document.getElementById("character-output").value);
	persist();
	makeCharacterList();
}

function deleteCharacter (index) {
	characters.splice(index, 1);
	persist();
	makeCharacterList();
}

function addMonster () {
	monsters.push({
		"name": $("#monster-name").val(),
		"hp": parseInt($("#monster-hp").val()),
		"init": parseInt($("#monster-init").val())
	})
	persist();
	makeMonsterList();
}

function deleteMonster (index) {
	monsters.splice(index, 1);
	persist();
	makeMonsterList();
}

function saveMonsters () {
	monsters = JSON.parse($("#monster-output").val());
	persist();
	makeMonsterList();
}

function newEncounter () {
	encounter = [];
	for ( i = 0; i < characters.length; i++ ) {
		encounter.push({
			"name": characters[i]["name"],
			"init": parseInt(characters[i]["initiative"]) + dN(20),
			"hp": parseInt(characters[i]["hp"][0]),
			"misc": "",
			"effects": []
		});
	}
	for ( i = 0; i < monsters.length; i++ ) {
		encounter.push({
			"name": monsters[i]["name"],
			"init": parseInt(monsters[i]["init"]) + dN(20),
			"hp": parseInt(monsters[i]["hp"]),
			"misc": "",
			"effects": []
		});
	}
	encounter.sort( function (a, b) {
		return b["init"] - a["init"];
	});
	persist();
	makeEncounterDisplay();
}

function saveEncounter () {
	encounter = JSON.parse($("#encounter-output").val());
	persist();
	makeEncounterDisplay();
}

function updateEncounter (index, key) {
	encounter[index][key] = $("#encounter #" + key + index).val();
	$("#encounter-output").val(JSON.stringify(encounter));
	persist();
}

function cycleEncounter () {
	var tmp = encounter[0];
	encounter.splice(0,1);
	encounter.push(tmp);
	persist();
	makeEncounterDisplay();
}

function persist () {
	if (typeof(Storage) !== "undefined") {
		localStorage.characters = JSON.stringify(characters);
		localStorage.monsters = JSON.stringify(monsters);
		localStorage.encounter = JSON.stringify(encounter);
	}
}

function dN (n) {
	return Math.floor(Math.random() * n) + 1;
}
