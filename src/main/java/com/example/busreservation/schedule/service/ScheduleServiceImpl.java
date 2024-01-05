package com.example.busreservation.schedule.service;

import com.example.busreservation.routeStops.service.RouteStopService;
import com.example.busreservation.schedule.dao.ScheduleRepository;
import com.example.busreservation.schedule.entity.ScheduleDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {
    @Autowired
    ScheduleRepository scheduleRepository;
    @Autowired
    RouteStopService routeStopService;

    @Override
    public ScheduleDetails createSchedule(ScheduleDetails scheduleDetails) {
        return scheduleRepository.save(scheduleDetails);
    }

    @Override
    public List<ScheduleDetails> getAllSchedule() {
        return scheduleRepository.findAll();
    }

    @Override
    public ScheduleDetails getScheduleById(Long id) {
        return scheduleRepository.findById(id).orElse(null);
    }

    @Override
    public String deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
        return "Schedule with schedule Id " + id + " deleted!!!";
    }

    @Override
    public ScheduleDetails updateSchedule(ScheduleDetails scheduleDetails) {
        ScheduleDetails u = scheduleRepository.findById(scheduleDetails.getId()).orElse(null);
        if(u != null) {
            u.setBusNumber(scheduleDetails.getBusNumber());
            u.setId(scheduleDetails.getId());
            u.setRoute(scheduleDetails.getRoute());
            u.setSeats(scheduleDetails.getSeats());
            u.setDate(scheduleDetails.getDate());
            u.setBusName(scheduleDetails.getBusName());
            u.setStartingTime(scheduleDetails.getStartingTime());
            u = scheduleRepository.save(u);
        }
        return u;
    }

    @Override
    public List<ScheduleDetails> getScheduleByRouteId(String stopName1, String stopName2, String date) {
        List<Long> result1 = null;
        result1 = routeStopService.getRouteIdByStopNames(stopName1, stopName2);
        List<ScheduleDetails> schedule1 = new ArrayList<>();
        for (Long r : result1) {
            List<ScheduleDetails> scheduleDetails = scheduleRepository.getSchedules(r);
            for (ScheduleDetails s : scheduleDetails) {
                if (s.getDate().equals(date)) {
                    schedule1.add(s);
                }
            }
        }
        return schedule1;
    }

    @Override
    public List<Long> getScheduleIdByRouteId(String stopName1, String stopName2, String date) {
        List<Long> result1 = new ArrayList<>();
        result1 = routeStopService.getRouteIDByRouteStops(stopName1, stopName2);
        List<Long> schedule1 = new ArrayList<>();
        for (Long r : result1) {
            schedule1 = scheduleRepository.getScheduleId(r, date);
        }
        return schedule1;
    }

    @Override
    public String getBusName(Long id) {
        return scheduleRepository.getBusName(id);
    }

    @Override
    public String getBusNumber(Long id) {
        return scheduleRepository.getBusNumber(id);
    }

}
