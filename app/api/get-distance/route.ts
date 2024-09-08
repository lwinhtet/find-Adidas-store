import { NextResponse } from 'next/server';

// Function to get the distance from the Google Distance Matrix API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const storeLat = searchParams.get('storeLat');
  const storeLng = searchParams.get('storeLng');

  if (!latitude || !longitude || !storeLat || !storeLng) {
    return NextResponse.json(
      { error: 'Latitude, longitude, storeLat, and storeLng are required.' },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${latitude},${longitude}&destinations=${storeLat},${storeLng}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      const distanceInfo = data.rows[0].elements[0];
      return NextResponse.json({
        distanceText: distanceInfo.distance.text, // e.g., "5.4 km"
        durationText: distanceInfo.duration.text, // e.g., "15 mins"
      });
    } else {
      return NextResponse.json(
        { error: `Error fetching distance: ${data.status}` },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
