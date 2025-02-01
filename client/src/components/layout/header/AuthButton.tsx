import ButtonLink from "@/components/common/ButtonLink";

const AuthButton = () => {
  return (
    <>
      <ButtonLink
        href="/auth/sign-in"
        text="Đăng nhập"
        color="cyan"
        variant="solid"
      />

      <ButtonLink
        href="/auth/sign-up"
        text="Đăng ký"
        color="cyan"
        variant="outlined"
      />
    </>
  );
};

export default AuthButton;
