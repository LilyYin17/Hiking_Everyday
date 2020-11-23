package external;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONArray;
import org.json.JSONObject;

import entity.WeatherItem.WeatherItemBuilder;
import entity.WeatherItem;

public class OpenWeatherClient {
	private static final String URL_TEMPLATE = 
			"https://api.openweathermap.org/data/2.5/onecall?lat=%s&lon=%s&units=metric&exclude=minutely,hourly,alerts&appid=b8daf7f3c6f5e5a79b546a1822e3856c";
	
	//open weather API
	public List<WeatherItem> search(double lat, double lon) {
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
				JSONObject current = obj.getJSONObject("current");
								
				return getWeatherList(current);
			} catch (ClientProtocolException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			return new ArrayList<>();
		}
		
		//function to convert JSONArray to a list of items
		private List<WeatherItem> getWeatherList(JSONObject obj){
			List<WeatherItem> weatherList = new ArrayList<>();

			WeatherItemBuilder builder = new WeatherItemBuilder();
							
			builder.setTemp(getDoubleFieldOrEmpty(obj, "temp"));
			builder.setWind(getDoubleFieldOrEmpty(obj, "wind_speed"));
			builder.setWeatherDes(getStringFieldOrEmpty(obj, "weather"));
						
			WeatherItem item = builder.build();
			System.out.println(item.getTemp());
			System.out.println(item.getWind());
			System.out.println(item.getWeatherDes());
			
			weatherList.add(item);
			
			return weatherList;
		}
		
		private double getDoubleFieldOrEmpty(JSONObject obj, String key) {
			return obj.isNull(key)? 0.0 : obj.getDouble(key);
		}
		
		private String getStringFieldOrEmpty(JSONObject obj, String key) {
			if(obj.isNull(key)) return "";
			JSONArray array = obj.getJSONArray(key);
			if(array.isNull(0)) return "";
			
			JSONObject desObj = (JSONObject) array.get(0);
			return desObj.isNull("description")? "" : desObj.getString("description");
		}	
}
