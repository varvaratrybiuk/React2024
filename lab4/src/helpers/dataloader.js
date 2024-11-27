export const dataLoader = async () => {
  const res = await fetch("https://httpstat.us/500");
  if (res.status === 500) {
    throw new Response(`${res.statusText}`, {
      status: 500,
    });
  }
  const jsonResult = await res.json();

  return jsonResult;
};
