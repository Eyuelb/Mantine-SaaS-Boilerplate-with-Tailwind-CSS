/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ThemeIcon,
  ThemeIconProps,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import React, { memo } from "react";

interface TooltipButtonProps extends ThemeIconProps {
  tooltip?: string;
  disabled?: boolean;
  component?: any;
  href?: any;
}

const TooltipButton: React.FC<TooltipButtonProps> = memo(
  ({ tooltip, component, ...props }) => {
    return (
      <Tooltip label={tooltip} fz={12} arrowSize={6} offset={5} withArrow>
        <ThemeIcon
          component={component ?? UnstyledButton}
          {...props}
          aria-disabled={props.disabled}
        />
      </Tooltip>
    );
  },
);
TooltipButton.displayName = "TooltipButton";
export default TooltipButton;
