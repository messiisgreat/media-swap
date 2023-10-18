/**
 * Google Analytics用コンポーネント
 * G-から始まるトラッキングIDを環境変数に設定する
 * @returns Fragment
 */
export const GoogleAnalytics = () => {
  const trackingId = process.env.TRACKING_ID;
  const trackingURL = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  return (
    <>
      <script async src={trackingURL} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${trackingId}');
              `,
        }}
      />
    </>
  );
};
