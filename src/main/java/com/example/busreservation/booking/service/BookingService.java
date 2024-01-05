package com.example.busreservation.booking.service;

import com.example.busreservation.booking.entity.BookingDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookingService {
    public BookingDetails createBooking(BookingDetails bookingDetails);
    public List<BookingDetails> getAllBookings();
    public BookingDetails getBookingById(Long id);
    public String deleteBooking(Long id);
    public BookingDetails updateBooking(BookingDetails bookingDetails);

    public List<Long> getSeatsByScheduleId( String origin, String destination, Long id);
    public List<BookingDetails> getAllBookingsByMailId (String userMail);
    public List<Long> getSeatsByBooking(String userMail, String fromStop, String toStop, Long id);



}

