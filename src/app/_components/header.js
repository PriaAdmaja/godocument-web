"use client"
import Image from "next/image";
import { useSelector } from "react-redux";
import defaultAvatar from "../../assets/default-avatar.jpg";

const Header = () => {
    const {avatar, name} = useSelector(state => state.user);
  return (
    <header className="flex justify-between items-center px-20 py-5 shadow-md bg-white">
      <p className="font-bold">GoDocument</p>
      <section className="flex justify-center items-center gap-5">
        <div className="avatar">
            <div className="w-8 rounded">
                <Image src={avatar ? avatar : defaultAvatar} alt="avatar"/>
            </div>
        </div>
        <p>{name}</p>
      </section>
    </header>
  );
};

export default Header;
