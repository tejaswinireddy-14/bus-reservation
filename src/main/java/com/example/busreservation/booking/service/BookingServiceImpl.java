package com.example.busreservation.booking.service;

import com.example.busreservation.booking.dao.BookingRepository;
import com.example.busreservation.booking.entity.BookingDetails;
import com.example.busreservation.email.service.EmailSenderServiceImpl;
import com.example.busreservation.routeStops.dao.RouteStopsRepository;
import com.example.busreservation.routeStops.service.RouteStopService;
import com.example.busreservation.schedule.dao.ScheduleRepository;
import com.example.busreservation.schedule.service.ScheduleService;
import com.example.busreservation.seats.dao.SeatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    BookingRepository bookingRepository;
    @Autowired
    RouteStopService routeStopService;
    @Autowired
    RouteStopsRepository routeStopsRepository;
    @Autowired
    ScheduleService scheduleService;
    @Autowired
    ScheduleRepository scheduleRepository;
    @Autowired
    SeatsRepository seatsRepository;
    @Autowired
    EmailSenderServiceImpl emailSenderService;


    @Override
    public BookingDetails createBooking(BookingDetails bookingDetails) {

        BookingDetails b = bookingRepository.save(bookingDetails);
        Long fare = routeStopService.getFareByStopName(b.getFromStop(),b.getToStop());
        Time time = routeStopService.getStopTime(b.getFromStop());
        String subject = "Ticket details from Being Book";
        String message = String.format("Date:%s \n Origin:%s \n Destination:%s \n BookedSeats:%s \n Fare:%s \n ArrivalTime:%s \n BusName:%s \n BusNumber:%s", b.getDate(), b.getFromStop(), b.getToStop(), b.getSeatList(), fare, time, b.getBusName(), b.getBusName());


        String to = b.getUserMail();
        boolean b1 = emailSenderService.sendEmail(subject, message, to);
        return b;
    }

    @Override
    public List<BookingDetails> getAllBookings() {
        List<BookingDetails> results = bookingRepository.findAll();
        return results;
    }


    @Override
    public BookingDetails getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @Override
    public String deleteBooking(Long id) {
        bookingRepository.deleteById(id);
        BookingDetails b = bookingRepository.getBookingDetails(id);
        String subject = "Your Ticket got cancelled";
        String message = String.format("Date:%s \n Origin:%s \n Destination:%s \n SeatsBooked:%s \n BusName:%s \n BusNumber:%s", b.getDate(), b.getFromStop(), b.getToStop(), b.getSeatList(),b.getBusName(),b.getBusNumber());

        String to = b.getUserMail();
        boolean b1 = emailSenderService.sendEmail(subject, message, to);
        return "Booking with Booking Id " + id + " deleted!!!";

    }

    @Override
    public BookingDetails updateBooking(BookingDetails bookingDetails) {
        BookingDetails u = bookingRepository.findById(bookingDetails.getId()).orElse(null);
        if(u != null) {
            u.setSeatList(bookingDetails.getSeatList());
            u.setDate(bookingDetails.getDate());
            u.setId(bookingDetails.getId());
            u.setFromStop(bookingDetails.getFromStop());
            u.setToStop(bookingDetails.getToStop());
            u.setScheduleDetails(bookingDetails.getScheduleDetails());
            u.setUserMail(bookingDetails.getUserMail());
            u.setBookingStatus(bookingDetails.getBookingStatus());
            u.setFare(bookingDetails.getFare());
            u.setBoardingTime(bookingDetails.getBoardingTime());
            u.setBusName(bookingDetails.getBusName());
            u.setBusNumber(bookingDetails.getBusNumber());
            u = bookingRepository.save(u);
        }
        return u;
    }

    @Override
    public List<Long> getSeatsByScheduleId(String origin, String destination, Long id) {
        List<Long> result2 = new ArrayList<>();
        List<Long> empty = new ArrayList<>();
        Long l = scheduleRepository.getRouteId(id);
        List<BookingDetails> bookingDetails = new ArrayList<>();
        Long p = routeStopsRepository.getStopSeqByRouteId(origin, l);
        Long q = routeStopsRepository.getStopSeqByRouteId(destination, l);
        LocalTime now = LocalTime.now();
        Time time = Time.valueOf(now);
        bookingDetails = bookingRepository.getBookedSeatsByScheduleId(id);
        for (BookingDetails b : bookingDetails) {
            long diff = Math.abs((time.getTime() - b.getSelectedTime().getTime()));
            System.out.println(b.getSelectedTime());
            long diffMinutes = diff / (60 * 1000) % 60;
            if (b.getBookingStatus().equals("confirmed") || b.getBookingStatus().equals("booked")|| (b.getBookingStatus().equals("blocked")&&(diffMinutes<5)) ){
                Long b1 = routeStopService.getStopSeqByStopName(b.getFromStop());
                Long b2 = routeStopService.getStopSeqByStopName(b.getToStop());
                List<Long> l1 = new ArrayList<>();
                for (Long i = p; i < q + 1; i++) {
                    l1.add(i);
                }
                List<Long> l2 = new ArrayList<>();
                for (Long j = b1; j < b2 + 1; j++) {
                    l2.add(j);
                }
                List<Long> l3 = new ArrayList<>();
                for (Long a1 : l1) {
                    for (Long a2 : l2) {
                        if (a1.equals(a2)) {
                            l3.add(a1);
                        }
                    }
                }
                if (l3.size() > 1) {
                    String s = bookingRepository.getSeatsBooked(b.getId());
                    String[] string = s.split(",");
                    int[] arr = new int[string.length];
                    for (int i = 0; i < string.length; i++) {
                        arr[i] = Integer.parseInt(string[i]);
                        Long longNum = (long) arr[i];
                        result2.add(longNum);
                    }
                }
            }
        }
        for (Long r : result2) {
            empty.add(seatsRepository.getSeatNumber(r));

        }
        return empty;
    }

    @Override
    public List<BookingDetails> getAllBookingsByMailId(String userMail) {
        return bookingRepository.getByUserMail(userMail);
    }

    @Override
    public List<Long> getSeatsByBooking(String userMail, String fromStop, String toStop, Long id) {
        return null;

    }


}
