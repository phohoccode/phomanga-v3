export type DialogCustomProps = {
  children: React.ReactNode;
  type: "button" | "icon-button";
  textButton?: string;
  title?: string;
  description?: string;
  maxWidth?: string;
  size?: "1" | "2" | "3" | "4";
  variant?: "soft" | "classic" | "solid" | "surface" | "outline";
  icon?: React.ReactNode;
  color?:
    | "gray"
    | "gold"
    | "bronze"
    | "brown"
    | "yellow"
    | "amber"
    | "orange"
    | "tomato"
    | "red"
    | "ruby"
    | "crimson"
    | "pink"
    | "plum"
    | "purple"
    | "violet"
    | "iris"
    | "indigo"
    | "blue"
    | "cyan"
    | "teal"
    | "jade"
    | "green"
    | "grass"
    | "lime"
    | "mint"
    | "sky";
};
