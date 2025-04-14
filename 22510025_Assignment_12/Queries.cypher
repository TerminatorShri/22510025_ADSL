LOAD CSV WITH HEADERS FROM 'file:///clean_worldcities.csv' AS row
WITH row
WHERE row.lat IS NOT NULL AND row.lng IS NOT NULL
MERGE (c:City {
  name: row.city_ascii,
  location: point({latitude: toFloat(row.lat), longitude: toFloat(row.lng)})
});

MATCH (c:City)
RETURN c.name AS city, c.location.latitude AS latitude, c.location.longitude AS longitude
LIMIT 10;

WITH point({latitude: 40.7128, longitude: -74.0060}) AS referencePoint  // Set your reference point (e.g., New York)
MATCH (c:City)
WHERE point.distance(c.location, referencePoint) < 100000  // 100,000 meters = 100 km
RETURN c.name AS city, point.distance(c.location, referencePoint) / 1000 AS distance_km
ORDER BY distance_km
LIMIT 10;

MATCH (t:City {name: 'Delhi'})  // Find Tokyo in the database
WITH t, t.location AS tokyoLocation
MATCH (c:City)
WHERE c.name <> 'Delhi'  // Exclude Tokyo itself from the results
WITH c, point.distance(c.location, tokyoLocation) AS dist
ORDER BY dist
LIMIT 5
RETURN c.name AS city, dist / 1000 AS distance_km  // Convert distance to kilometers
ORDER BY distance_km;

MATCH (t:City {name: 'Tokyo'})  // Find Tokyo's coordinates
WITH t, t.location AS tokyoLocation
MATCH (c:City)
WHERE c.name <> 'Tokyo'  // Exclude Tokyo from the results
WITH c, point.distance(c.location, tokyoLocation) AS dist
ORDER BY dist DESC  // Sort by distance in descending order
LIMIT 5
RETURN c.name AS city, dist / 1000 AS distance_km  // Return cities and their distance in kilometers
ORDER BY distance_km DESC;

WITH point({latitude: 35.6762, longitude: 139.6503}) AS tokyo, point({latitude: 51.5074, longitude: -0.1278}) AS london
MATCH (c:City)
WHERE point.distance(c.location, tokyo) < 100000 OR point.distance(c.location, london) < 100000
RETURN c.name AS city, point.distance(c.location, tokyo) / 1000 AS tokyo_distance_km, point.distance(c.location, london) / 1000 AS london_distance_km
ORDER BY tokyo_distance_km, london_distance_km;
