import { useState } from "react";
import { Layout } from "./components/Layout";
import { ContactsTable } from "./components/ContactsTable";
import { CreateNewContactModal } from "./components/CreateNewContactModal";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

function App() {
  const [isCreateNewContactModalOpen, setIsCreateNewContactModalOpen] =
    useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string>();
  return (
    <Layout
      rightSection={
        <Button
          onClick={() => setIsCreateNewContactModalOpen(true)}
          size="compact-md"
          leftSection={<IconPlus size={16} />}
        >
          Add Contact
        </Button>
      }
    >
      <ContactsTable openContactDetailsDialog={setSelectedContactId} />
      <CreateNewContactModal
        isOpen={isCreateNewContactModalOpen}
        close={() => setIsCreateNewContactModalOpen(false)}
      />
    </Layout>
  );
}

export default App;
