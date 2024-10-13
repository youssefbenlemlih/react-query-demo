import {
  Button,
  Flex,
  Modal,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconHome, IconPhone } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useCreateContact } from "../api/hooks";

type CreateNewContactModalProps = {
  isOpen: boolean;
  close: () => void;
};

export const CreateNewContactModal = ({
  isOpen,
  close,
}: CreateNewContactModalProps) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });
  useEffect(() => {
    if (isOpen)
      setFormState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
      });
  }, [isOpen]);
  const { mutate, isPending } = useCreateContact(() => close());
  const onSaveClick = () => {
    mutate({ ...formState });
  };
  return (
    <Modal opened={isOpen} onClose={close} title="Create New Contact">
      <Stack>
        <SimpleGrid cols={2}>
          <TextInput
            value={formState.firstName}
            label="First name"
            placeholder="Enter first name"
            onChange={(e) =>
              setFormState({ ...formState, firstName: e.target.value })
            }
          />
          <TextInput
            value={formState.lastName}
            label="Last name"
            placeholder="Enter last name"
            onChange={(e) =>
              setFormState({ ...formState, lastName: e.target.value })
            }
          />
        </SimpleGrid>
        <TextInput
          value={formState.phoneNumber}
          leftSection={<IconPhone size={14} />}
          label="Phone number"
          placeholder="Enter first name"
          onChange={(e) =>
            setFormState({ ...formState, phoneNumber: e.target.value })
          }
        />
        <TextInput
          value={formState.address}
          leftSection={<IconHome size={14} />}
          label="Address"
          placeholder="Enter Adress"
          onChange={(e) =>
            setFormState({ ...formState, address: e.target.value })
          }
        />
        <Flex gap="sm" mx="auto">
          <Button
            onClick={() => close()}
            variant="light"
            style={{ alignSelf: "center" }}
          >
            Cancel
          </Button>
          <Button loading={isPending} onClick={onSaveClick}>
            Create
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};
