package com.tour.vn.service.convert;

import org.springframework.stereotype.Service;

import com.tour.vn.dto.ScheduleCreate;
import com.tour.vn.dto.ScheduleResponse;
import com.tour.vn.dto.ScheduleUpdate;
import com.tour.vn.entity.Schedule;
import com.tour.vn.entity.Tour;

@Service
public class ScheduleConvert {
	
	public Schedule scheduleCreateConvertToSchedule(ScheduleCreate scheduleCreate,Tour tour) {
		Schedule schedule = new Schedule();
		schedule.setDay(scheduleCreate.getDay());
		schedule.setActivity(scheduleCreate.getActivity());
		schedule.setTour(tour);
		return schedule;
	}
	
	public Schedule scheduleUpdateConvertToSchedule(ScheduleUpdate scheduleUpdate,Tour tour) {
		Schedule schedule = new Schedule();
		schedule.setDay(scheduleUpdate.getDay());
		schedule.setActivity(scheduleUpdate.getActivity());
		schedule.setId(scheduleUpdate.getId());
		schedule.setTour(tour);
		
		return schedule;
	}
	
	public ScheduleResponse scheduleConvertToScheduleResponse(Schedule schedule) {
		ScheduleResponse scheduleResponse = new ScheduleResponse();
		scheduleResponse.setId(schedule.getId());
		scheduleResponse.setDay(schedule.getDay());
		scheduleResponse.setActivity(schedule.getActivity());
		scheduleResponse.setTourId(schedule.getTour().getId());
		
		return scheduleResponse;
	}
}
