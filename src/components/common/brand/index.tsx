import { Flex, Text } from "@mantine/core";
import Link from "next/link";
export const Brand = () => {
  return (
    <Link href={"/"}>
      <Flex className="items-center gap-1 p-1 mr-9">
        <Text fw={700} fz={19} c="primary.7">
          Allora
        </Text>
      </Flex>
    </Link>
  );
};
