import Categories from "../categories/Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { TUser } from "@/types";
import NavInfoPage from "./NavInfo";

type TNavbar = {
  currentUser?: TUser | null;
};

const Navbar = ({ currentUser }: TNavbar) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <NavInfoPage />
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
