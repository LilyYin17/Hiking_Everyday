package JustForYou;

import java.util.*;

import db.MySQLConnection;
import entity.TrailItem;

public class JustForYou {
	public Set<TrailItem> recommend(Set<Integer> nearbyTrails, Set<Integer> filterTrailList){
		Set<TrailItem> recommendList = new HashSet<>();
		Set<Integer> list = new HashSet<>();
		for(Integer id : filterTrailList) {
			if(nearbyTrails.contains(id)) {
				list.add(id);
			}
		}
		
		recommendList = findTrailById(list);
		
		return recommendList;
	}
	
	private Set<TrailItem> findTrailById(Set<Integer> filterTrailList){
		Set<TrailItem> res = new HashSet<>();
		
		MySQLConnection conn = new MySQLConnection();
		for(Integer id : filterTrailList) {
			String trailId = String.valueOf(id);
			TrailItem trail = conn.getTrailbyId(trailId);
			res.add(trail);
		}
		
		return res;
	}
}
