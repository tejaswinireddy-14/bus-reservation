package com.example.busreservation.seats.dao;

import com.example.busreservation.seats.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatsRepository extends JpaRepository<Seat,Long> {
    @Query(nativeQuery = true,value = "select seat_number from seat where schedule_id = ?1")
    List<Long>getByScheduleId( Long scheduleId);
    @Query(nativeQuery = true,value = "select seat_number from seat where id =?1")
    Long getSeatNumber(Long seatId);
    @Query(nativeQuery = true,value = "select id  from seat where seat_number =?1 and schedule_id =?2")
    Long getSeatId(Long seat_no,Long sch_id);
}
