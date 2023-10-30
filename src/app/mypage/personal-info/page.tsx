import FormSubmitButton from "@/components/FormSubmitButton";

/**
 * 住所変更ページ
 */
export default async function Page() {
  return (
    <form className="flex flex-col gap-3">
      <label>
        <span>郵便番号</span>
        <div>
          <input
            type="text"
            name="postal_code"
            minLength={7}
            maxLength={8}
            pattern="\d*"
            autoComplete="shipping postal-code"
            className="border border-gray-300 rounded-md py-2 px-3 w-250"
            placeholder="例: 1234567"
          />
        </div>
      </label>
      <label>
        <span>都道府県</span>
        <div>
          <select
            name="prefecture"
            autoComplete="shipping address-level1"
            className="rounded-md border border-gray-300 px-3 py-2"
            defaultValue={"東京都"}
          >
            <option value="北海道">北海道</option>
            <option value="青森県">青森県</option>
            <option value="岩手県">岩手県</option>
            <option value="宮城県">宮城県</option>
            <option value="秋田県">秋田県</option>
            <option value="山形県">山形県</option>
            <option value="福島県">福島県</option>
            <option value="茨城県">茨城県</option>
            <option value="栃木県">栃木県</option>
            <option value="群馬県">群馬県</option>
            <option value="埼玉県">埼玉県</option>
            <option value="千葉県">千葉県</option>
            <option value="東京都">東京都</option>
            <option value="神奈川県">神奈川県</option>
            <option value="新潟県">新潟県</option>
            <option value="富山県">富山県</option>
            <option value="石川県">石川県</option>
            <option value="福井県">福井県</option>
            <option value="山梨県">山梨県</option>
            <option value="長野県">長野県</option>
            <option value="岐阜県">岐阜県</option>
            <option value="静岡県">静岡県</option>
            <option value="愛知県">愛知県</option>
            <option value="三重県">三重県</option>
            <option value="滋賀県">滋賀県</option>
            <option value="京都府">京都府</option>
            <option value="大阪府">大阪府</option>
            <option value="兵庫県">兵庫県</option>
            <option value="奈良県">奈良県</option>
            <option value="和歌山県">和歌山県</option>
            <option value="鳥取県">鳥取県</option>
            <option value="島根県">島根県</option>
            <option value="岡山県">岡山県</option>
            <option value="広島県">広島県</option>
            <option value="山口県">山口県</option>
            <option value="徳島県">徳島県</option>
            <option value="香川県">香川県</option>
            <option value="愛媛県">愛媛県</option>
            <option value="高知県">高知県</option>
            <option value="福岡県">福岡県</option>
            <option value="佐賀県">佐賀県</option>
            <option value="長崎県">長崎県</option>
            <option value="熊本県">熊本県</option>
            <option value="大分県">大分県</option>
            <option value="宮崎県">宮崎県</option>
            <option value="鹿児島県">鹿児島県</option>
            <option value="沖縄県">沖縄県</option>
          </select>
        </div>
      </label>
      <label>
        <span>{"市区町村 (例: 川崎市川崎区)"}</span>
        <input
          type="text"
          name="city"
          autoComplete="shipping address-level2"
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
          placeholder="川崎市川崎区"
        />
      </label>
      <label>
        <span>{"町域・番地(例: 旭町1-1)"}</span>
        <input
          type="text"
          name="address1"
          autoComplete="shipping address-line1"
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
          placeholder="旭町1-1"
        />
      </label>
      <label>
        <span>{"建物名など(例: ○○マンション101号)"}</span>
        <input
          type="text"
          name="address2"
          autoComplete="shipping address-line2"
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
          placeholder="○○マンション101号"
        />
      </label>
      <FormSubmitButton className="btn-block">住所を登録する</FormSubmitButton>
    </form>
  );
}
