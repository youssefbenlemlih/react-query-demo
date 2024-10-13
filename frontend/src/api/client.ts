export type ContactOverview = {
  id: string;
  firstName: string;
  lastName: string;
};

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
};

export type CreateContactRequest = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
};

export type GetContactsResponse = {
  contacts: Contact[];
  totalPages: number;
  totalContacts: number;
};

export type Country = {
  name: string;
  dialCode: string;
  code: string;
};
const backenUrl = "http://localhost:3000";

export const client = {
  async getContacts(page: number) {
    const res = await fetch(`${backenUrl}/contacts?page=${page}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    return json as GetContactsResponse;
  },
  async getContact(contactId: string) {
    const res = await fetch(`${backenUrl}/contacts/${contactId}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    return json as Contact;
  },
  async createContact(contact: CreateContactRequest) {
    const res = await fetch(`${backenUrl}/contacts/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse.errors?.[0]?.msg || "Unknown error");
    }
    const json = await res.json();
    return json as Contact;
  },
  async editContact(contact: Contact) {
    const res = await fetch(`${backenUrl}/contacts/${contact.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse.errors?.[0]?.msg || "Unknown error");
    }
    const json = await res.json();
    return json as Contact;
  },
  async getCountry(phoneNumber: string) {
    const res = await fetch(`${backenUrl}/phone-number-details/${phoneNumber}`);
    const json = await res.json();
    return json as Country;
  },
};
