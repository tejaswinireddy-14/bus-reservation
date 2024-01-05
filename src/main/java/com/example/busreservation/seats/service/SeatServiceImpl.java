package com.example.busreservation.seats.service;

import com.example.busreservation.booking.service.BookingService;
import com.example.busreservation.seats.dao.SeatsRepository;
import com.example.busreservation.seats.entity.Seat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SeatServiceImpl implements SeatService{
    @Autowired
    SeatsRepository seatsRepository;
    @Autowired
    BookingService bookingService;

    @Override
    public Seat createSeat(Seat seat) {
        return seatsRepository.save(seat);
    }

    @Override
    public List<Seat> getAllSeat() {
        return seatsRepository.findAll();
    }

    @Override
    public Seat getSeatById(Long id) {
        return seatsRepository.findById(id).orElse(null);
    }

    @Override
    public String deleteSeat(Long id) {
        seatsRepository.deleteById(id);
        return "Seat with seatId " + id + " deleted!!!";
    }

    @Override
    public Seat updateSeat(Seat seat) {
        Seat u= seatsRepository.findById(seat.getId()).orElse(null);
        if( u != null) {
            u.setId(seat.getId());
            u.setSeatType(seat.getSeatType());
            u.setScheduleDetails(seat.getScheduleDetails());
            u.setSeatNumber(seat.getSeatNumber());
            u = seatsRepository.save(u);
        }
        return u;
    }

    @Override
    public List<Long> getSeatsByScheduleId(Long scheduleId) {
        return seatsRepository.getByScheduleId(scheduleId);
    }
    @Override
    public List<Long> getSeatsAvailable(String origin, String destination, Long id) {
        List<Long> all = seatsRepository.getByScheduleId(id);
        List<Long> booked = bookingService.getSeatsByScheduleId(origin, destination, id);
        List<Long> union = new ArrayList<Long>(all);
        union.addAll(booked);
        List<Long> intersection = new ArrayList<Long>(all);
        intersection.retainAll(booked);
        union.removeAll(intersection);
        return union;
    }

    @Override
    public Long getSeatId(Long seatNo, Long schId) {
          return seatsRepository.getSeatId(seatNo,schId);
    }
}
