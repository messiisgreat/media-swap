import { ItemDescription } from "@/app/(contents)/item/[id]/_components/itemDescription/ItemDescription";
import { type Meta } from "@storybook/react";

export default {
  component: ItemDescription,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center  bg-gray-300 py-16 [&>*]:max-w-md">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ItemDescription>;

export const NormalText = {
  args: {
    description:
      "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモーリオ市、郊外のぎらぎらひかる草の波。",
  },
};

export const LongText = {
  args: {
    description: `吾輩は猫である。
名前はまだ無い。
どこで生れたかとんと見当がつかぬ。
何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。
吾輩はここで始めて人間というものを見た。
しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。
この書生というのは時々我々を捕えて煮て食うという話である。
しかしその当時は何という考もなかったから別段恐しいとも思わなかった。
ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。
掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。
この時妙なものだと思った感じが今でも残っている。
第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。
その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。
のみならず顔の真中があまりに突起している。`,
  },
};

export const Empty = {
  args: {
    description: "",
  },
};

export const IncludeLineSpace = {
  args: {
    description: "1行目\n2行目\n\n\n\n改行4つ",
  },
};
