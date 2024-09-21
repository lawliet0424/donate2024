package com.hikdonate.donate.domain.donor.dao;

import com.hikdonate.donate.domain.donor.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonorRepository extends JpaRepository<Donor, String> {

}
