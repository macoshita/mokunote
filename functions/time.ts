export const onRequestGet: PagesFunction = () => {
  return new Response(new Date().toISOString());
};
