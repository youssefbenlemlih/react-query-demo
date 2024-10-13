import {
  Box,
  Image,
  Flex,
  Modal,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useContactDetails, useNumberCountryCode } from "../api/hooks";
import { Spinner } from "./Spinner";

type ContactDetailsModalProps = {
  selectedContactId: undefined | string;
  close: () => void;
};

export const ContactDetailsModal = ({
  selectedContactId,
  close,
}: ContactDetailsModalProps) => {
  const { data, isPending } = useContactDetails(selectedContactId);
  const { data: countryCode, isLoading: isCountryCodePending } =
    useNumberCountryCode(data?.phoneNumber);
  return (
    <Modal opened={!!selectedContactId} onClose={close} title="Details">
      {isPending && <Spinner />}
      {data && (
        <Stack>
          <SimpleGrid cols={2}>
            <Box>
              <Text size="sm" c="dimmed">
                First name
              </Text>
              <Text inline>{data.firstName}</Text>
            </Box>
            <Box>
              <Text size="sm" c="dimmed">
                Last name
              </Text>
              <Text inline>{data.lastName}</Text>
            </Box>
          </SimpleGrid>
          <Box>
            <Text size="sm" c="dimmed">
              Phone number
            </Text>
            <Flex gap={6} align={"center"}>
              {countryCode && !isCountryCodePending ? (
                <Image
                  radius={2}
                  src={`https://flagcdn.com/w320/${countryCode}.png`}
                  w={20}
                />
              ) : (
                <Box bg="gray.2" w={20} h={12} style={{ borderRadius: 2 }} />
              )}
              <Text inline>{data.phoneNumber}</Text>
            </Flex>
          </Box>
          <Box>
            <Text size="sm" c="dimmed">
              Adress{" "}
            </Text>
            <Text inline>{data.address}</Text>
          </Box>
        </Stack>
      )}
    </Modal>
  );
};
