import { useHover } from "@mantine/hooks";
import { ContactOverview } from "../api/client";
import { ActionIcon, Anchor, Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

type ContactTableRowProps = {
  contact: ContactOverview;
  openContactDetailsDialog: (contactId: string) => void;
  openContactEditDialog: (contactId: string) => void;
};
export const ContactTableRow = ({
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
