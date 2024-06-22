package coding.dojo.Pfe.service;

import coding.dojo.Pfe.entity.Location;
import coding.dojo.Pfe.entity.Vehicule;
import coding.dojo.Pfe.repository.LocationRepository;
import coding.dojo.Pfe.repository.VehiculeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private VehiculeRepository vehiculeRepository;

    public boolean isCarAvailable(Long carId, LocalDate startDate, LocalDate endDate) {
        Vehicule car = vehiculeRepository.findById(carId).orElseThrow(() -> new RuntimeException("Car not found"));
        Optional<Location> reservations = locationRepository.findByVehiculeAndDateRange(car, startDate, endDate);
        return ! reservations.isPresent();
    }

    public Location createReservation(String userId, Long carId, LocalDate startDate, LocalDate endDate) {
        if (!isCarAvailable(carId, startDate, endDate)) {
            throw new RuntimeException("Car is not available for the selected dates");
        }
        Location reservation = new Location();
        reservation.setStartDate(startDate);
        reservation.setEndDate(endDate);

        return locationRepository.save(reservation);
    }

    public ResponseEntity<Location> getLocationById(Long id) {
        Optional<Location> location = locationRepository.findById(id);
        if (location.isPresent()) {
            return new ResponseEntity<>(location.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationRepository.findAll();
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }

    public ResponseEntity<Location> createLocation(Location location) {
        Location savedLocation = locationRepository.save(location);
        return new ResponseEntity<>(savedLocation, HttpStatus.CREATED);
    }

    public ResponseEntity<Location> updateLocation(Long id, Location locationDetails) {
        Optional<Location> location = locationRepository.findById(id);
        if (location.isPresent()) {
            Location updatedLocation = location.get();
            updatedLocation.setStartDate(locationDetails.getStartDate());
            updatedLocation.setEndDate(locationDetails.getEndDate());
            updatedLocation.setPrixTotal(locationDetails.getPrixTotal());
            updatedLocation.setEtat(locationDetails.getEtat());
            locationRepository.save(updatedLocation);
            return new ResponseEntity<>(updatedLocation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Void> deleteLocation(Long id) {
        Optional<Location> location = locationRepository.findById(id);
        if (location.isPresent()) {
            locationRepository.delete(location.get());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
