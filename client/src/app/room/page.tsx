import { redirect } from "next/navigation";

type SearchParamValue = string | string[] | undefined;

type RoomPageProps = {
  searchParams: Promise<Record<string, SearchParamValue>>;
};

const pick = (value: SearchParamValue): string | undefined => {
  if (Array.isArray(value)) return value[0];
  return value;
};

export default async function RoomPage({ searchParams }: RoomPageProps) {
  const resolvedParams = await searchParams;

  const username = pick(resolvedParams.username) ?? "Guest";
  const mode = pick(resolvedParams.mode) ?? "create";
  const roomCode = pick(resolvedParams.roomCode)?.toUpperCase();

  if (mode === "join" && roomCode) {
    const query = new URLSearchParams({
      username,
      mode: "join",
      roomCode,
    });

    redirect(`/room/${encodeURIComponent(roomCode)}?${query.toString()}`);
  }

  const query = new URLSearchParams({
    username,
    mode: "create",
  });

  redirect(`/room/new?${query.toString()}`);
}
