import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client, Contact, CreateContactRequest, GetContactsResponse } from "./client";

export const useContacts = <T = GetContactsResponse>(
  page: number,
  select?: (data: GetContactsResponse) => T
) =>
  useQuery({
    queryKey: ["contacts", "list", page],
    queryFn: () => client.getContacts(page),
    select,
  });
export const useContactsCount = () =>
  useContacts(1, (data) => data.totalContacts);

export const useContactDetails = (contactId: string | undefined) =>
  useQuery({
    queryKey: ["contacts", contactId],
    queryFn: () => client.getContact(contactId!),
    enabled: !!contactId,
  });
export const useCreateContact = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contact: CreateContactRequest) => client.createContact(contact),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
      onSuccess?.();
    },
  });
};
export const useEditContact = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contact: Contact) => client.editContact(contact),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
      onSuccess?.();
    },
  });
};
export const useNumberCountryCode = (phoneNumber: string | undefined) =>
  useQuery({
    queryKey: ["number-details", phoneNumber],
    queryFn: () => client.getCountry(phoneNumber!),
    select: (country) => country.code.toLowerCase(),
    enabled: !!phoneNumber,
  });
