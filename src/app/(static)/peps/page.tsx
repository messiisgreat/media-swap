import { H } from "@/components/structure/H";

/**
 * PEPsページ
 */
export default function PepsPage() {
  return (
    <div>
      <div className="border-2">
        <H className="text-center text-xl font-bold">
          外国PEPsの定義（外国の公的機関で要職を持つ方々）
        </H>
        <p className="py-6">
          外国PEPsとは、外国のリーダーや外国の政府、中央銀行や同等の組織で要職にある人々を指します。具体的には、以下の1～8の「外国の公的機関での要職」に、1)
          現職の方、2) 以前その役職にいた方、または3) 上記1) と2)
          の親族に当てはまる方が対象となります。
        </p>
        <ol className="list-decimal px-4">
          <li>外国のトップリーダー</li>
          <li>日本の首相、閣僚や副閣僚と同等の地位</li>
          <li>日本の衆議院の議長や副議長、参議院の議長や副議長と同等の地位</li>
          <li>日本の最高裁判所裁判官と同様の役職</li>
          <li>日本の大使や公使、特命代表や全権代表と同様の役職</li>
          <li>
            日本の統合幕僚のトップやその他の陸、海、空軍の高位職と同様の役職
          </li>
          <li>中央銀行の重役</li>
          <li>予算が国会の同意や認可を必要とする組織の要職</li>
        </ol>
        <p className="py-2 font-bold">［外国PEPsの親族について］</p>
        <ol className="list-disc px-4">
          <li>実質的な結婚関係に近い状況にある方も含まれる。</li>
          <li>本人の前の配偶者は外国PEPsの対象外です。</li>
        </ol>
      </div>
    </div>
  );
}
