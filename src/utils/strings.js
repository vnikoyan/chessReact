export const truncate = (text, visibleLength: number, dots?) => {
  if (!text) {
    return "";
  }
  if (text.length > visibleLength) {
    const truncated = text.slice(0, visibleLength).replace(/\s+\S*$/, "");
    return `${truncated}${dots || ""}`;
  }

  return text;
};
