import Image from "next/image";
import closeIcon from "/src/assets/close.jpeg";

export default function NoAvailableServicePage() {
    return (
        <div className="flex flex-col items-center my-12">
            <Image
                src={closeIcon}
                alt=""
                width={120}
                height={120}
            />
            <h1 className="my-10 text-red-500 font-bold text-4xl">年齢認証</h1>
            <p className="text-orange-600 font-bold">このサイトは18歳以上でご利用いただけます</p>
        </div>
    );
}