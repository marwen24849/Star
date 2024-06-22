package coding.dojo.Pfe.repository;

import coding.dojo.Pfe.entity.Location;
import coding.dojo.Pfe.entity.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    Optional<Location> findByVehiculeAndEndDateAfterAndStartDateBefore(Vehicule vehicule, LocalDate startDate, LocalDate endDate);

    @Query("SELECT l FROM Location l WHERE l.vehicule = :vehicule AND l.endDate = :startDate AND l.startDate = :endDate")
    Optional<Location> findByVehiculeAndDateRange(
            @Param("vehicule") Vehicule vehicule,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );


}
