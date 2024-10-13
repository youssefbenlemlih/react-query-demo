import { useQuery } from "@tanstack/react-query";
import { client } from "./client";

export const useContacts = (page: number) =>
  useQuery({
    queryKey: ["contacts", { page }],
    queryFn: () => client.getContacts(page),
  });
