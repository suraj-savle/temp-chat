export function generateRoomCode() {
  const words = ["FOX", "CHAT", "ROOM", "WAVE"];
  const word = words[Math.floor(Math.random() * words.length)];
  const num = Math.floor(Math.random() * 90 + 10);

  return `${word}-${num}`;
}