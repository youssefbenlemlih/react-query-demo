var express = require("express");
var router = express.Router();

const users = require("../initialUsers.js");

router.get("/users", function (req, res) {
  console.log("Fetching users for page:", req.query.page); // Log the page number

  // Get the page number from the query params, default to 1 if not provided
  const page = parseInt(req.query.page) || 1;
  const limit = 20; // Entries per page
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Paginate users array
  const paginatedUsers = users.slice(startIndex, endIndex).map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
  }));

  res.json({
    users: page,
    totalPages: Math.ceil(users.length / limit),
    totalUsers: users.length,
    users: paginatedUsers,
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
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

// Update a user by ID
router.put("/users/:id", async (req, res) => {
  const userIndex = users.findIndex((user) => user.id === req.params.id);
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });
  users[userIndex] = { id: req.params.id, ...req.body };
  res.status(200).json(users[userIndex]);
});

// Delete a user by ID
router.delete("/users/:id", async (req, res) => {
  const userIndex = users.findIndex((user) => user.id === req.params.id);
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });
  users.splice(userIndex);
  res.status(200).json({ message: "User deleted" });
});

module.exports = router;
