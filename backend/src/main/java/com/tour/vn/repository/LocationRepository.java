package com.tour.vn.repository;

import com.tour.vn.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    // Bạn có thể thêm các phương thức tuỳ chỉnh nếu cần.
}
