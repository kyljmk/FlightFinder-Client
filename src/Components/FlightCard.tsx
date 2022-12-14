import React from 'react'
import { FlightCardProps } from '../Types'

function FlightCard({ departureTime, arrivalTime, availableSeats, prices }: FlightCardProps) {

  return (
    <div>
        <h1>{departureTime.toString()}</h1>
    </div>
  )
}

export default FlightCard