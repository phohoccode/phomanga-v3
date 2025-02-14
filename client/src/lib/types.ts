export type codeErrorLogin = "invalid_credentials" | "zod_error";
export type registerAccount = {
  name: string;
  email: string;
  password: string;
  typeAccount: "credentials" | "google";
  avatar: string;
  otp?: string;
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
  title: string | React.ReactNode | null;
  isModalOpen: boolean;
  children: React.ReactNode;
  closeIcon?: React.ReactNode | null;
  footer?: React.ReactNode | null;
  width?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    xxl?: string;
  };
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onOk?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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

export type FilterComment = "recent" | "oldest";

export type ComicItem = {
  data: any;
  onClickDelete?: (slug?: string, id?: string) => void;
  loading?: boolean;
};

export type ComicList = {
  data: any;
  loading?: boolean;
  description?: string;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
};

export type PaginationCT = {
  total: number;
  pageSize: number;
  currentPage: number | string;
  titleSearch?: string;
};

export type SavedComic = {
  userId: string;
  dataComic: any;
  type: string;
  avatar: string;
  username: string;
};

export type DeleteComic = {
  userId: string;
  comicSlug?: string;
  comicId?: string;
  type: string;
};

export type GetComments = {
  comicSlug: string;
  page: string;
  limit: number;
  sort: "asc" | "desc";
};

export type criterion =
  | "vip_level"
  | "comment_wrote"
  | "saved_comic"
  | "number_of_stories_read";

export type ListUserProps = {
  criterion:
    | string
    | "vip_level"
    | "comment_wrote"
    | "saved_comic"
    | "number_of_stories_read";
  users: {
    user_id: string;
    username: string;
    avatar: string;
    vip_level?: number;
    quantity?: number;
    nickname?: string;
  }[];
};
