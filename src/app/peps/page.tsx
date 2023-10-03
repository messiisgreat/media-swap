import React from "react";

export default function PepsPage() {
  return (
    <div>
      <div className="border-2">
        <h2 className="text-center text-xl font-bold">
          外国PEPs（外国の政府等において重要な地位を占める方）とは
        </h2>
        <p className="py-6">
          外国PEPsとは、「外国の元首及び外国の政府、中央銀行その他これらに類する機関において重要な地位を占める者」を指し、具体的には、下記1～8に挙げる「外国の政府等において重要な地位」に、（1）現在就いている方、（2）過去にその地位に就いていた方、または（3）左記（1）及び（2）の親族の方が該当します。
        </p>
        <ol className="list-decimal px-4">
          <li>外国の元首</li>
          <li>
            本邦における内閣総理大臣その他の国務大臣及び副大臣に相当する職
          </li>
          <li>
            本邦における衆議院議長、衆議院副議長、参議院議長又は参議院副議長に相当する職
          </li>
          <li>本邦における最高裁判所の裁判官に相当する職</li>
          <li>
            本邦における特命全権大使、特命全権公使、特派大使、政府代表又は全権委員に相当する職
          </li>
          <li>
            本邦における統合幕僚長、統合幕僚副長、陸上幕僚長、陸上幕僚副長、海上幕僚長、海上幕僚副長、航空幕僚長又は航空幕僚副長に相当する職
          </li>
          <li>中央銀行の役員</li>
          <li>
            予算について国会の議決を経、又は承認を受けなければならない法人の役員
          </li>
        </ol>
        <p className="py-2 font-bold">［外国PEPsの親族の範囲］</p>
        <ol className="list-disc px-4">
          <li>
            内縁関係にある方等、事実上婚姻関係と同様の事情にある方を含みます。
          </li>
          <li>本人の元配偶者は外国PEPsに該当しません。</li>
        </ol>
      </div>
    </div>
  );
}
