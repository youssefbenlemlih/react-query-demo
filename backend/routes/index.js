var express = require("express");
var router = express.Router();

const users = require("../initialUsers.js");

router.get("/users", function (req, res) {
  res.json({
    users: users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    })),
  });
});

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, address } = req.body;
    const newUser = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      phoneNumber,
      address,
    };
    console.log({ newUser });
    users.unshift(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
});

// Get a single user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

// Update a user by ID
app.put("/users/:id", async (req, res) => {
  const userIndex = users.findIndex((user) => user.id === req.params.id);
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });
  users[userIndex] = { id: req.params.id, ...req.body };
  res.status(200).json(users[userIndex]);
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  const userIndex = users.findIndex((user) => user.id === req.params.id);
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });
  users.splice(userIndex);
  res.status(200).json({ message: "User deleted" });
});

module.exports = router;
