package com.example.business.ServicesImp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import com.example.Exception.DuplicateRandonneurException;
import com.example.business.Services.ImageStorage;
import com.example.business.Services.RandonneurService;
import com.example.dao.Enums.RoleEnum;
import com.example.dao.Repository.RandonneurRepository;
import com.example.dao.entities.Randonneur;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service

public class RandonneurServiceImpl implements RandonneurService {
    
    private final RandonneurRepository randonneurRepository;
    @Autowired
	ImageStorage imageStorage;
    @Autowired
	 PasswordEncoder passwordEncoder;
    public RandonneurServiceImpl(RandonneurRepository randonneurRepository) {
        this.randonneurRepository = randonneurRepository;
        
    }
    //operation getAllRandonneurs
    @Override
    public List<Randonneur> getAllRandonneurs() {
        return this.randonneurRepository.findAll();
    }

    @Override
    public Randonneur getRandonneurById(Long idRandonneur) {
        if (idRandonneur == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        //Return optional a==> add orEsethrow
        return this.randonneurRepository.findById(idRandonneur)
                .orElseThrow(() -> new EntityNotFoundException("Randonneur with id: " + idRandonneur + " not found"));
    }
    //operation addRandonneur
     @Override
    public Randonneur addRandonneur(Randonneur randonneur) throws DuplicateRandonneurException {
        if (randonneur == null) {
            throw new IllegalArgumentException("Randonneur cannot be null");
        }
        try {
            // Set the Randonneur role to the randonneur
            randonneur.setRole(RoleEnum.Randonneur);
            
            return randonneurRepository.save(randonneur);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateRandonneurException(
                    "A randonneur with the same email or other unique field already exists.");
        }
    }
    //operation updateRandonneur
    @Override
		public Randonneur updateRandonneur(Randonneur randonneur, Long idRandonneur) {
			
				Randonneur r=randonneurRepository.findById(idRandonneur).get();
				r.setFirstName(randonneur.getFirstName());
				r.setLastName(randonneur.getLastName());
				r.setAddress(randonneur.getAddress());
                r.setTel(randonneur.getTel());
                r.setAge(randonneur.getAge());
			
				r.setEmail(randonneur.getEmail());
				
				//us.setImage(user.getImage());
				randonneurRepository.save(r);
				return r;
			}
            //operation uploadImageRandonneur
        @Override

		public Randonneur uploadImageRandonneur(Long idRandonneur, MultipartFile image) {
			ResponseEntity<Randonneur> userResponse = this.findById(idRandonneur);
	        String imageName=imageStorage.store(image);
	        String fileImageDownloadUrl= ServletUriComponentsBuilder.fromCurrentContextPath().path("auth/downloadAnnonceImage/").path(imageName).toUriString();
	        Randonneur randonneur = userResponse.getBody();
	          if (randonneur!=null)
	        	    randonneur.setImage(fileImageDownloadUrl);
	      return randonneurRepository.save(randonneur);
		}
		public ResponseEntity<Randonneur> findById(Long idRandonneur) {
	        if (idRandonneur == null) {
	          //  log.error("student ID is null");
	            return null;
	        }
	        return ResponseEntity.ok(randonneurRepository.findById(idRandonneur).get());
		}

	    public String getRandonneurImageURL(Long idUser) {
	        Randonneur randonneur = randonneurRepository.findById(idUser).orElse(null);
	        if (randonneur != null) {
	            return randonneur.getImage();
	        }
	        return null;
	    }
	   /*  @Override
		public List<Randonneur> findByAdresse(String address) {
			// TODO Auto-generated method stub
			return  (List<Randonneur>) randonneurRepository.findByAdresse(address);
		}*/
		
   

    //operation delete randonneur
    @Override
    public void deleteRandonneur(Long idRandonneur) {
        
        randonneurRepository.deleteById(idRandonneur);
    }
}