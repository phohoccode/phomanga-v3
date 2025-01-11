export type codeErrorLogin = "invalid_credentials" | "zod_error";
export type registerAccount = {
  name: string;
  email: string;
  password: string;
  otp: string;
};

export type resetPassword = {
  email: string;
  password: string;
  otp: string;
};

export type icon = {
  width?: string;
  height?: string;
};

export type comicCategory = {
  _id: string;
  name: string;
  slug: string;
};

export type RootModal = {
  title: string | React.ReactNode;
  isModalOpen: boolean;
  children: React.ReactNode;
  closeIcon?: React.ReactNode | null;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type ComicDetail = {
  description: string;
  slug: string;
  currentPage: string;
};

export type ComicInfo = {
  slug: string;
};

export type SearchComic = {
  keyword: string;
  currentPage: string;
};

export type ButtonLink = {
  href: string;
  text: string;
  showIcon?: boolean;
  positionIcon?: "start" | "end";
  positionItem?: "start" | "end" | "center";
  icon?: React.ReactNode;
  color?:
    | "cyan"
    | "red"
    | "green"
    | "blue"
    | "default"
    | "primary"
    | "danger"
    | "purple"
    | "magenta"
    | "pink"
    | "orange"
    | "yellow"
    | "volcano"
    | "geekblue"
    | "lime"
    | "gold"
    | undefined;
  variant?:
    | "solid"
    | "outlined"
    | "text"
    | "link"
    | "dashed"
    | "filled"
    | undefined;
  styleLink?: React.CSSProperties;
  styleButton?: React.CSSProperties;
};
