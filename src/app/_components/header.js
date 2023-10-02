"use client";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import defaultAvatar from "../../assets/default-avatar.jpg";

const Header = () => {
  const [search, setSearch] = useState(null);
  const { avatar, name } = useSelector((state) => state.user);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchDocument = (e) => {
    e.preventDefault();
    createQueryParams("title", search);
  };

  const createQueryParams = (key, value) => {
    const queryList = {};
    const queryUpdate = [];
    searchParams.forEach((value, key) => (queryList[key] = value));
    queryList[key] = value;

    for (const key in queryList) {
      queryUpdate.push(`${key}=${queryList[key]}`);
    }


    const url = `dashboard?${queryUpdate.join("&")}`;
    router.push(url);
  };

  return (
    <header className="flex justify-between items-center px-20 py-5 shadow-md bg-white">
      <p className="font-bold">GoDocument</p>
      <form onSubmit={searchDocument}>
        <input
          type="text"
          placeholder="Search document"
          className="input input-bordered  max-w-xs"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <section className="flex justify-center items-center gap-5">
        <div className="avatar">
          <div className="w-8 rounded">
            <Image src={avatar ? avatar : defaultAvatar} alt="avatar" />
          </div>
        </div>
        <p>{name}</p>
      </section>
    </header>
  );
};

export default Header;
