package com.tour.vn.service;

import com.tour.vn.entity.Role;
import java.util.List;

public interface RoleService {
    Role createRole(Role role);
    Role getRoleById(Long id);
    List<Role> getAllRoles();
    void deleteRole(Long id);
    Role getRoleByEmail(String email);
    
    Role getRoleByUser(Long userId);
    
    Role getRoleByName(String name);
}
