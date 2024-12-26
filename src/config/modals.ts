import { ScrollArea } from "@mantine/core";

export const rightModalDrawer = {
  styles: {
    inner: {
      justifyContent: "flex-end",
    },
    content: {
      height: "100dvh",
      backgroundColor: "var(--card)",
    },
  },
  yOffset: "0",
  xOffset: "0",
  overlayProps: {
    backgroundOpacity: 0.55,
    blur: 3,
  },
};

export const modalProps = {
  classNames: {
    content: "bg-[--card]",
  },
  size: "sm",
  overlayProps: {
    backgroundOpacity: 0.55,
    blur: 3,
  },
  centered:true,
  withCloseButton:false,
  scrollAreaComponent: ScrollArea.Autosize,
};
