import type { ButtonLink } from "@/lib/types";
import { Button } from "antd";
import Link from "next/link";

const ButtonLink = ({
  href,
  text,
  showIcon,
  positionIcon,
  positionItem,
  icon,
  color,
  variant,
  styleLink,
  styleButton,
}: ButtonLink) => {
  return (
    <Link
      style={styleLink}
      href={href}
      className={`flex ${positionItem === "end" && "justify-end"} ${
        positionItem === "start" && "justify-start"
      } ${positionItem === "center" && "justify-center"}`}
    >
      <Button
        style={styleButton}
        color={color ?? "cyan"}
        variant={variant ?? "solid"}
        icon={showIcon && icon}
        iconPosition={positionIcon}
      >
        {text}
      </Button>
    </Link>
  );
};

export default ButtonLink;
