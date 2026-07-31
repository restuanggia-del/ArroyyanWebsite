function MapEmbed({ src, query, height = "24rem" }) {
  const embedSrc =
    src ||
    `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <iframe
      title="Lokasi Arroyyan99"
      src={embedSrc}
      style={{ border: 0, width: "100%", height }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-xl"
    />
  );
}

export default MapEmbed;
