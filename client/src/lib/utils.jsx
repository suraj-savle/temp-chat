export function generateRandomUsername() {
  const adjectives = ["Happy", "Cool", "Smart", "Fast", "Wild", "Clever", "Brave", "Calm"];
  const nouns = ["Panda", "Tiger", "Eagle", "Wolf", "Fox", "Bear", "Hawk", "Lion"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 100);
  return `${adjective}${noun}${num}`;
}