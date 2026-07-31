// Komponen reusable untuk embed Google Maps tanpa perlu API key.
// Cara pakai: <MapEmbed query="Jl. Malabar No. 88 Bogatama, Kec. Penawar Tama, Kab. Tulang Bawang, Lampung 34595" />

function MapEmbed({ query, height = "24rem" }) {
  const encodedQuery = encodeURIComponent(query);
  const src = `https://www.google.com/https://maps.app.goo.gl/FkKsTfwRZmPtCfCv7`;

  return (
    <iframe
      title="Lokasi Arroyyan99"
      src={src}
      width="100%"
      height={height}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-xl"
    />
  );
}

export default MapEmbed;
