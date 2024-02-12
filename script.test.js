const {
  fetchAllPlayers,
  fetchSinglePlayer,
  addNewPlayer,
  removePlayer,
  renderAllPlayers,
  renderSinglePlayer,
  renderNewPlayerForm,
} = require("./script");

describe("fetchAllPlayers", () => {
  // Make the API call once before all the tests run
  let players;
  beforeAll(async () => {
    players = await fetchAllPlayers();
  });

  test("returns an array", async () => {
    expect(Array.isArray(players)).toBe(true);
  });

  test("returns players with name and id", async () => {
    players.forEach((player) => {
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
    });
  });
});

// TODO: Tests for `fetchSinglePlayer`
// DONE

describe("fetchSinglePlayer", () => {
  let player;
  beforeAll(async () => {
    player = await fetchSinglePlayer();
  });

  test("return an object", async () => {
    expect(typeof player).toBe("object");
  });

  test("returns player with the name and id", async () => {
    expect(player).toHaveProperty("name");
    expect(player).toHaveProperty("id");
  });
});

// TODO: Tests for `addNewPlayer`
// DONE

describe("addNewPlayer", () => {
  let addedPlayer;
  beforeAll(async () => {
    addedPlayer = await addNewPlayer();
  });

  test("returns an object", async () => {
    expect(typeof addedPlayer).toBe("object");
  });

  test("returns player with name and id", async () => {
    expect(addedPlayer).toHaveProperty("name");
    expect(addedPlayer).toHaveProperty("id");
  });
});

// (Optional) TODO: Tests for `removePlayer`
// DONE

describe("removePlayer", () => {
  let players;
  let deletedPlayer;
  beforeAll(async () => {
    players = await fetchAllPlayers();
    deletedPlayer = await removePlayer();
  });
  test("players array does not contain deletedPlayer", async () => {
    const playerIds = players.map((player) => player.id);
    expect(playerIds.includes(deletedPlayer.id)).toBe(false);
  });
});
