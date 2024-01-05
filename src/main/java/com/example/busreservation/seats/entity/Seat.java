package com.example.busreservation.seats.entity;

import com.example.busreservation.schedule.entity.ScheduleDetails;

import javax.persistence.*;

@Entity

public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String seatType;
    Long seatNumber;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "schedule_id")
    ScheduleDetails scheduleDetails;

    public Seat() {
    }

    public Seat(Long id, String seatType, Long seatNumber, ScheduleDetails scheduleDetails) {
        this.id = id;
        this.seatType = seatType;
        this.seatNumber = seatNumber;
        this.scheduleDetails = scheduleDetails;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSeatType() {
        return seatType;
    }

    public void setSeatType(String seatType) {
        this.seatType = seatType;
    }

    public Long getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(Long seatNumber) {
        this.seatNumber = seatNumber;
    }

    public ScheduleDetails getScheduleDetails() {
        return scheduleDetails;
    }

    public void setScheduleDetails(ScheduleDetails scheduleDetails) {
        this.scheduleDetails = scheduleDetails;
    }
}
