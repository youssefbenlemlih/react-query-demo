import { Anchor, Card, Pagination, Table } from "@mantine/core";
import { useUsers } from "../api/hooks";
import { useState } from "react";

type UsersTableProps = { openUserDetailsDialog: (userId: string) => void };

export const UsersTable = ({ openUserDetailsDialog }: UsersTableProps) => {
  const [page, setPage] = useState(1);
  const { data } = useUsers(page);
  return (
    <Card withBorder radius={"md"} shadow="md">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.users.map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>
                <Anchor onClick={() => openUserDetailsDialog(user.id)}>
                  {user.firstName} {user.lastName}
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
