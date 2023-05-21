"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { TUser } from "@/types";

type TUserMenu = {
  currentUser?: TUser | null;
};

const UserMenu = ({ currentUser }: TUserMenu) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };

  const onRent = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsOpen(false);
    rentModal.onOpen();
  };

  const onNavigate = (url: string) => {
    router.push(url);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl z-50 shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="My Profile"
                  onClick={() => onNavigate("/profile")}
                />
                <MenuItem
                  label="My trips"
                  onClick={() => onNavigate("/trips")}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => onNavigate("/favorites")}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => onNavigate("/reservations")}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => onNavigate("/properties")}
                />
                <MenuItem label="Airbnb your home" onClick={onRent} />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
