export const dataLoader = async () => {
  const res = await fetch("");
  if (!res.ok) {
    throw new Error("Opps...", 500);
  }
  const jsonResult = await res.json();

  return jsonResult;
};
