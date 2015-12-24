package com.onewingsoft.corestudio.model;

import com.onewingsoft.corestudio.utils.Day;
import com.onewingsoft.corestudio.utils.Level;

import javax.persistence.*;
import java.util.List;

/**
 * @author Ignacio González Bullón - <nacho.gonzalez.bullon@gmail.com>
 * @since 08/12/15.
 */
@Entity
@Table(name = "core_group")
public class Group extends BaseEntity {

    @Column
    @ElementCollection(targetClass = Day.class)
    @Enumerated(EnumType.STRING)
    private List<Day> days;

    @Column
    @Enumerated(EnumType.STRING)
    private Level level;

    @Column
    private Integer hour;

    @ManyToOne
    @JoinColumn(name = "activity_id")
    private Activity activity;

    public List<Day> getDays() {
        return days;
    }

    public void setDays(List<Day> days) {
        this.days = days;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Integer getHour() {
        return hour;
    }

    public void setHour(Integer hour) {
        this.hour = hour;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }
}
