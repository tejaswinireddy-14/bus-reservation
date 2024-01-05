package com.example.busreservation.schedule.service;

import com.example.busreservation.schedule.entity.ScheduleDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ScheduleService {
    public ScheduleDetails createSchedule(ScheduleDetails scheduleDetails);
    public List<ScheduleDetails> getAllSchedule();
    public ScheduleDetails getScheduleById(Long id);
    public String deleteSchedule(Long id);
    public ScheduleDetails updateSchedule(ScheduleDetails scheduleDetails);
    public  List<ScheduleDetails> getScheduleByRouteId(String stopName1, String stopName2, String date);
    public  List<Long> getScheduleIdByRouteId(String stopName1, String stopName2, String date);
    public String getBusName(Long id);
    public String getBusNumber(Long id);

}
