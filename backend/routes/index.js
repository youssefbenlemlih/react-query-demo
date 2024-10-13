var express = require("express");
var router = express.Router();

const contacts = require("../initialContacts.js");

router.get("/contacts", function (req, res) {
  console.log("Fetching contacts for page:", req.query.page); // Log the page number

  // Get the page number from the query params, default to 1 if not provided
  const page = parseInt(req.query.page) || 1;
  const limit = 20; // Entries per page
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Paginate contacts array
  const paginatedContacts = contacts
    .slice(startIndex, endIndex)
    .map((contact) => ({
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
    }));

  res.json({
    contacts: page,
    totalPages: Math.ceil(contacts.length / limit),
    totalContacts: contacts.length,
    contacts: paginatedContacts,
  });
});

// Create a new contact
router.post("/contacts", async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, address } = req.body;
    const newContact = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      phoneNumber,
      address,
    };
    console.log({ newContact });
    contacts.unshift(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: "Error creating contact", error });
  }
});

// Get a single contact by ID
router.get("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact", error });
  }
});

// Update a contact by ID
router.put("/contacts/:id", async (req, res) => {
  const ContactIndex = contacts.findIndex(
    (contact) => contact.id === req.params.id
  );
  if (ContactIndex === -1)
    return res.status(404).json({ message: "Contact not found" });
  contacts[ContactIndex] = { id: req.params.id, ...req.body };
  res.status(200).json(contacts[ContactIndex]);
});

// Delete a contact by ID
router.delete("/contacts/:id", async (req, res) => {
  const ContactIndex = contacts.findIndex(
    (contact) => contact.id === req.params.id
  );
  if (ContactIndex === -1)
    return res.status(404).json({ message: "Contact not found" });
  contacts.splice(ContactIndex);
  res.status(200).json({ message: "Contact deleted" });
});

module.exports = router;
