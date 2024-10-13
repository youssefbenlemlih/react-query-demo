export type UserOverview = {
  id: string;
  firstName: string;
  lastName: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
};

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
};

export type GetUsersResponse = {
  users: User[];
  totalPages: number;
  totalUsers: number;
};

const backenUrl = "http://localhost:3000";

export const client = {
  async getUsers(page: number) {
    const res = await fetch(`${backenUrl}/users?page=${page}`);
    const json = await res.json();
    return json as GetUsersResponse;
  },
};
