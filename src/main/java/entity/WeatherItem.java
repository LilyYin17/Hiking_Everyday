package entity;

import org.json.JSONException;
import org.json.JSONObject;

public class WeatherItem {
	//Fields are the useful information we need from the response
	private double temp;
	private double wind;
	private String weatherDes;
	
	private WeatherItem(WeatherItemBuilder builder) {
		this.temp = builder.temp;
		this.wind = builder.wind;
		this.weatherDes = builder.weatherDes;
	}
	
	public double getTemp() {
		return temp;
	}
	
	public double getWind() {
		return wind;
	}
	
	public String getWeatherDes() {
		return weatherDes;
	}
	
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		try {
			obj.put("temp", temp);
			obj.put("wind", wind);
			obj.put("weatherDes", weatherDes);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		return obj;
	}
	
	//help to make clients construct the instance more flexible
	public static class WeatherItemBuilder{
		private double temp;
		private double wind;
		private String weatherDes;
		
		public void setTemp(double temp) {
			this.temp = temp;
		}
		public void setWind(double wind) {
			this.wind = wind;
		}
		public void setWeatherDes(String weatherDes) {
			this.weatherDes = weatherDes;
		}
		
		//build function to create a TrailItemBuilder object from trail item object
		public WeatherItem build() {
			return new WeatherItem(this);
		}
	}
}