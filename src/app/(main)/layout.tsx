import { Footer } from "@/components/common/footer";
import Header from "@/components/common/header";
import { Box, Container } from "@mantine/core";
import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box className=" w-full h-full">
      <Header />
      <Container className="w-full min-h-screen">{children}</Container>
      <Footer />
    </Box>
  );
};

export default Layout;
