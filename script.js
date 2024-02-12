// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2401-GHP-ET-WEB-FT-SF";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

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
  playerObj.preventDefault();
  const addPlayerForm = document.querySelector("#new-player-form");

  const name = addPlayerForm.title.value;
  const breed = addPlayerForm.breed.value;
  let field = addPlayerForm.field.checked; //boolean
  const image = addPlayerForm.image.value;
  if (field) {
    field = "field";
  } else {
    field = "bench";
  }
  try {
    const response = await fetch(API_URL + "/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, breed, field, image }),
    });
    const json = await response.json();
    init();
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }

  addPlayerForm.addEventListener("submit", addNewPlayer);
};

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
      const newListItem = document.createElement("li");
      newListItem.classList.add("player");

      const newHeading = document.createElement("h2");
      newHeading.textContent = playerObj.name;

      const newId = document.createElement("p");
      newId.textContent = playerObj.id;

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
        newId,
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

  const newListItem = document.createElement("li");
  newListItem.classList.add("player");

  const newHeading = document.createElement("h2");
  newHeading.textContent = player.name;

  const newId = document.createElement("p");
  newId.textContent = player.id;

  newListItem.append(newHeading, newId);

  playerDisplay.append(newListItem);
};
// try {
//   const response = await fetch(`${API_URL}/players/${player}`);
//   const result = await response.json();
//   console.log(result.data.player);
// } catch (err) {
//   console.error(err);
// } original attempt for renderSinglePlayer that used an API call
/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
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
