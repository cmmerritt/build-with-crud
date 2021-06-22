export function formatQuote(data) {
  const quote = `${data.content} - ${data.originator.name}`;
  return quote;
}
