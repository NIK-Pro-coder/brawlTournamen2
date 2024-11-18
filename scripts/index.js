let teams = {};
let tagsSeen = [];

function addTeam() {
	const name = document.getElementById("teamAddInput").value;

	if (name == "") {
		document.getElementById("emptyName").hidden = false;
		return;
	}
	document.getElementById("emptyName").hidden = true;

	if (name in teams) {
		document.getElementById("alreadyTeam").hidden = false;
		return;
	}
	document.getElementById("alreadyTeam").hidden = true;

	let teamList = document.getElementById("teamList");
	let myTeam = document.createElement("li");

	myTeam.innerHTML = name;
	myTeam.onclick = function () {
		if (document.getElementById(name).hasChildNodes()) {
			return;
		}
		let element = document.getElementById(name).parentNode;
		element.parentNode.removeChild(element);
		let option = document.getElementById(`select${name}`);
		option.parentNode.removeChild(option);
		delete teams[name];
	};
	teamList.appendChild(myTeam);

	let members = document.createElement("ol");

	members.id = name;
	myTeam.appendChild(members);

	teams[name] = {
		name: name,
		members: [],
	};

	let options = document.getElementById("teamSelector");
	let newOption = document.createElement("option");

	newOption.value = name;
	newOption.innerHTML = name;
	newOption.id = `select${name}`;

	options.appendChild(newOption);
}

async function addPlayer() {
	const team = document.getElementById("teamSelector").value;
	const tag = document.getElementById("playerTagInput").value;

	if (team == "") {
		document.getElementById("noTeam").hidden = false;
		return;
	}
	document.getElementById("noTeam").hidden = true;

	if (tag == "") {
		document.getElementById("noTag").hidden = false;
		return;
	}
	document.getElementById("noTag").hidden = true;

	if (tagsSeen.includes(tag.toLowerCase())) {
		document.getElementById("alreadyTag").hidden = false;
		return;
	}
	tagsSeen.push(tag.toLowerCase());
	document.getElementById("alreadyTag").hidden = true;

	let myTeam = document.getElementById(team);
	let me = document.createElement("li");
	me.innerHTML = "Loading";
	me.id = tag.toLowerCase();

	myTeam.appendChild(me);

	const resp = await fetch(`/getPlayer/${tag}`);
	const player = await resp.json();

	teams[team].members.push({
		tag: player.tag.toLowerCase(),
		name: player.name,
	});

	me.innerHTML = `${player.name} (${player.tag.toLowerCase()})`;
	me.onclick = () => {
		setTimeout(() => {
			let element = document.getElementById(player.tag.toLowerCase());
			element.parentNode.removeChild(element);
			tagsSeen.splice(tagsSeen.indexOf(player.tag.toLowerCase()), 1);
		}, 1);
	};
}
