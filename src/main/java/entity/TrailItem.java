package entity;
//This class is to purity data we got from HikingProject API

import org.json.JSONException;
import org.json.JSONObject;

public class TrailItem {
	private int trailId;
	private String trailName;
	private double trailLength;
	private int trailHeight;
	private double latitude;
	private double longitude;
	private String locationName;
	private String imageUrl;
	private String difficulty;
	
	private TrailItem(TrailItemBuilder builder) {
		this.trailId = builder.trailId;
		this.trailName = builder.trailName;
		this.trailLength = builder.trailLength;
		this.trailHeight = builder.trailHeight;
		this.latitude = builder.latitude;
		this.longitude = builder.longitude;
		this.locationName = builder.locationName;
		this.imageUrl = builder.imageUrl;
		this.difficulty = builder.difficulty;
	}
	
	public int getTrialId() {
		return trailId;
	}
	
	public String getTrialName() {
		return trailName;
	}
	
	public double getTrailLength() {
		return trailLength;
	}
	
	public int getTrailHeight() {
		return trailHeight;
	}
	
	public double getLatitude() {
		return latitude;
	}
	
	public double getLongitude() {
		return longitude;
	}
	
	public String getLocationName() {
		return locationName;
	}
	
	public String getImageUrl() {
		return imageUrl;
	}
	
	public String getDifficulty() {
		return difficulty;
	}
	
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		try {
			obj.put("id", trailId);
			obj.put("name", trailName);
			obj.put("length", trailLength);
			obj.put("high", trailHeight);
			obj.put("latitude", latitude);
			obj.put("longitude", longitude);
			obj.put("location", locationName);
			obj.put("imgSmallMed", imageUrl);
			obj.put("difficulty", difficulty);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		return obj;
	}
	
	//help to make clients construct the instance more flexible
	public static class TrailItemBuilder{
		private int trailId;
		private String trailName;
		private double trailLength;
		private int trailHeight;
		private double latitude;
		private double longitude;
		private String locationName;
		private String imageUrl;
		private String difficulty;
		
		public void setTrailId(int trialId) {
			this.trailId = trialId;
		}
		public void setTrailName(String trialName) {
			this.trailName = trialName;
		}
		public void setTrailLength(double trailLength) {
			this.trailLength = trailLength;
		}
		public void setTrailHeight(int trailHeight) {
			this.trailHeight = trailHeight;
		}
		public void setLatitude(double latitude) {
			this.latitude = latitude;
		}
		public void setLongitude(double longitude) {
			this.longitude = longitude;
		}
		public void setLocationName(String locationName) {
			this.locationName = locationName;
		}
		public void setImageUrl(String imageUrl) {
			this.imageUrl = imageUrl;
		}
		public void setDifficulty(String difficulty) {
			this.difficulty = difficulty;
		}
		
		//build function to create a TrailItemBuilder object from trail item object
		public TrailItem build() {
			return new TrailItem(this);
		}
	}
}

//"summary": "The classic long mountain route in Boulder.",
//"conditionDetails": "Dry",
//"imgSmallMed": "https://cdn2.apstatic.com/photos/hike/7039883_smallMed_1555092747.jpg",
//"latitude": 39.9388,
//"length": 17.3,
//"stars": 4.7,
//"type": "Recommended Route",
//"starVotes": 92,
//"url": "https://www.hikingproject.com/trail/7011192/boulder-skyline-traverse",
//"imgSmall": "https://cdn2.apstatic.com/photos/hike/7039883_small_1555092747.jpg",
//"imgMedium": "https://cdn2.apstatic.com/photos/hike/7039883_medium_1555092747.jpg",
//"conditionDate": "2020-09-16 14:37:11",
//"difficulty": "black",
//"descent": -5524,
//"high": 8446,
//"ascent": 5446,
//"conditionStatus": "All Clear",
//"low": 5424,
//"name": "Boulder Skyline Traverse",
//"location": "Superior, Colorado",
//"id": 7011192,
//"imgSqSmall": "https://cdn2.apstatic.com/photos/hike/7039883_sqsmall_1555092747.jpg",
//"longitude": -105.2582







