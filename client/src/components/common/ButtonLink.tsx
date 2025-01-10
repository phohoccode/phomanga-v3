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
}: ButtonLink) => {
  return (
    <Link
      href={href}
      className={`flex ${positionItem === "end" && "justify-end"} ${
        positionItem === "start" && "justify-start"
      } ${positionItem === "center" && "justify-center"}`}
    >
      <Button
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
