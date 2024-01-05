package com.example.busreservation.booking.entity;

import com.example.busreservation.schedule.entity.ScheduleDetails;

import javax.persistence.*;
import java.sql.Time;

@Entity

public class BookingDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String date;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "schedule_id")
    ScheduleDetails scheduleDetails;
    Long fare;
    String bookingStatus;
    String seatList;
    Time boardingTime;
    String busName;
    String busNumber;

    String userMail;
    String fromStop;
    String toStop;
    Time selectedTime;


    public BookingDetails() {
    }

    public BookingDetails(Long id, String date, ScheduleDetails scheduleDetails, Long fare, String bookingStatus, String seatList, Time boardingTime, String busName, String busNumber, String userMail, String fromStop, String toStop, Time selectedTime) {
        this.id = id;
        this.date = date;
        this.scheduleDetails = scheduleDetails;
        this.fare = fare;
        this.bookingStatus = bookingStatus;
        this.seatList = seatList;
        this.boardingTime = boardingTime;
        this.busName = busName;
        this.busNumber = busNumber;
        this.userMail = userMail;
        this.fromStop = fromStop;
        this.toStop = toStop;
        this.selectedTime = selectedTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public ScheduleDetails getScheduleDetails() {
        return scheduleDetails;
    }

    public void setScheduleDetails(ScheduleDetails scheduleDetails) {
        this.scheduleDetails = scheduleDetails;
    }

    public Long getFare() {
        return fare;
    }

    public void setFare(Long fare) {
        this.fare = fare;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public String getSeatList() {
        return seatList;
    }

    public void setSeatList(String seatList) {
        this.seatList = seatList;
    }

    public Time getBoardingTime() {
        return boardingTime;
    }

    public void setBoardingTime(Time boardingTime) {
        this.boardingTime = boardingTime;
    }

    public String getBusName() {
        return busName;
    }

    public void setBusName(String busName) {
        this.busName = busName;
    }

    public String getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public String getUserMail() {
        return userMail;
    }

    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }

    public String getFromStop() {
        return fromStop;
    }

    public void setFromStop(String fromStop) {
        this.fromStop = fromStop;
    }

    public String getToStop() {
        return toStop;
    }

    public void setToStop(String toStop) {
        this.toStop = toStop;
    }

    public Time getSelectedTime() {
        return selectedTime;
    }

    public void setSelectedTime(Time selectedTime) {
        this.selectedTime = selectedTime;
    }
}
