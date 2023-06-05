import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import SearchModal from "@/app/components/modals/SearchModal";
import RentModal from "@/app/components/modals/RentModal";
import getCurrentUser from "../utilities/currentUser";
import AuthContext from "../context/AuthContext";
import VideoModal from "../components/modals/VideoModal";

export default async function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <section>
      <AuthContext>
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        <RentModal />
        <VideoModal />
        <Navbar currentUser={currentUser} />
        <div className="pt-40 pb-24">{children}</div>
      </AuthContext>
    </section>
  );
}
