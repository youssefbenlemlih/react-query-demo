var express = require("express");
var { body, validationResult } = require("express-validator");
var router = express.Router();

const contacts = require("../initialContacts.js");
const countryCodesMap = require("../countryCodesMap.js");

const crypto = require("crypto");
// Get contacts with pagination
router.get("/contacts", function (req, res) {
  console.log("Fetching contacts for page:", req.query.page); // Log the page number

  const page = parseInt(req.query.page) || 1;
  const limit = 20; // Entries per page
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

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

// Create a new contact with validation
router.post(
  "/contacts",
  [
    body("firstName")
      .isString()
      .notEmpty()
      .withMessage("First name is required"),
    body("lastName").isString().notEmpty().withMessage("Last name is required"),
    body("phoneNumber")
      .isString()
      .notEmpty()
      .withMessage("Phone number is required"),
    body("address").isString().optional(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, phoneNumber, address } = req.body;
    const newContact = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      phoneNumber,
      address,
    };

    contacts.unshift(newContact);
    res.status(201).json(newContact);
  }
);

// Get a single contact by ID
router.get("/contacts/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === req.params.id);
  if (!contact) return res.status(404).json({ message: "Contact not found" });
  res.status(200).json(contact);
});

// Update a contact by ID with validation
router.put(
  "/contacts/:id",
  [
    body("firstName")
      .isString()
      .optional()
      .notEmpty()
      .withMessage("First name is required"),
    body("lastName")
      .isString()
      .optional()
      .notEmpty()
      .withMessage("Last name is required"),
    body("phoneNumber")
      .isString()
      .notEmpty()
      .withMessage("Phone number is required"),
    body("address").isString().optional(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contactIndex = contacts.findIndex(
      (contact) => contact.id === req.params.id
    );
    if (contactIndex === -1)
      return res.status(404).json({ message: "Contact not found" });

    contacts[contactIndex] = { id: req.params.id, ...req.body };
    res.status(200).json(contacts[contactIndex]);
  }
);

// Delete a contact by ID
router.delete("/contacts/:id", async (req, res) => {
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === req.params.id
  );
  if (contactIndex === -1)
    return res.status(404).json({ message: "Contact not found" });
  contacts.splice(contactIndex);
  res.status(200).json({ message: "Contact deleted" });
});

// Get a single contact by ID
router.get("/phone-number-details/:number", async (req, res) => {
  const code = extractCountryCode(req.params.number);
  const country = countryCodesMap.find(
    (entry) => entry.dialCode === `+${code}`
  );
  console.log({ code });
  if (!country) return res.status(404).json({ message: "Country not found" });
  res.status(200).json(country);
});

function extractCountryCode(phoneNumber) {
  // Extract digits from within the parentheses (assuming it's the area code)
  const countryCodeMatch = phoneNumber.match(/\(\+(\d+)\)/);

  // Return the matched area code or null if none found
  return countryCodeMatch ? countryCodeMatch[1] : null;
}
module.exports = router;
