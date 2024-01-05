package com.example.busreservation.booking.controller;

import com.example.busreservation.booking.dao.BookingRepository;
import com.example.busreservation.booking.entity.BookingDetails;
import com.example.busreservation.booking.service.BookingService;
import com.example.busreservation.email.service.EmailSenderServiceImpl;
import com.example.busreservation.routeStops.service.RouteStopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
public class BookingController {
    @Autowired
    EmailSenderServiceImpl emailSenderService;
    @Autowired
    BookingService bookingService;
    @Autowired
    BookingRepository bookingRepository;
    @Autowired
    RouteStopService routeStopService;

    @GetMapping("/get/bookings")
    public List<BookingDetails> getAllUser() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/booking/{id}")
    public BookingDetails bookingDetails(@PathVariable("id") Long bookingId) {

        BookingDetails bookingDetails = bookingService.getBookingById(bookingId);

        if (bookingDetails == null) {
            throw new RuntimeException("user id not found - " + bookingId);
        }

        return bookingDetails;
    }

    @GetMapping("/seatsBooked")
    public List<Long> getSeatsByScheduleId(@Param("origin") String origin, @Param("destination") String destination, @Param("id") Long id) {
        return bookingService.getSeatsByScheduleId(origin, destination, id);

    }

    @GetMapping("/allBookings")
    public List<BookingDetails> getAllBookings(@Param("userMail") String userMail) {
        return bookingService.getAllBookingsByMailId(userMail);

    }

    @GetMapping("/userSeat")
    public List<Long> getSeats(@Param("userMail") String userMail, @Param("fromStop") String fromStop, @Param("toStop") String toStop, @Param("id") Long id) {
        return bookingService.getSeatsByBooking(userMail, fromStop, toStop, id);
    }

    @GetMapping("/seatsList")
    public String getSeatsList(@Param("bookingId") Long bookingId) {
        return bookingRepository.getSeatsBooked(bookingId);
    }


    @PostMapping("/booking")
    public BookingDetails createBooking(@RequestBody BookingDetails bookingDetails) {
        return bookingService.createBooking(bookingDetails);

    }

    @PutMapping("/booking")
    public BookingDetails updateBooking(@RequestBody BookingDetails bookingDetails) {

        bookingService.updateBooking(bookingDetails);

        return bookingDetails;

    }

    @GetMapping("/bookingUpdate")

    public BookingDetails updateBookingDetails(@Param("origin") String origin, @Param("destination") String destination, @Param("seatsBooked") String seatsBooked) {
        BookingDetails b = bookingRepository.getBooking(origin, destination, seatsBooked);
        LocalTime now = LocalTime.now();
        Time time = Time.valueOf(now);
        long diff = Math.abs((time.getTime() - b.getSelectedTime().getTime()));
        long diffMinutes = diff / (60 * 1000) % 60;
        BookingDetails bookingDetails1 = null;
        if (diffMinutes < 5) {
            b.setBookingStatus("booked");
            bookingDetails1 = bookingService.updateBooking(b);
        } else {

            throw new RuntimeException();

        }

        return bookingDetails1;

    }

    @GetMapping("/bookingId/{id}")
    public List<BookingDetails> updateStatus(@PathVariable("id") Long id) {
        BookingDetails b = bookingRepository.getBookingDetails(id);
        List<BookingDetails> booking = new ArrayList<>();
        if (b.getBookingStatus().equals("booked")) {
            b.setBookingStatus("confirmed");
            bookingService.updateBooking(b);
            booking.add(b);
        } else {
            booking.add(b);
        }
        return booking;
    }


    @DeleteMapping("/booking/{id}")
    public List<BookingDetails> deleteBooking(@PathVariable("id") Long id) throws ParseException {


        BookingDetails b = bookingRepository.getBookingDetails(id);
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
        String strDate = formatter.format(date);

        b.setBookingStatus("cancelled");
        bookingService.updateBooking(b);
        List<BookingDetails> booking = new ArrayList<>();
        booking.add(b);
        Time time = routeStopService.getStopTime(b.getFromStop());

        String subject = "Your Ticket got cancelled";
        String message = String.format("Date:%s <br/> Origin:%s \n Destination:%s \n SeatsBooked:%s \n ArrivalTime:%s \n BusName:%s \n BusNumber:%s", b.getDate(), b.getFromStop(), b.getToStop(), b.getSeatList(), time, b.getBusName(), b.getBusNumber());


        String to = b.getUserMail();
        boolean b1 = emailSenderService.sendEmail(subject, message, to);
        return booking;

    }

}
