package com.example.busreservation.booking.dao;

import com.example.busreservation.booking.entity.BookingDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<BookingDetails, Long> {
    @Query(nativeQuery = true, value = "select * from booking_details where schedule_id=?1 ")
    public List<BookingDetails> getBookedSeatsByScheduleId(Long id  );
   @Query(nativeQuery = true,value = "select seat_list from booking_details where id = ?1")
    public String getSeatsBooked(Long bookingId);
   @Query(nativeQuery = true,value = "select * from booking_details where user_mail = ?1")
   public List<BookingDetails> getByUserMail(String userMail);
    @Query(nativeQuery = true,value = "select * from booking_details where id =?1")
    public BookingDetails getBookingDetails(Long id);
    @Query(nativeQuery = true,value = "select * from booking_details where from_stop=?1 and to_stop = ?2 and seat_list =?3")
    public BookingDetails getBooking(String origin, String destination, String seatsList);

}
