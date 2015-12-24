package com.onewingsoft.corestudio.business;

import com.onewingsoft.corestudio.dto.ActivityDTO;
import com.onewingsoft.corestudio.model.Activity;
import com.onewingsoft.corestudio.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Ignacio González Bullón - <nacho.gonzalez.bullon@gmail.com>
 * @since 05/12/15.
 */
@Service
public class ActivityBusinessLogic extends BaseBusinessLogic<Activity> {

    @Autowired
    private ActivityRepository activityRepository;

    public Iterable<ActivityDTO> getAllDtos() {
        Iterable<Activity> activities = activityRepository.findAll();
        List<ActivityDTO> dtos = new ArrayList<>();
        for (Activity activity: activities) {
            ActivityDTO dto = new ActivityDTO(activity);
            dtos.add(dto);
        }
        return dtos;
    }

    public ActivityDTO saveActivity(final Activity activity) throws IllegalArgumentException {
        return new ActivityDTO(super.createEntity(activity));
    }

    public ActivityDTO updateActivity(final Activity activity) throws IllegalArgumentException {
        return new ActivityDTO(super.updateEntity(activity));
    }

    public Iterable<Activity> getGroupActivities() {
        return activityRepository.findByGroupActivity(true);
    }

    @Override
    protected Activity processEntity(Activity activity) {
        return activity;
    }

    @Override
    protected void validateEntity(Activity entity) throws IllegalArgumentException {
        if(entity.getName() == null) {
            throw new IllegalArgumentException("El nombre es necesario");
        }
    }

    @Override
    protected PagingAndSortingRepository getRepository() {
        return this.activityRepository;
    }
}
