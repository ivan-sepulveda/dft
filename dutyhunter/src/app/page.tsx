import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: airports, error } = await supabase
    .from("airports")
    .select("iata_code, airport_name, city")
    .limit(25);

  if (error) {
    return <main>Supabase error: {error.message}</main>;
  }

  return (
    <main style={{ padding: "32px" }}>
      <h1>Duty Hunter</h1>

      {airports?.map((airport) => (
        <div key={airport.iata_code}>
          {airport.iata_code} — {airport.airport_name} — {airport.city}
        </div>
      ))}
    </main>
  );
}