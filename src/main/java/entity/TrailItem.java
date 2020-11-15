package entity;
//This class is to purity data we got from HikingProject API

import org.json.JSONException;
import org.json.JSONObject;

public class TrailItem {
	//Fields are the useful information we need from the response
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
	
	public int getTrailId() {
		return trailId;
	}
	
	public String getTrailName() {
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