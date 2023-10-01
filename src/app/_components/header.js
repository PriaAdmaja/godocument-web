"use client";
import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import defaultAvatar from "../../assets/default-avatar.jpg";

const Header = () => {
    const [search, setSearch] = useState(null)
  const { avatar, name } = useSelector((state) => state.user);

  const searchDocument = (e) => {
    e.preventDefault()
    console.log(search);
  }
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
