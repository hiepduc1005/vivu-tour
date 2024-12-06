package com.tour.vn.service;

import com.tour.vn.entity.Schedule;

public interface ScheduleService {

	Schedule createSchedule(Schedule schedule);
	Schedule updateSchedule(Schedule scheduleUpdate);
	Schedule getScheduleById(Long id);
	void deleteSchedule(Long id);
}
