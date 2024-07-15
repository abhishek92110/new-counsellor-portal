import React from 'react';

function GoogleMeetEmbed() {
  const videoId = '1wnjSFthaLTdRyd9YkghVjsVK1diocMDe';
  const embedUrl = `https://drive.google.com/file/d/${videoId}/preview`;

  return (
    <div>
      <h1>Google Meet Recording</h1>
      <iframe
        title="Google Meet Recording"
        width="640"
        height="360"
        src={embedUrl}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default GoogleMeetEmbed;
