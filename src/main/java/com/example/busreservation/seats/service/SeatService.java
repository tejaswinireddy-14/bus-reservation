package com.example.busreservation.seats.service;

import com.example.busreservation.seats.entity.Seat;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SeatService {
    public Seat createSeat(Seat seat);

    public List<Seat> getAllSeat();
    public Seat getSeatById(Long id);
    public String deleteSeat(Long id);
    public Seat updateSeat(Seat seat);
    public  List<Long> getSeatsByScheduleId(Long scheduleId);
    public List<Long> getSeatsAvailable(String origin, String destination , Long id);
    public Long getSeatId(Long seatNo, Long schId);

}
