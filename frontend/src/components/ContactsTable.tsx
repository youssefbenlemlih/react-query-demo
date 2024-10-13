import { Anchor, Card, Pagination, Table } from "@mantine/core";
import { useContacts } from "../api/hooks";
import { useState } from "react";

type ContactsTableProps = {
  openContactDetailsDialog: (ContactId: string) => void;
};

export const ContactsTable = ({
  openContactDetailsDialog,
}: ContactsTableProps) => {
  const [page, setPage] = useState(1);
  const { data } = useContacts(page);
  return (
    <Card withBorder radius={"md"} shadow="md">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.contacts.map((contact) => (
            <Table.Tr key={contact.id}>
              <Table.Td>
                <Anchor onClick={() => openContactDetailsDialog(contact.id)}>
                  {contact.firstName} {contact.lastName}
                </Anchor>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Pagination
        total={data?.totalPages || 0}
        value={page}
        onChange={setPage}
        mt="sm"
      />
    </Card>
  );
};
