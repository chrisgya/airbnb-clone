import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import httpCalls from "../utilities/httpCalls";
import { TUser } from "@/types";

type TUseFavorite = {
  listingId: string;
  currentUser?: TUser | null;
};

const useFavorite = ({ listingId, currentUser }: TUseFavorite) => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }
    setisLoading(true);

    try {
      if (hasFavorited) {
        await httpCalls.remove(`/api/favorites/${listingId}`);
      } else {
        await httpCalls.put(`/api/favorites/${listingId}`);
      }

      router.refresh();
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setisLoading(false);
    }
  };

  return {
    isLoading,
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
