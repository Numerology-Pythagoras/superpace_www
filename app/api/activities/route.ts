import { NextResponse } from 'next/server';


export async function GET(req: Request) {
const { searchParams } = new URL(req.url);


const name = searchParams.get('name');
const from = searchParams.get('from');
const to = searchParams.get('to');


if (!name || !from || !to) {
return NextResponse.json(
{ error: 'Missing query params' },
{ status: 400 }
);
}


const upstreamUrl =
'https://strava-report-kappa.vercel.app/api/club/activities' +
`?name=${encodeURIComponent(name)}&from=${from}&to=${to}`;


const res = await fetch(upstreamUrl, {
cache: 'no-store', // luôn lấy dữ liệu mới
});


if (!res.ok) {
return NextResponse.json(
{ error: 'Upstream error' },
{ status: res.status }
);
}


const data = await res.json();
return NextResponse.json(data);
}