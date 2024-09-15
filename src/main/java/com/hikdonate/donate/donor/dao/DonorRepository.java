package com.hikdonate.donate.donor.dao;

import com.hikdonate.donate.donor.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonorRepository extends JpaRepository<Donor, String> {

}
