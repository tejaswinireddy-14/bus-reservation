package com.example.busreservation.schedule.controller;

import com.example.busreservation.schedule.entity.ScheduleDetails;
import com.example.busreservation.schedule.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ScheduleController {
    @Autowired
    ScheduleService scheduleService;
    @GetMapping("/get/schedule")
    public List<ScheduleDetails> getAllSchedule(){
        return scheduleService.getAllSchedule();
    }
    @GetMapping("/schedules")
    public  List<ScheduleDetails> scheduleDetails (@Param("origin")String origin,@Param("destination") String destination, @Param("date") String date){
        List<ScheduleDetails> scheduleDetails = scheduleService.getScheduleByRouteId(origin, destination,date);
        if (scheduleDetails == null) {
            throw new RuntimeException("schedule id not found - " );
        }
        return scheduleDetails;
    }
    @GetMapping("/scheduleId")
    public List<Long> scheduleId (@Param("origin")String origin, @Param("destination") String destination, @Param("date") String date){
        List<Long> scheduleDetails = scheduleService.getScheduleIdByRouteId(origin, destination, date);
        if (scheduleDetails == null) {
            throw new RuntimeException("schedule id not found - " );
        }
        return scheduleDetails;
    }
@GetMapping("/busName")
public String getBUsName(@Param("scheduleId")Long scheduleId){
        return scheduleService.getBusName(scheduleId);
}
    @GetMapping("/busNumber")
    public String getBUsNumber(@Param("scheduleId")Long scheduleId){
        return scheduleService.getBusNumber(scheduleId);
    }

    @GetMapping("/schedule/{id}")
    public ScheduleDetails scheduleDetails(@PathVariable("id") Long userId) {
        ScheduleDetails scheduleDetails = scheduleService.getScheduleById(userId);
        if (scheduleDetails == null) {
            throw new RuntimeException("schedule id not found - " + userId);
        }
        return scheduleDetails;
    }

    @PostMapping("/schedule")
    public ScheduleDetails createSchedule(@RequestBody ScheduleDetails scheduleDetails) {
        scheduleService.createSchedule(scheduleDetails);
        return scheduleDetails;
    }

    @PutMapping("/schedule")
    public ScheduleDetails updateSchedule(@RequestBody ScheduleDetails scheduleDetails) {
       scheduleService.updateSchedule(scheduleDetails);
        return scheduleDetails;
    }

    @DeleteMapping("/schedule/{id}")
    public String deleteSchedule(@PathVariable("id") Long Id) {
       ScheduleDetails scheduleDetails = scheduleService.getScheduleById(Id);
        if (scheduleDetails == null) {
            throw new RuntimeException("schedule id not found - " + Id);
        }
        scheduleService.deleteSchedule(Id);
        return "Deleted schedule id - " + Id;
    }

}
