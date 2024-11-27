package com.tour.vn.service.impl;

import com.tour.vn.entity.Role;
import com.tour.vn.entity.User;
import com.tour.vn.repository.RoleRepository;
import com.tour.vn.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role createRole(Role role) {
        // Save the role to the database
        return roleRepository.save(role);
    }

    @Override
    public Role getRoleById(Long id) {
        // Find the role by its ID
        Optional<Role> role = roleRepository.findById(id);
        return role.orElseThrow(() -> new RuntimeException("Role not found with id " + id));
    }

    @Override
    public List<Role> getAllRoles() {
        // Return all roles
        return roleRepository.findAll();
    }

    @Override
    public void deleteRole(Long id) {
        // Delete the role by its ID
        if (roleRepository.existsById(id)) {
            roleRepository.deleteById(id);
        } else {
            throw new RuntimeException("Role not found with id " + id);
        }
    }
    
    @Override
    public Role getRoleByEmail(String email) {
        Optional<Role> role = roleRepository.findByUserEmail(email);
        return role.orElse(null);  // Trả về Role nếu tìm thấy, nếu không trả về null
    }

    @Override
    public Role getRoleByUser(Long userId) {
        User user = new User(); 
        user.setId(userId);
        
        Optional<Role> role = roleRepository.findByUsers(user);
        return role.orElse(null);  // Trả về Role nếu tìm thấy, nếu không trả về null
    }

	@Override
	public Role getRoleByName(String name) {
		// TODO Auto-generated method stub
		return roleRepository.findByName(name);
	}
}
