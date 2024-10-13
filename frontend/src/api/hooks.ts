import { useQuery } from "@tanstack/react-query";
import { client } from "./client";

export const useUsers = (page: number) =>
  useQuery({
    queryKey: ["users", { page }],
    queryFn: () => client.getUsers(page),
  });
