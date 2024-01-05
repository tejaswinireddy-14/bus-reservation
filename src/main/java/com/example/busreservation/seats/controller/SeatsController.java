package com.example.busreservation.seats.controller;

import com.example.busreservation.seats.entity.Seat;
import com.example.busreservation.seats.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class SeatsController {
    @Autowired
    SeatService seatService;

    @GetMapping("/get/seat")
    public List<Seat> getAllSeat(){
        return seatService.getAllSeat();
    }

    @GetMapping("/seatNumber")
    public  List<Long> getSeatsByScheduleId(@Param("scheduleId")Long scheduleId){
        List<Long>seat = seatService.getSeatsByScheduleId(scheduleId);
        if (seat == null) {
            throw new RuntimeException("Seats not found - " );
        }
        return seat;
    }

    @GetMapping("/seat/{id}")
    public Seat seat(@PathVariable("id") Long userId) {
        Seat seat = seatService.getSeatById(userId);
        if (seat == null) {
            throw new RuntimeException("user id not found - " + userId);
        }
        return seat;
    }

    @PostMapping("/seat")
    public Seat createSeat(@RequestBody Seat seat) {
        seatService.createSeat(seat);
        return seat;
    }
    @GetMapping("/seatId")
    public Long getSeatId(@Param("seatNo")Long seatNo,@Param("scheduleId")Long scheduleId){
        return seatService.getSeatId(seatNo, scheduleId);
    }

    @PutMapping("/seat")
    public Seat updateSeat(@RequestBody Seat seat) {
        seatService.updateSeat(seat);
        return seat;
    }

    @DeleteMapping("/seat/{id}")
    public String deleteSeat(@PathVariable("id") Long Id) {
        Seat seat = seatService.getSeatById(Id);
        if (seat == null) {
            throw new RuntimeException("seat id not found - " + Id);
        }
        seatService.deleteSeat(Id);
        return "Deleted seat id - " + Id;
    }

    @GetMapping("/unbooked")
    public List<Long> getAvailableSeats(@Param("origin")String origin, @Param("destination") String destination,@Param("id")Long id){
        return seatService.getSeatsAvailable(origin, destination, id);
    }

}
