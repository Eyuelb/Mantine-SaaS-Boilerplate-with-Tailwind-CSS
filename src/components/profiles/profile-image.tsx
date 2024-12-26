import { useSession } from "@/lib/auth/auth.hooks";
import { IconUserCircle } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

const ProfileImage = () => {
  const { account } = useSession();

  return (
    <div>
      {account?.image ? (
        <Image
          src={account?.image ?? ""}
          alt=""
          width={30}
          height={30}
          className="rounded-full"
        />
      ) : (
        <IconUserCircle stroke={2} />
      )}
    </div>
  );
};

export default ProfileImage;
