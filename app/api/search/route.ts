import { NextResponse } from 'next/server'

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY

interface SearchParams {
  city: string
  businessType: string
  pageToken?: string
}

async function searchPlaces({ city, businessType, pageToken }: SearchParams) {
  if (pageToken) {
    // If we have a page token, we don't need to search again
    const searchUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
    searchUrl.search = new URLSearchParams({
      pagetoken: pageToken,
      key: GOOGLE_PLACES_API_KEY!,
    }).toString()

    const searchRes = await fetch(searchUrl.toString())
    const searchData = await searchRes.json()

    if (searchData.status !== 'OK' && searchData.status !== 'ZERO_RESULTS') {
      console.error('Places API error:', searchData)
      throw new Error(`Places API error: ${searchData.status}`)
    }

    const places = await getPlaceDetails(searchData.results || [])
    return {
      places,
      nextPageToken: searchData.next_page_token,
    }
  }

  // Search for businesses using the Places API Text Search
  const searchUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
  const searchParams = new URLSearchParams({
    query: `${businessType} in ${city}`,
    key: GOOGLE_PLACES_API_KEY!,
  })

  searchUrl.search = searchParams.toString()
  const searchRes = await fetch(searchUrl.toString())
  const searchData = await searchRes.json()

  if (searchData.status !== 'OK' && searchData.status !== 'ZERO_RESULTS') {
    console.error('Places API error:', searchData)
    throw new Error(`Places API error: ${searchData.status}`)
  }

  if (!searchData.results?.length) {
    throw new Error(`No ${businessType} found in ${city}`)
  }

  const places = await getPlaceDetails(searchData.results)
  return {
    places,
    nextPageToken: searchData.next_page_token,
  }
}

async function getPlaceDetails(places: any[]) {
  return Promise.all(
    places.map(async (place: any) => {
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
        place.place_id
      }&fields=name,formatted_address,formatted_phone_number,website&key=${GOOGLE_PLACES_API_KEY}`

      const detailsRes = await fetch(detailsUrl)
      const detailsData = await detailsRes.json()

      if (detailsData.status !== 'OK') {
        console.error('Place details error:', detailsData)
        return {
          name: place.name,
          address: place.formatted_address,
          phone: 'N/A',
          website: '',
        }
      }

      return {
        name: detailsData.result.name || place.name,
        address: detailsData.result.formatted_address || place.formatted_address,
        phone: detailsData.result.formatted_phone_number || 'N/A',
        website: detailsData.result.website || '',
      }
    })
  )
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { city, businessType, pageToken } = body

    if (!city || !businessType) {
      return NextResponse.json(
        { error: 'City and business type are required' },
        { status: 400 }
      )
    }

    const results = await searchPlaces({ city, businessType, pageToken })
    return NextResponse.json(results)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    )
  }
}
