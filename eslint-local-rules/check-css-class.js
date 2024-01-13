module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "TailwindCssのtext-black または text-whiteが使われたら警告を出す。",
    },
  },

  create(context) {
    return {
      Literal(node) {
        if (node.value && typeof node.value === "string") {
          if (
            node.value.includes("text-black") ||
            node.value.includes("text-white")
          ) {
            context.report({
              node,
              message:
                "text-black または text-whiteが使用されています。text-body, text-light-bg-bk, text-dark-bg-wh のいずれかに変更してください。",
            });
          }
        }
      },
    };
  },
};
