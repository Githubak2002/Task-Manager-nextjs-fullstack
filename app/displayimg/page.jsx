"use client"

import { useEffect, useState } from 'react';

export default function Page() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch('/api/images');
      const data = await res.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Uploaded Images</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <img key={index} src={image.url} alt={`image-${index}`} width="200" />
        ))}
      </div>
    </div>
  );
}
