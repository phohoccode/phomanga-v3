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
  title: string;
  isModalOpen: boolean;
  children: React.ReactNode;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
