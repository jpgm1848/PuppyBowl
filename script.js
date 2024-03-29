// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2401-GHP-ET-WEB-FT-SF";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const addPlayerForm = document.querySelector("#new-player-form");

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API_URL + "/players");
    if (!response.ok) {
      throw new Error("Failed to fetch players");
    }
    const players = await response.json();
    return players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
    return []; // Return an empty array in case of an error
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
// TODO
// DONE

const addNewPlayer = async (playerObj) => {
  console.log("I am adding");
  playerObj.preventDefault();
  // console.log(addPlayerForm.teamId.value;)

  const name = addPlayerForm.title.value;

  const breed = addPlayerForm.breed.value;

  let field = addPlayerForm.field.checked; //boolean

  let teamId = document.getElementById("teamId").value;

  const imageUrl = addPlayerForm.imageUrl.value;

  if (field) {
    field = "field";
  } else {
    field = "bench";
  }
  try {
    console.log("i am trying");
    const response = await fetch(API_URL + "/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, breed, field, imageUrl, teamId }),
    });
    const json = await response.json();
    init();
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

addPlayerForm.addEventListener("submit", addNewPlayer);

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
// TODO
// DONE
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`, {
      method: "DELETE",
    });
    init();
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  // TODO
  // DONE
  const playerDisplay = document.querySelector("#players");
  if (playerList.length < 1) {
    console.error("There are no players available.");
  } else {
    playerDisplay.replaceChildren();
    playerList.forEach((playerObj) => {
      const newListItem = document.createElement("div");
      newListItem.classList.add("player");

      const newHeading = document.createElement("h2");
      newHeading.textContent = playerObj.name;

      const newBreed = document.createElement("p");
      newBreed.textContent = `${playerObj.name}'s breed is ${playerObj.breed}.`;

      const newId = document.createElement("p");
      newId.textContent = `${playerObj.name}'s ID is ${playerObj.id}.`;

      const newTeam = document.createElement("p");
      if (playerObj.teamId === null) {
        newTeam.textContent = `${playerObj.name}'s team is unknown.`;
      } else {
        newTeam.textContent = `${playerObj.name}'s team is ${playerObj.teamId}.`;
      }

      const newField = document.createElement("p");
      newField.textContent = `${playerObj.name} is on the ${playerObj.status}.`;

      const newImage = document.createElement("img");
      newImage.src = playerObj.imageUrl;
      // newImage.style = "max-width: 450px; max-height: 300px";

      const seeDetailsButton = document.createElement("button");
      seeDetailsButton.textContent = "See Details";
      seeDetailsButton.addEventListener("click", () =>
        renderSinglePlayer(playerObj)
      );

      const removeFromRosterButton = document.createElement("button");
      removeFromRosterButton.textContent = "Remove from Roster";
      removeFromRosterButton.addEventListener("click", () =>
        removePlayer(playerObj.id)
      );

      newListItem.append(
        newHeading,
        newBreed,
        newId,
        newTeam,
        newField,
        newImage,
        seeDetailsButton,
        removeFromRosterButton
      );

      playerDisplay.append(newListItem);
    });
  }
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO
  // player = player object

  const playerDisplay = document.querySelector("#players");

  playerDisplay.replaceChildren();

  const newListItem = document.createElement("div");
  newListItem.classList.add("player");

  const newHeading = document.createElement("h2");
  newHeading.textContent = player.name;

  const newBreed = document.createElement("p");
  newBreed.textContent = `${player.name}'s breed is ${player.breed}.`;

  const newId = document.createElement("p");
  if (player.teamId === null) {
    newId.textContent = `${player.name}'s team is unknown.`;
  } else {
    newId.textContent = `${player.name}'s team is ${player.teamId}`;
  }

  const newStatus = document.createElement("p");
  newStatus.textContent = `${player.name} is on the ${player.status}.`;

  const newImage = document.createElement("img");
  newImage.src = player.imageUrl;
  // newImage.style = "max-width: 450px; max-height: 300px";

  const backToAllPlayers = document.createElement("button");
  backToAllPlayers.textContent = "Back To All Players";
  backToAllPlayers.addEventListener("click", () => {
    init();
  });

  // Got it to work without using renderAllPlayers, come back to it ^

  newListItem.append(
    newHeading,
    newBreed,
    newId,
    newStatus,
    newImage,
    backToAllPlayers
  );

  playerDisplay.append(newListItem);
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  const form = document.querySelector("#new-player-form");
  try {
    form.innerHTML = "";
    const header = document.createElement("h1");
    const headerLink = document.createElement("a");
    const nameLabel = document.createElement("label");
    const nameInput = document.createElement("input");
    const breedLabel = document.createElement("label");
    const teamLabel = document.createElement("label");
    const teamInput = document.createElement("input");
    const breedInput = document.createElement("input");
    const fieldLabel = document.createElement("label");
    const fieldCheckbox = document.createElement("input");
    const imageUrlLabel = document.createElement("label");
    const imageUrlInput = document.createElement("input");
    const addButton = document.createElement("button");

    headerLink.href = "index.html";
    headerLink.textContent = "Welcome to the Puppy Bowl!";
    headerLink.style.textDecoration = "none";
    headerLink.style.cursor = "pointer"; // Add this line to change the cursor to a pointer on hover
    header.appendChild(headerLink);
    header.style.textAlign = "center";

    nameInput.type = "text";
    nameInput.name = "title";
    nameInput.placeholder = "Puppy Name";

    breedInput.type = "text";
    breedInput.name = "breed";
    breedInput.placeholder = "Puppy Breed";

    teamInput.type = "number";
    teamInput.id = "teamId";
    teamInput.name = "team";
    teamInput.placeholder = "Puppy Team";
    teamInput.min = 1;
    teamInput.max = 2;

    fieldCheckbox.type = "checkbox";
    fieldCheckbox.id = "field";
    fieldCheckbox.name = "field";
    fieldCheckbox.value = "field";

    imageUrlInput.type = "url";
    imageUrlInput.name = "imageUrl";
    imageUrlInput.id = "imageUrl";
    imageUrlInput.placeholder = "Image URL";

    addButton.textContent = "Add Puppy";

    nameLabel.classList.add("form-element");
    breedLabel.classList.add("form-element");
    teamLabel.classList.add("form-element");
    fieldCheckbox.classList.add("form-element");
    fieldLabel.classList.add("form-element");
    imageUrlLabel.classList.add("form-element");

    nameLabel.textContent = "Puppy Name: ";
    nameLabel.appendChild(nameInput);

    breedLabel.textContent = "Puppy Breed: ";
    breedLabel.appendChild(breedInput);

    teamLabel.textContent = "Puppy Team: (Choose 1 or 2) ";
    teamLabel.appendChild(teamInput);

    fieldLabel.textContent = "Is Your Puppy on the Field? ";
    fieldLabel.appendChild(fieldCheckbox);

    imageUrlLabel.textContent = "Puppy Image: ";
    imageUrlLabel.appendChild(imageUrlInput);

    // Append to the form
    form.appendChild(header);
    form.appendChild(nameLabel);
    form.appendChild(breedLabel);
    form.appendChild(teamLabel);
    form.appendChild(fieldLabel);
    form.appendChild(imageUrlLabel);
    form.appendChild(addButton);
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  try {
    const players = await fetchAllPlayers();
    renderAllPlayers(players.data.players);
    renderNewPlayerForm();
  } catch (err) {
    console.error("Error initializing the app:", err);
  }
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
