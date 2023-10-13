export default function NoAvailableServicePage() {
    return (
        <div className="flex flex-col items-center my-12">
            <img
                src="https://us.123rf.com/450wm/vectora/vectora1701/vectora170100031/69884044-%E4%BD%95%E3%81%8B%E3%82%92%E5%88%B6%E9%99%90%E3%80%81%E7%A6%81%E6%AD%A2%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%B3%E3%80%82%E8%B5%A4%E5%8D%81%E5%AD%97%E7%A4%BE%E3%80%81%E8%B5%A4%E6%96%87%E5%AD%97%E3%80%81%E5%9B%B3%E5%BD%A2%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3-%C3%97-%C3%97.jpg?ver=6"
                alt=""
                width={120}
                height={120}
            />
            <h1 className="my-10 text-red-500 font-bold text-4xl">年齢認証</h1>
            <p className="text-orange-600 font-bold">このサイトは18歳以上でご利用いただけます</p>
        </div>
    );
}