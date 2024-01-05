package com.example.busreservation.schedule.dao;

import com.example.busreservation.schedule.entity.ScheduleDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleDetails, Long> {
    @Query(nativeQuery = true, value = "select * from schedule_details where schedule_details.route_id = ?1")
    List<ScheduleDetails> getSchedules(Long s);

    @Query(nativeQuery = true, value = "select id from schedule_details where route_id=?1 and date =?2")
    List<Long> getScheduleId(Long r, String date);

    @Query(nativeQuery = true, value = "select route_id from schedule_details where id=?1")
    Long getRouteId(Long s);

    @Query(nativeQuery = true, value = "select bus_name from schedule_details where id =?1")
    String getBusName(Long sId);

    @Query(nativeQuery = true, value = "select bus_number from schedule_details where id =?1")
    String getBusNumber(Long sId);

    @Query(nativeQuery = true, value = "select * from schedule_details where id =?1")
    ScheduleDetails getScheduleDetails(Long id);


}
