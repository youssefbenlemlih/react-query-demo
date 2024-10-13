import { Image } from "@mantine/core";

type CountryFlagProps = {
  countryCode: string;
};

export const CountryFlag = ({ countryCode }: CountryFlagProps) => {
  return (
    <Image
      radius={2}
      src={`https://flagcdn.com/w320/${countryCode}.png`}
      w={20}
    />
  );
};
