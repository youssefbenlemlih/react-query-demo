import {
  ActionIcon,
  Anchor,
  Card,
  Center,
  Pagination,
  Table,
} from "@mantine/core";
import { useContacts } from "../api/hooks";
import { useState } from "react";
import { ContactOverview } from "../api/client";
import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { Spinner } from "./Spinner";

type ContactsTableProps = {
  openContactDetailsDialog: (contactId: string) => void;
  openContactEditDialog: (contactId: string) => void;
};

type ContactTableRowProps = {
  contact: ContactOverview;
  openContactDetailsDialog: (contactId: string) => void;
  openContactEditDialog: (contactId: string) => void;
};
const ContactTableRow = ({
  contact,
  openContactDetailsDialog,
  openContactEditDialog,
}: ContactTableRowProps) => {
  const { hovered, ref } = useHover();

  return (
    <Table.Tr ref={ref}>
      <Table.Td>
        <Anchor onClick={() => openContactDetailsDialog(contact.id)}>
          {contact.firstName} {contact.lastName}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <ActionIcon
          variant="light"
          style={{ opacity: hovered ? 1 : 0 }}
          onClick={() => openContactEditDialog(contact.id)}
        >
          <IconEdit size={14} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
};
export const ContactsTable = ({
  openContactDetailsDialog,
  openContactEditDialog,
}: ContactsTableProps) => {
  const [page, setPage] = useState(1);
  const { data, isPending } = useContacts(page);
  if (isPending)
    return (
      <Card withBorder radius={"md"} shadow="md">
        {isPending && <Spinner />}
      </Card>
    );
  return (
    <Card withBorder radius={"md"} shadow="md">
      {isPending && <Spinner />}
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.contacts.map((contact) => (
            <ContactTableRow
              openContactDetailsDialog={openContactDetailsDialog}
              openContactEditDialog={openContactEditDialog}
              contact={contact}
              key={contact.id}
            />
          ))}
        </Table.Tbody>
      </Table>
      <Center>
        <Pagination
          total={data?.totalPages || 0}
          value={page}
          onChange={setPage}
          mt="sm"
        />
      </Center>
    </Card>
  );
};
