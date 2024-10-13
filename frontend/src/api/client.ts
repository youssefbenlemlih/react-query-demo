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

const backenUrl = "http://localhost:3000";

export const client = {
  async getContacts(page: number) {
    const res = await fetch(`${backenUrl}/contacts?page=${page}`);
    const json = await res.json();
    return json as GetContactsResponse;
  },
};
