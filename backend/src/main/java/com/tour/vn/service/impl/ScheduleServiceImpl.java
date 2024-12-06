package com.tour.vn.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tour.vn.entity.Schedule;
import com.tour.vn.repository.ScheduleRepository;
import com.tour.vn.service.ScheduleService;

@Service
@Transactional
public class ScheduleServiceImpl implements ScheduleService{
	@Autowired
    private ScheduleRepository scheduleRepository;
	
	@Override
    public Schedule createSchedule(Schedule schedule) {
        // Lưu lịch trình vào database
        return scheduleRepository.save(schedule);
    }

    @Override
    public Schedule updateSchedule(Schedule scheduleUpdate) {
        // Kiểm tra xem Schedule có tồn tại không
        Schedule existingSchedule = scheduleRepository.findById(scheduleUpdate.getId())
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + scheduleUpdate.getId()));

        // Cập nhật thông tin
        existingSchedule.setDay(scheduleUpdate.getDay());
        existingSchedule.setActivity(scheduleUpdate.getActivity());

        return scheduleRepository.save(existingSchedule);
    }

    @Override
    public Schedule getScheduleById(Long id) {
        // Lấy Schedule theo id, nếu không có thì ném ngoại lệ
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));
    }

    @Override
    public void deleteSchedule(Long id) {
        // Kiểm tra xem Schedule có tồn tại không
        Schedule existingSchedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));

        // Xóa lịch trình
        scheduleRepository.delete(existingSchedule);
    }
}
