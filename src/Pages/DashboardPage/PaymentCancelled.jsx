import React from 'react'
import { Link } from 'react-router'

export default function PaymentCancelled() {
  return (
    <div>
      <h1>Payment is cancelled.  Please try again</h1>
      <Link className='btn ' to='/dashboard/my-orders'>Try Again</Link>
    </div>
  )
}
