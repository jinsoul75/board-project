export default function dateFommatter(date: string) {
  const splitByT = date.split('T');
  const formattedDate = splitByT[0];
  const formattedTime = splitByT[1].slice(0, 8);

  return `${formattedDate} ${formattedTime}`
}
