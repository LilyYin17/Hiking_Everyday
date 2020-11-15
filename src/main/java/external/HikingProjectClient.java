package external;

import java.io.BufferedReader;
import java.util.*;
import java.io.IOException;
import java.io.InputStreamReader;
//import java.io.UnsupportedEncodingException;
//import java.net.URLEncoder;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONArray;
import org.json.JSONObject;

import entity.TrailItem;
import entity.TrailItem.TrailItemBuilder;

// https://www.hikingproject.com/data

public class HikingProjectClient {
	private static final String URL_TEMPLATE = 
			"https://www.hikingproject.com/data/get-trails?lat=%s&lon=%s&maxDistance=10&key=200963304-3031291d27bc85ca2a090820541b43f2";
	
	//default distance is 10
	public List<TrailItem> search(double lat, double lon) {
		String url = String.format(URL_TEMPLATE, lat, lon);
		CloseableHttpClient httpClient = HttpClients.createDefault();
		try {
			CloseableHttpResponse response = httpClient.execute(new HttpGet(url));
			if(response.getStatusLine().getStatusCode() != 200) {
				return new ArrayList<>();
			}
			HttpEntity entity = response.getEntity();
			if(entity == null) {
				return new ArrayList<>();
			}
			BufferedReader reader = new BufferedReader(new InputStreamReader(entity.getContent()));
			StringBuilder responseBody = new StringBuilder();
			String line = null;
			while((line = reader.readLine()) != null) {
				responseBody.append(line);
			}
			
			JSONObject obj = new JSONObject(responseBody.toString());
			JSONArray array = obj.getJSONArray("trails");

			return getItemList(array);
			
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new ArrayList<>();
	}
	
	//function to convert JSONArray to a list of items
	private List<TrailItem> getItemList(JSONArray array){
		List<TrailItem> trailItemList = new ArrayList<>();
		for(int i = 0; i < array.length(); i++) {
			JSONObject obj = array.getJSONObject(i);
			
			TrailItemBuilder builder = new TrailItemBuilder();
			
			builder.setTrailId(getIntFieldOrEmpty(obj, "id"));
			builder.setTrailName(getStringFieldOrEmpty(obj, "name"));
			builder.setTrailLength(getDoubleFieldOrEmpty(obj, "length"));
			builder.setTrailHeight(getIntFieldOrEmpty(obj, "high"));
			builder.setLatitude(getDoubleFieldOrEmpty(obj, "latitude"));
			builder.setLongitude(getDoubleFieldOrEmpty(obj, "longitude"));
			builder.setLocationName(getStringFieldOrEmpty(obj, "location"));
			builder.setImageUrl(getStringFieldOrEmpty(obj, "imgSmallMed"));
			builder.setDifficulty(getStringFieldOrEmpty(obj, "difficulty"));
			
			TrailItem item = builder.build();
			trailItemList.add(item);
		}
	
		return trailItemList;
	}
	
	private int getIntFieldOrEmpty(JSONObject obj, String key) {
		return obj.isNull(key)? 0 : obj.getInt(key);
	}
	
	private double getDoubleFieldOrEmpty(JSONObject obj, String key) {
		return obj.isNull(key)? 0.0 : obj.getDouble(key);
	}
	
	private String getStringFieldOrEmpty(JSONObject obj, String key) {
		return obj.isNull(key)? "" : obj.getString(key);
	}
}