import { auth } from "@/auth";
import Layout from "@/components/layout/Layout";
import UserInfo from "@/components/UserInfo";

const Page = async () => {
  const session = await auth();

  return (
    <Layout>
      <div className="min-h-screen">
        <div
          style={{
            position: "relative",
            backgroundImage: "url('/background-profile.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "240px",
            borderRadius: "8px",
            marginBottom: "120px",
          }}
        >
          <div
            className={`absolute lg:-bottom-16 lg:left-[16%] -bottom-16 left-[50%] -translate-x-1/2  border-[3px] border-[#ccc] rounded-full overflow-hidden`}
          >
            <img
              loading="lazy"
              src={session?.user?.image ?? "/avatar.jpg"}
              alt="avatar"
              className="w-32 h-32 "
            />
          </div>
        </div>
        <UserInfo />
      </div>
    </Layout>
  );
};

export default Page;
