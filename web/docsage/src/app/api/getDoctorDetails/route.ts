import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { regNo } = await request.json();

    // Check if registration number is provided
    if (!regNo) {
      return NextResponse.json({ error: 'Registration number is required' }, { status: 400 });
    }

    // Make the request to the PMC API to fetch doctor details
    const response = await axios.post(
      'https://pmc.gov.pk/api/DRC/GetData', // Replace with the correct PMC API URL
      {
        RegistrationNo: regNo,
        Name: '',
        FatherName: '',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      }
    );

    // If the PMC API response is successful, return the data
    if (response.data.status) {
      return NextResponse.json(response.data.data[0], { status: 200 });
    } else {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    return NextResponse.json({ error: 'Failed to fetch doctor details' }, { status: 500 });
  }
}