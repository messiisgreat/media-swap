import Link from "next/link";
import { useState } from "react";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineBell,
  AiOutlineCamera,
  AiFillBell,
  AiFillCamera,
} from "react-icons/ai";
import { SlUser } from "react-icons/sl";
import { ImUser } from "react-icons/im";

/**
 * フッターの下部ナビゲーションメニュー
 * @returns footer
 */
export const NaviMenu = () => {
  const [homeActive, setHomeActive] = useState(false);
  const [bellActive, setBellActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [userActive, setUserActive] = useState(false);

  const handleHomeClick = () => {
    setHomeActive(true);
    setBellActive(false);
    setCameraActive(false);
    setUserActive(false);
  };

  const handleBellClick = () => {
    setHomeActive(false);
    setBellActive(true);
    setCameraActive(false);
    setUserActive(false);
  };

  const handleCameraClick = () => {
    setHomeActive(false);
    setBellActive(false);
    setCameraActive(true);
    setUserActive(false);
  };

  const handleUserClick = () => {
    setHomeActive(false);
    setBellActive(false);
    setCameraActive(false);
    setUserActive(true);
  };

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200">
      <div className="navbar flex-auto justify-center bg-gray-100">
        <Link
          href="/"
          className="btn btn-ghost flex-1 p-1"
          onClick={handleHomeClick}
        >
          <div className="flex flex-col items-center">
            {homeActive ? (
              <AiFillHome className="text-2xl" />
            ) : (
              <AiOutlineHome className="text-2xl" />
            )}
            <div className="text-xs">ホーム</div>
          </div>
        </Link>
        <Link
          href="/"
          className="btn btn-ghost flex-1 p-1"
          onClick={handleBellClick}
        >
          <div className="flex flex-col items-center">
            {bellActive ? (
              <AiFillBell className="text-2xl" />
            ) : (
              <AiOutlineBell className="text-2xl" />
            )}
            <div className="text-xs">お知らせ</div>
          </div>
        </Link>
        <Link
          href="/"
          className="btn btn-ghost flex-1 p-1"
          onClick={handleCameraClick}
        >
          <div className="flex flex-col items-center">
            {cameraActive ? (
              <AiFillCamera className="text-2xl" />
            ) : (
              <AiOutlineCamera className="text-2xl" />
            )}
            <div className="text-xs">出品</div>
          </div>
        </Link>
        <Link
          href="/"
          className="btn btn-ghost flex-1 p-1"
          onClick={handleUserClick}
        >
          <div className="flex flex-col items-center">
            {userActive ? (
              <ImUser className="text-2xl" />
            ) : (
              <SlUser className="text-2xl" />
            )}
            <div className="text-xs">マイページ</div>
          </div>
        </Link>
      </div>
    </div>
  );
};
