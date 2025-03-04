import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Paper, Typography } from "@mui/material";
import { Tournament } from "@/types";

mapboxgl.accessToken =
  "pk.eyJ1IjoibGFsaWdiIiwiYSI6ImNrejhqdTMydzB3a2Eyb211cjJyZG95NmcifQ.gkDhUGob--lX_-nsAnMS0A";

type TournamentMapProps = {
  tournaments: Tournament[];
};

export default function TournamentMap({ tournaments }: TournamentMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0], // Default center if no valid locations
      zoom: 2,
    });

    tournaments.forEach((tournament) => {
      if (
        tournament.location &&
        tournament.location.lng !== undefined &&
        tournament.location.lat !== undefined
      ) {
        new mapboxgl.Marker()
          .setLngLat([tournament.location.lng, tournament.location.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`<strong>${tournament.title}</strong>`)
          )
          .addTo(map);
      } else {
        console.warn(`Tournament "${tournament.title}" has no valid location.`);
      }
    });

    return () => map.remove();
  }, [tournaments]);

  return (
    <Paper sx={{ p: 3, boxShadow: 4, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Tournament Locations
      </Typography>
      <div ref={mapContainer} style={{ width: "100%", borderRadius: "8px" }} />
    </Paper>
  );
}
