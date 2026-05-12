export async function* bookingStream(bookings) {
  for (const booking of bookings) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    yield booking;
  }
}
