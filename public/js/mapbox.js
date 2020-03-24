/* eslint-disable */
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZnJhbmNpc2xhZ2FyZXMiLCJhIjoiY2s3dzQzZ2RzMDBkbjNodDI0eXo3b29rdyJ9.EoturGby61hMg7fsuKAWrA';

  var map = new mapboxgl.Map({
    container: 'map',
    // Alternatively you can also use -> mapbox://styles/mapbox/light-v10
    style: 'mapbox://styles/francislagares/ck7w4wq9f00wf1iozvu2stbsc',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Adds marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day} ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
